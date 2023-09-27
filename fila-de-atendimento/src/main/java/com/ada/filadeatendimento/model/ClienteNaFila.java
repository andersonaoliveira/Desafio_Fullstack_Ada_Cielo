package com.ada.filadeatendimento.model;

import lombok.Data;

@Data
public class ClienteNaFila {
    private String id;
    private String nome;
    private String mcc;
    private String cpf;
    private String email;
    private String telefone;
    private String tipo;
    private String cnpj;
    private String razaoSocial;    
}