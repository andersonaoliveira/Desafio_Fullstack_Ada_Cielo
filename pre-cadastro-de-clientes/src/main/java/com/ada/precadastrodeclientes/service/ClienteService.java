package com.ada.precadastrodeclientes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.ada.precadastrodeclientes.model.Cliente;
import com.ada.precadastrodeclientes.repository.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente criarCliente(Cliente cliente) {
        validarCamposObrigatorios(cliente);
        validarEmail(cliente.getEmail());

        if (cliente.getCnpj() != null && !cliente.getCnpj().isEmpty()) {
            if (cliente.getCnpj().length() != 14) {
                throw new IllegalArgumentException("CNPJ deve ter 14 dígitos formatados com zeros à esquerda.");
            }
    
            if (clienteRepository.existsByCnpj(cliente.getCnpj())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CNPJ já cadastrado.");
            }
        }
    
        if (cliente.getCpf() != null && cliente.getCpf().length() != 11) {
            throw new IllegalArgumentException("CPF deve ter 11 dígitos formatados com zeros à esquerda.");
        }

        if (cliente.getCpf() != null) {
            if (clienteRepository.existsByCpf(cliente.getCpf())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CPF já cadastrado.");
            }
        }

        if (clienteRepository.existsByCnpj(cliente.getCnpj())) {
            throw new IllegalArgumentException("Cliente com CNPJ já cadastrado.");
        }

        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new IllegalArgumentException("Cliente com CPF já cadastrado.");
        }

        return clienteRepository.save(cliente);
    }

    private void validarCamposObrigatorios(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isEmpty() ||
            cliente.getEmail() == null || cliente.getEmail().isEmpty() ||
            cliente.getMcc() == null || cliente.getMcc().isEmpty()) {
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

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setMcc(clienteAtualizado.getMcc());

        return clienteRepository.save(clienteExistente);
    }

    public void excluirCliente(String id) {
        Cliente clienteExistente = consultarClientePorId(id);
        clienteRepository.delete(clienteExistente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }
}