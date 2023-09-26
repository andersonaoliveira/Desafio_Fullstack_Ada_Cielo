package com.ada.precadastrodeclientes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import com.ada.precadastrodeclientes.model.Cliente;

public interface ClienteRepository extends MongoRepository<Cliente, String> {

    boolean existsByCnpj(String cnpj);

    boolean existsByCpf(String cpf);

    List<Cliente> findByCnpj(String cnpj);

    Cliente findByEmail(String email);

    List<Cliente> findByMcc(String mcc);

    List<Cliente> findByNome(String nome);

    List<Cliente> findByCpf(String cpf);
}