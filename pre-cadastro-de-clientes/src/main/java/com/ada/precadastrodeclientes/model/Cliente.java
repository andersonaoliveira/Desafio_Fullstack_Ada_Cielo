package com.ada.precadastrodeclientes.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "clientes")
@Data
public class Cliente {
    @Id
    private String id;    
    private String nome;
    private String email;
    private String mcc;
    private String cpf;
    
    //exclusivo de pessoa jurídica
    private String cnpj;
    private String razaoSocial;


}