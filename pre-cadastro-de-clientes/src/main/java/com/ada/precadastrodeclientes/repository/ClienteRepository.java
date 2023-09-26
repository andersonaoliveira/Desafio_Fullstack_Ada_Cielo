package com.ada.precadastrodeclientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import com.ada.precadastrodeclientes.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByCnpj(String cnpj);
    
    Cliente findByEmail(String email);

    List<Cliente> findByMcc(String mcc);

    List<Cliente> findByNome(String nome);

    List<Cliente> findByCpf(String cpf);

    Optional<Cliente> findByCnpjOptional(String cnpj);

    Optional<Cliente> findByCpfOptional(String cpf);
}