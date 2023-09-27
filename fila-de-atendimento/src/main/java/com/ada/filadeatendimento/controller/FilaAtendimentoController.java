package com.ada.filadeatendimento.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ada.filadeatendimento.model.ClienteNaFila;
import com.ada.filadeatendimento.service.AtendimentoFila;


@CrossOrigin
@RestController
@RequestMapping("/fila-de-atendimento")
public class FilaAtendimentoController {
    private final AtendimentoFila fila;

    public FilaAtendimentoController(AtendimentoFila fila) {
        this.fila = fila;
    }

    @GetMapping("/clientes-na-fila")
    public ResponseEntity<List<ClienteNaFila>> listCustomersInQueue() {
        List<ClienteNaFila> customersInQueue = new ArrayList<>(fila.getFila());
        return ResponseEntity.ok(customersInQueue);
    }

    @GetMapping("/numero-de-clientes-na-fila")
    public ResponseEntity<Integer> getNumberOfCustomersInQueue() {
        int numberOfCustomers = fila.getFila().size();
        return ResponseEntity.ok(numberOfCustomers);
    }


    @GetMapping("/proximo-cliente")
    public ResponseEntity<Object> getNextCustomer() {
        ClienteNaFila nextCustomer = fila.removeCliente();
        if (nextCustomer != null) {
            return ResponseEntity.ok(nextCustomer);
        } else {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> emptyMap = Collections.emptyMap();
            try {
                String emptyJson = objectMapper.writeValueAsString(emptyMap);
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .body(emptyJson);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        }
    }

    @PostMapping("/adicionar-cliente")
    public ResponseEntity<Void> addCustomerToQueue(@RequestBody ClienteNaFila cliente) {
        fila.adicionaCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}