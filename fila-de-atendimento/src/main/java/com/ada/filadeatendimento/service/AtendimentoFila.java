package com.ada.filadeatendimento.service;

import java.util.LinkedList;
import java.util.NoSuchElementException;
import java.util.Queue;
import org.springframework.stereotype.Service;

import com.ada.filadeatendimento.model.ClienteNaFila;

@Service
public class AtendimentoFila {
    private Queue<ClienteNaFila> fila;

    public AtendimentoFila() {
        this.fila = new LinkedList<>();
    }

    public void adicionaCliente(ClienteNaFila cliente) {
        if (cliente != null && cliente.getId() != null) {
            for (ClienteNaFila clienteExistente : fila) {
                if (cliente.getId().equals(clienteExistente.getId())) {
                    fila.remove(clienteExistente);
                    break;
                }
            }
        }
        fila.add(cliente);
    }

    public ClienteNaFila removeCliente() throws NoSuchElementException {
        if (this.fila.isEmpty()) {
            return null;
        } else {
            return this.fila.poll();
        }
    }

    public Queue<ClienteNaFila> getFila() {
        return fila;
    }
}