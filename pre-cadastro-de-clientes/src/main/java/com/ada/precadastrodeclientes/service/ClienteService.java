package com.ada.precadastrodeclientes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import com.ada.precadastrodeclientes.model.Cliente;
import com.ada.precadastrodeclientes.repository.ClienteRepository;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Cliente criarCliente(Cliente cliente) {
        validarCamposObrigatorios(cliente);
        validarCnpj(cliente.getCnpj());
        validarCpf(cliente.getCpf());
        validarMcc(cliente.getMcc());
        validarNomeContato(cliente.getNome());
        validarEmail(cliente.getEmail());

        if (cliente.getCnpj() != null && cliente.getCnpj().length() != 14) {
            throw new IllegalArgumentException("CNPJ deve ter 14 dígitos formatados com zeros à esquerda.");
        }

        if (cliente.getCpf() != null && cliente.getCpf().length() != 11) {
            throw new IllegalArgumentException("CPF deve ter 11 dígitos formatados com zeros à esquerda.");
        }

        Optional<Cliente> clienteExistenteCnpj = clienteRepository.findByCnpjOptional(cliente.getCnpj());
        if (clienteExistenteCnpj.isPresent()) {
            throw new IllegalArgumentException("Cliente com CNPJ já cadastrado.");
        }

        Optional<Cliente> clienteExistenteCpf = clienteRepository.findByCpfOptional(cliente.getCpf());
        if (clienteExistenteCpf.isPresent()) {
            throw new IllegalArgumentException("Cliente com CPF já cadastrado.");
        }
        
        if (!isValidEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("Email inválido.");
        }

        Cliente clienteSalvo = clienteRepository.save(cliente);

        return clienteSalvo;
    }

    private void validarCamposObrigatorios(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isEmpty() ||
            cliente.getEmail() == null || cliente.getEmail().isEmpty() ||
            cliente.getMcc() == null || cliente.getMcc().isEmpty()) {
            throw new IllegalArgumentException("Todos os campos obrigatórios devem ser preenchidos.");
        }
    }
    
    private void validarCnpj(String cnpj) {
        if (cnpj != null && cnpj.length() != 14) {
            throw new IllegalArgumentException("CNPJ deve ter 14 dígitos formatados com zeros à esquerda.");
        }
    }
    
    private void validarCpf(String cpf) {
        if (cpf != null && cpf.length() != 11) {
            throw new IllegalArgumentException("CPF deve ter 11 dígitos formatados com zeros à esquerda.");
        }
    }
    
    private void validarMcc(String mcc) {
        if (mcc != null && mcc.length() > 4) {
            throw new IllegalArgumentException("MCC deve ter no máximo 4 caracteres.");
        }
    }
    
    private void validarNomeContato(String nomeContato) {
        if (nomeContato != null && nomeContato.length() > 50) {
            throw new IllegalArgumentException("Nome do contato deve ter no máximo 50 caracteres.");
        }
    }
    
    private void validarEmail(String email) {
        String regex = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
        if (email == null || !email.matches(regex)) {
            throw new IllegalArgumentException("Email inválido.");
        }
    }

    private boolean isValidEmail(String email) {
        String regex = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
        return email.matches(regex);
    }

    @Transactional
    public Cliente consultarClientePorId(Long id) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (!clienteExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado.");
        }

        return clienteExistente.get();
    }

    @Transactional
    public Cliente atualizarCliente(Long id, Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (!clienteExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado.");
        }

        Cliente clienteParaAtualizar = clienteExistente.get();
    
        clienteParaAtualizar.setNome(clienteAtualizado.getNome());
        clienteParaAtualizar.setEmail(clienteAtualizado.getEmail());
        clienteParaAtualizar.setMcc(clienteAtualizado.getMcc());

        clienteAtualizado = clienteRepository.save(clienteParaAtualizar);
        return clienteAtualizado;
    }
}