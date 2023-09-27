package com.ada.precadastrodeclientes.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import com.ada.precadastrodeclientes.enums.TipoCliente;

@Document(collection = "clientes")
@Data
public class Cliente {
    @Id
    private String id;    
    private String nome;
    private String email;
    private String mcc;
    private String cpf;
    private String telefone;
    private TipoCliente tipo; 
    
    //exclusivo de pessoa jurídica
    private String cnpj;
    private String razaoSocial;
}