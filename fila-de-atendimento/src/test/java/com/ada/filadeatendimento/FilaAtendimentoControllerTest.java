package com.ada.filadeatendimento;

import com.ada.filadeatendimento.controller.FilaAtendimentoController;
import com.ada.filadeatendimento.model.ClienteNaFila;
import com.ada.filadeatendimento.service.AtendimentoFila;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.junit.jupiter.api.AfterEach;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class FilaAtendimentoControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AtendimentoFila atendimentoFila;

    private AutoCloseable closeable;

    @BeforeEach
    public void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new FilaAtendimentoController(atendimentoFila)).build();
    }

    @AfterEach
    public void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void testeListarClientesDaFila() throws Exception {
        ClienteNaFila customer1 = new ClienteNaFila();
        customer1.setId("1");
        ClienteNaFila customer2 = new ClienteNaFila();
        customer2.setId("2");

        Queue<ClienteNaFila> fila = new LinkedList<>();
        fila.add(customer1);
        fila.add(customer2);

        when(atendimentoFila.getFila()).thenReturn(fila);

        mockMvc.perform(get("/fila-de-atendimento/clientes-na-fila")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[1].id").value("2"));

        verify(atendimentoFila, times(1)).getFila();
        verifyNoMoreInteractions(atendimentoFila);
    }
}
