package com.ada.precadastrodeclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ada.precadastrodeclientes.model.Cliente;
import com.ada.precadastrodeclientes.service.ClienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@CrossOrigin(origins = "http://localhost:80")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Operation(summary = "Cria um novo cliente")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Cliente.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente) {
        Cliente clienteCriado = clienteService.criarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteCriado);
    }

    @Operation(summary = "Atualiza um cliente por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Cliente.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable String id, @RequestBody Cliente clienteAtualizado) {
        Cliente cliente = clienteService.atualizarCliente(id, clienteAtualizado);
        return ResponseEntity.ok(cliente);
    }

    @Operation(summary = "Exclui cliente por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Cliente.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable String id) {
        clienteService.excluirCliente(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Consulta cliente por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Cliente.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> consultarClientePorId(@PathVariable String id) {
        Cliente cliente = clienteService.consultarClientePorId(id);
        return ResponseEntity.ok(cliente);
    }

    @Operation(summary = "Lista todos clientes cadastrados")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Cliente.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) }) })
    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }
}
