package com.ada.precadastrodeclientes;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.server.ResponseStatusException;

import com.ada.precadastrodeclientes.service.ClienteService;
import com.ada.precadastrodeclientes.repository.ClienteRepository;
import com.ada.precadastrodeclientes.model.Cliente;


@SpringBootTest
public class ClienteServiceTest {

    @Autowired
    private ClienteService clienteService;

    @MockBean
    private ClienteRepository clienteRepository;

    @Test
    public void testCriarCliente() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson de Aguiar de Oliveira");
        cliente.setEmail("ada@cielo.com");
        cliente.setMcc("1234");
        cliente.setCpf("00826652069");

        Mockito.when(clienteRepository.save(Mockito.any(Cliente.class))).thenReturn(cliente);

        Cliente clienteSalvo = clienteService.criarCliente(cliente);

        assertNotNull(clienteSalvo);
        assertEquals("Anderson de Aguiar de Oliveira", clienteSalvo.getNome());
        assertEquals("ada@cielo.com", clienteSalvo.getEmail());
        assertEquals("1234", clienteSalvo.getMcc());
        assertEquals("00826652069", clienteSalvo.getCpf());
    }

    @Test
    public void testCriarClienteComEmailInvalido() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson");
        cliente.setEmail("email.inexistente");
        cliente.setMcc("4321");
        cliente.setCpf("00826652069");        

        assertThrows(IllegalArgumentException.class, () -> clienteService.criarCliente(cliente));
    }

    @Test
    public void testCriarClienteComCamposObrigatoriosEmBranco() {
        Cliente cliente = new Cliente();
        cliente.setNome("");
        cliente.setEmail("");
        cliente.setMcc("");
        cliente.setCpf("00826652069"); 

        assertThrows(IllegalArgumentException.class, () -> clienteService.criarCliente(cliente));
    }

    @Test
    public void testCriarClienteComCnpjExistente() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson");
        cliente.setEmail("anderson@examplo.com");
        cliente.setMcc("5454");
        cliente.setCnpj("12345678901234");
        cliente.setRazaoSocial("Empresa de Teste");

        Mockito.when(clienteRepository.existsByCnpj(cliente.getCnpj())).thenReturn(true);

        assertThrows(ResponseStatusException.class, () -> clienteService.criarCliente(cliente));
    }
}