package com.ada.precadastrodeclientes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.client.RestTemplate;

import com.ada.precadastrodeclientes.service.ClienteService;
import com.ada.precadastrodeclientes.repository.ClienteRepository;
import com.ada.precadastrodeclientes.model.Cliente;
import com.ada.precadastrodeclientes.enums.TipoCliente;


@SpringBootTest
public class ClienteServiceTest {

    @Autowired
    private ClienteService clienteService;

    @MockBean
    private ClienteRepository clienteRepository;

    @Test
    public void testeCriarClienteComSucesso() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson de Aguiar de Oliveira");
        cliente.setEmail("ada@cielo.com");
        cliente.setMcc("1234");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.FISICA);

        Mockito.when(clienteRepository.save(Mockito.any(Cliente.class))).thenReturn(cliente);

        Cliente clienteSalvo = clienteService.criarCliente(cliente);

        assertNotNull(clienteSalvo);
        assertEquals("Anderson de Aguiar de Oliveira", clienteSalvo.getNome());
        assertEquals("ada@cielo.com", clienteSalvo.getEmail());
        assertEquals("1234", clienteSalvo.getMcc());
        assertEquals("00826652069", clienteSalvo.getCpf());
        assertEquals("5332320101", clienteSalvo.getTelefone());
        assertEquals("FISICA", clienteSalvo.getTipo().name());
    }

    @Test
    public void testCriarClienteComEmailInvalido() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson");
        cliente.setEmail("email.inexistente");
        cliente.setMcc("4321");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.FISICA);

        assertThrows(IllegalArgumentException.class, () -> clienteService.criarCliente(cliente));
    }

    @Test
    public void testCriarClienteComCamposObrigatoriosEmBranco() {
        Cliente cliente = new Cliente();
        cliente.setNome("");
        cliente.setEmail("");
        cliente.setMcc("");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.FISICA);

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
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.JURIDICA);

        Mockito.when(clienteRepository.existsByCnpj(cliente.getCnpj())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> clienteService.criarCliente(cliente));
    }

    @Test
    public void testCriarClientePessoaFisicaComCNPJInvalido() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson Teste");
        cliente.setEmail("anderson@teste.com.br");
        cliente.setMcc("4561");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setCnpj("178901234");
        cliente.setRazaoSocial("Empresa de Teste");
        cliente.setTipo(TipoCliente.JURIDICA);

        assertThrows(IllegalArgumentException.class, () -> clienteService.criarCliente(cliente));
    }

    @Test
    public void testCriarClientePessoaFisicaComCNPJValido() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson Teste");
        cliente.setEmail("anderson@teste.com.br");
        cliente.setMcc("4561");
        cliente.setCpf("05526652069");
        cliente.setTelefone("5332320101");
        cliente.setCnpj("65432878941547");
        cliente.setRazaoSocial("Empresa de Teste");
        cliente.setTipo(TipoCliente.JURIDICA);

        Mockito.when(clienteRepository.save(Mockito.any(Cliente.class))).thenReturn(cliente);

        Cliente clienteSalvo = clienteService.criarCliente(cliente);

        assertNotNull(clienteSalvo);
        assertEquals("Anderson Teste", clienteSalvo.getNome());
        assertEquals("anderson@teste.com.br", clienteSalvo.getEmail());
        assertEquals("4561", clienteSalvo.getMcc());
        assertEquals("05526652069", clienteSalvo.getCpf());
        assertEquals("5332320101", clienteSalvo.getTelefone());
        assertEquals("JURIDICA", clienteSalvo.getTipo().name());
        assertEquals("65432878941547",clienteSalvo.getCnpj());
        assertEquals("Empresa de Teste",clienteSalvo.getRazaoSocial());
    }

    @Test
    public void testExcluirClienteComSucesso() {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setId("3");
        clienteExistente.setNome("Cliente a ser excluído");
        clienteExistente.setEmail("excluir@cielo.com");
        clienteExistente.setMcc("5678");
        clienteExistente.setCpf("12345678901");
        clienteExistente.setTelefone("5332320101");
        clienteExistente.setTipo(TipoCliente.FISICA);

        Mockito.when(clienteRepository.findById("3")).thenReturn(java.util.Optional.of(clienteExistente));

        clienteService.excluirCliente("3");

        Mockito.verify(clienteRepository, Mockito.times(1)).delete(clienteExistente);
    }

    @Test
    public void testAtualizarClienteComSucesso() {

        Cliente clienteExistente = new Cliente();
        clienteExistente.setId("1");
        clienteExistente.setNome("Cliente Existente");
        clienteExistente.setEmail("cliente@existente.com");
        clienteExistente.setMcc("1234");
        clienteExistente.setCpf("12345678901");
        clienteExistente.setTelefone("5332320101");
        clienteExistente.setTipo(TipoCliente.FISICA);

        Cliente clienteAtualizado = new Cliente();
        clienteAtualizado.setNome("Cliente Atualizado");
        clienteAtualizado.setEmail("atualizado@cliente.com");
        clienteAtualizado.setMcc("5678");
        clienteAtualizado.setTelefone("5332320202");

        ClienteRepository clienteRepository = Mockito.mock(ClienteRepository.class);
        Mockito.when(clienteRepository.findById("1")).thenReturn(java.util.Optional.of(clienteExistente));
        Mockito.when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteExistente);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);

        ClienteService clienteService = new ClienteService(clienteRepository, restTemplate);

        Cliente clienteAtualizadoResult = clienteService.atualizarCliente("1", clienteAtualizado);

        assertEquals("Cliente Atualizado", clienteAtualizadoResult.getNome());
        assertEquals("atualizado@cliente.com", clienteAtualizadoResult.getEmail());
        assertEquals("5678", clienteAtualizadoResult.getMcc());
        assertEquals("5332320202", clienteAtualizadoResult.getTelefone());
    }
}