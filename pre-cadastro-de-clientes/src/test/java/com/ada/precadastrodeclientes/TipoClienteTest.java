package com.ada.precadastrodeclientes;
import com.ada.precadastrodeclientes.enums.TipoCliente;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class TipoClienteTest {

    @Test
    public void testEnumValues() {
        assertEquals("FISICA", TipoCliente.FISICA.name());
        assertEquals("JURIDICA", TipoCliente.JURIDICA.name());
    }

    @Test
    public void testEnumValuesEquality() {
        assertEquals(TipoCliente.FISICA, TipoCliente.valueOf("FISICA"));
        assertEquals(TipoCliente.JURIDICA, TipoCliente.valueOf("JURIDICA"));
    }

    @Test
    public void testEnumValuesInequality() {
        assertNotEquals(TipoCliente.FISICA, TipoCliente.JURIDICA);
    }

    @Test
    public void testEnumValuesToString() {
        assertEquals("FISICA", TipoCliente.FISICA.toString());
        assertEquals("JURIDICA", TipoCliente.JURIDICA.toString());
    }
}
