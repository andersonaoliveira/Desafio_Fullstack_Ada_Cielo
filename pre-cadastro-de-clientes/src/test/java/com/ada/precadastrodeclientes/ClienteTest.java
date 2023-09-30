package com.ada.precadastrodeclientes;

import com.ada.precadastrodeclientes.model.Cliente;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import com.ada.precadastrodeclientes.enums.TipoCliente;

public class ClienteTest {

    @Test
    public void testCriacaoClientePessoaFisica() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson de Aguiar de Oliveira");
        cliente.setEmail("ada@cielo.com");
        cliente.setMcc("1234");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.FISICA);

        assertEquals("Anderson de Aguiar de Oliveira", cliente.getNome());
        assertEquals("ada@cielo.com", cliente.getEmail());
        assertEquals("1234", cliente.getMcc());
        assertEquals("00826652069", cliente.getCpf());
        assertEquals("5332320101", cliente.getTelefone());
        assertEquals(TipoCliente.FISICA, cliente.getTipo());
        assertNull(cliente.getCnpj()); 
        assertNull(cliente.getRazaoSocial());
    }

    @Test
    public void testCriacaoClientePessoaJuridica() {
        Cliente cliente = new Cliente();
        cliente.setNome("Empresa de Teste");
        cliente.setEmail("empresa@teste.com");
        cliente.setMcc("5678");
        cliente.setCnpj("12345678901234");
        cliente.setRazaoSocial("Empresa de Teste");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.JURIDICA);

        assertEquals("Empresa de Teste", cliente.getNome());
        assertEquals("empresa@teste.com", cliente.getEmail());
        assertEquals("5678", cliente.getMcc());
        assertNull(cliente.getCpf());
        assertEquals("12345678901234", cliente.getCnpj());
        assertEquals("Empresa de Teste", cliente.getRazaoSocial());
        assertEquals("5332320101", cliente.getTelefone());
        assertEquals(TipoCliente.JURIDICA, cliente.getTipo());
    }

    @Test
    public void testGettersESetters() {
        Cliente cliente = new Cliente();
        cliente.setNome("Anderson de Aguiar de Oliveira");
        cliente.setEmail("ada@cielo.com");
        cliente.setMcc("1234");
        cliente.setCpf("00826652069");
        cliente.setTelefone("5332320101");
        cliente.setTipo(TipoCliente.FISICA);

        assertEquals("Anderson de Aguiar de Oliveira", cliente.getNome());
        assertEquals("ada@cielo.com", cliente.getEmail());
        assertEquals("1234", cliente.getMcc());
        assertEquals("00826652069", cliente.getCpf());
        assertEquals("5332320101", cliente.getTelefone());
        assertEquals(TipoCliente.FISICA, cliente.getTipo());

        cliente.setNome("Novo Nome");
        assertEquals("Novo Nome", cliente.getNome());

        cliente.setEmail("novo@email.com");
        assertEquals("novo@email.com", cliente.getEmail());
    }

    @Test
    public void testEqualsComClientesIguais() {
        Cliente cliente1 = new Cliente();
        cliente1.setId("1");
        cliente1.setNome("Anderson");
        cliente1.setEmail("anderson@teste.com");
        cliente1.setMcc("1234");
        cliente1.setCpf("00826652069");
        cliente1.setTelefone("5332320101");
        cliente1.setTipo(TipoCliente.FISICA);

        Cliente cliente2 = new Cliente();
        cliente2.setId("1");
        cliente2.setNome("Anderson");
        cliente2.setEmail("anderson@teste.com");
        cliente2.setMcc("1234");
        cliente2.setCpf("00826652069");
        cliente2.setTelefone("5332320101");
        cliente2.setTipo(TipoCliente.FISICA);

        assertTrue(cliente1.equals(cliente2));
    }

    @Test
    public void testEqualsComClientesDiferentes() {
        Cliente cliente1 = new Cliente();
        cliente1.setId("1");
        cliente1.setNome("Anderson");
        cliente1.setEmail("anderson@teste.com");
        cliente1.setMcc("1234");
        cliente1.setCpf("00826652069");
        cliente1.setTelefone("5332320101");
        cliente1.setTipo(TipoCliente.FISICA);

        Cliente cliente2 = new Cliente();
        cliente2.setId("2");
        cliente2.setNome("João");
        cliente2.setEmail("joao@teste.com");
        cliente2.setMcc("5678");
        cliente2.setCpf("12345678901");
        cliente2.setTelefone("5332320202");
        cliente2.setTipo(TipoCliente.JURIDICA);

        assertFalse(cliente1.equals(cliente2));
    }

    @Test
    public void testHashCodeComClientesIguais() {
        Cliente cliente1 = new Cliente();
        cliente1.setId("1");
        cliente1.setNome("Anderson");
        cliente1.setEmail("anderson@teste.com");
        cliente1.setMcc("1234");
        cliente1.setCpf("00826652069");
        cliente1.setTelefone("5332320101");
        cliente1.setTipo(TipoCliente.FISICA);

        Cliente cliente2 = new Cliente();
        cliente2.setId("1");
        cliente2.setNome("Anderson");
        cliente2.setEmail("anderson@teste.com");
        cliente2.setMcc("1234");
        cliente2.setCpf("00826652069");
        cliente2.setTelefone("5332320101");
        cliente2.setTipo(TipoCliente.FISICA);

        assertEquals(cliente1.hashCode(), cliente2.hashCode());
    }

    @Test
    public void testHashCodeComClientesDiferentes() {
        Cliente cliente1 = new Cliente();
        cliente1.setId("1");
        cliente1.setNome("Anderson");
        cliente1.setEmail("anderson@teste.com");
        cliente1.setMcc("1234");
        cliente1.setCpf("00826652069");
        cliente1.setTelefone("5332320101");
        cliente1.setTipo(TipoCliente.FISICA);

        Cliente cliente2 = new Cliente();
        cliente2.setId("2");
        cliente2.setNome("João");
        cliente2.setEmail("joao@teste.com");
        cliente2.setMcc("5678");
        cliente2.setCpf("12345678901");
        cliente2.setTelefone("5332320202");
        cliente2.setTipo(TipoCliente.JURIDICA);

        assertNotEquals(cliente1.hashCode(), cliente2.hashCode());
    }
}
