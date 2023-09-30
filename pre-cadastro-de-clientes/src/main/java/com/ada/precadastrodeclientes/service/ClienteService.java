package com.ada.precadastrodeclientes.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.RestTemplate;

import com.ada.precadastrodeclientes.enums.TipoCliente;
import com.ada.precadastrodeclientes.model.Cliente;
import com.ada.precadastrodeclientes.repository.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final RestTemplate restTemplate;

    public ClienteService(ClienteRepository clienteRepository, RestTemplate restTemplate) {
        this.clienteRepository = clienteRepository;
        this.restTemplate = restTemplate;
    }

    public Cliente criarCliente(Cliente cliente) {
        validarCamposObrigatorios(cliente);
        validarEmail(cliente.getEmail());

        if (cliente.getTipo() == null || !isValidTipoCliente(cliente.getTipo())) {
            throw new IllegalArgumentException("Tipo de cliente inválido. Deve ser 'FISICA' ou 'JURIDICA'.");
        }

        if (cliente.getTipo() == TipoCliente.JURIDICA) {

            if (cliente.getCnpj() != null && !cliente.getCnpj().isEmpty()) {
                if (cliente.getCnpj().length() != 14) {
                    throw new IllegalArgumentException("CNPJ deve ter 14 dígitos formatados com zeros à esquerda.");
                }
    
                if (clienteRepository.existsByCnpj(cliente.getCnpj())) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CNPJ já cadastrado.");
                }
            }
        }

        if (cliente.getTipo() == TipoCliente.FISICA) {
            cliente.setCnpj("");
            cliente.setRazaoSocial("");
        }
    
        if (cliente.getCpf() != null && cliente.getCpf().length() != 11) {
            throw new IllegalArgumentException("CPF deve ter 11 dígitos formatados com zeros à esquerda.");
        }

        if (cliente.getCpf() != null) {
            if (clienteRepository.existsByCpf(cliente.getCpf())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CPF já cadastrado.");
            }
        }

        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new IllegalArgumentException("Cliente com CPF já cadastrado.");
        }

        Cliente clienteSalvo = clienteRepository.save(cliente);
        enviarClienteParaFila(clienteSalvo);
        return clienteSalvo;
    }

    private boolean isValidTipoCliente(TipoCliente tipo) {
        return tipo == TipoCliente.FISICA || tipo == TipoCliente.JURIDICA;
    }

    private void validarCamposObrigatorios(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isEmpty() ||
            cliente.getEmail() == null || cliente.getEmail().isEmpty() ||
            cliente.getMcc() == null || cliente.getMcc().isEmpty() ||
            cliente.getCpf() == null || cliente.getCpf().isEmpty() ||
            cliente.getTelefone() == null || cliente.getTelefone().isEmpty() ||
            cliente.getTipo() == null) {
            throw new IllegalArgumentException("Todos os campos obrigatórios devem ser preenchidos.");
        }
    }

    private void validarEmail(String email) {
        String regex = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
        if (email == null || !email.matches(regex)) {
            throw new IllegalArgumentException("Email inválido.");
        }
    }

    public Cliente consultarClientePorId(String id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado."));
    }

    public Cliente atualizarCliente(String id, Cliente clienteAtualizado) {
        Cliente clienteExistente = consultarClientePorId(id);

        if (clienteAtualizado.getNome() != null) {
            clienteExistente.setNome(clienteAtualizado.getNome());
        }
        
        if (clienteAtualizado.getEmail() != null) {
            clienteExistente.setEmail(clienteAtualizado.getEmail());
        }
    
        if (clienteAtualizado.getMcc() != null) {
            clienteExistente.setMcc(clienteAtualizado.getMcc());
        }

        if (clienteAtualizado.getTelefone() != null) {
            clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        }

        Cliente clienteSalvo = clienteRepository.save(clienteExistente);

        enviarClienteParaFila(clienteSalvo);
        return clienteSalvo;
    }

    public void excluirCliente(String id) {
        Cliente clienteExistente = consultarClientePorId(id);
        clienteRepository.delete(clienteExistente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public void enviarClienteParaFila(Cliente cliente) {
        String url = "http://localhost:8081/fila-de-atendimento/adicionar-cliente";
        restTemplate.postForEntity(url, cliente, Void.class);
    }
}