# <center>Sejam Bem-Vindos


<div align="center"><h2 align="center"><span id="home"></span>Resultado de um desafio proposto no bootcamp Ada/Cielo FullStack</h2><br> 
<h1><b>Aplicação "Pré-cadastro de clientes para ofertas"</b></h1>
<p align="center">
    <a href="#breves-consideracoes"> Breves Considerações </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#desafio-proposto"> Desafio Proposto </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#arquitetura"> Arquitetura </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#ferramentas"> Ferramentas </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#pre-cadastro-de-clientes"> Pré-cadastro de clientes </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#fila-de-atendimento"> Fila de Atendimento </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#front-end"> Front End </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#banco-de-dados"> Banco de Dados </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#swagger"> Swagger </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#containerizacao"> Containerização </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#desenvolvedor-responsavel"> Desenvolvedor do Projeto </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#agradecimento"> Agradecimento </a>
</p>
</div>
<br>

## BREVES CONSIDERACOES

 <p align='justify'> Foi um prazer e um desafio enorme iniciar e concluir este projeto. O prazo de 5(cinco) dias pode parecer exíguo (e de fato é) para concluir tantas tarefas, mas resiliência é de longe a principal característica de um programador.</p>
 <p align='justify'>Pensei em algumas dezenas de features para implementar neste projeto, algumas coloquei nele e algumas, inclusive, cheguei a iniciar mas deixei comentado no código (pois exigiria outros microsserviços) para poder dar atenção ao escopo do projeto.</p>
 <p align='justify'>Enfim, espero ter conseguido atender aos requisitos propostos e siga para acompanhar este projeto.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## DESAFIO PROPOSTO
<p align='justify'> Ao total foram 3 desafios que, unidos, formam um sistema completo de pré-cadastro de cliente com fila de espera e atendimento.</p>

<p align="center">
    <a href="#desafio-1"> Desafio 1 </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#desafio-2"> Desafio 2 </a>&nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="#desafio-3"> Desafio 3 </a>
</p>


### DESAFIO 1
### Pré-cadastro de clientes

**User Story**: Pré-cadastro de clientes 

Como área de Comercialização da Cielo, desejo manter um pré-cadastro de clientes (prospect) para possibilitar uma futura oferta de produtos e serviços a esses clientes.

**Regras:**
1. Informações do cadastro:
   a) Se Pessoa Jurídica:
      - CNPJ
        - número de 14 dígitos formatado com zeros à esquerda
      - Razão Social
        - máximo de 50 caracteres
      - MCC - “Merchant Category Code“
        - número com no máximo 4 caracteres
      - CPF do contato do estabelecimento
        - número de 11 dígitos formatado com zeros à esquerda
      - Nome do contato do estabelecimento
        - máximo de 50 caracteres
      - Email do contato do estabelecimento
        - expressão regular para validação:
         ```
         ^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$
         ```

   b) Se Pessoa Física:
      - CPF da pessoa
        - número de 11 dígitos formatado com zeros à esquerda
      - MCC – “Merchant Category Code”
        - número com no máximo 4 caracteres
      - Nome da pessoa
        - máximo de 50 caracteres
      - Email da pessoa
        - expressão regular para validação: 
        ```
        ^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$
        ```
   - Todas as informações são obrigatórias

2. Consistências:

   a) A operação de cadastrar cliente deverá validar se o cadastro não existe. Se o cadastro já existir, o sistema deverá retornar um status coerente informando que o cliente já está cadastrado e não realizar qualquer alteração nos dados existentes.

   b) A operação de alterar cliente deverá validar se o cadastro já existe. Se o cadastro não existir, o sistema deverá retornar um status coerente informando que o cliente ainda não está cadastrado e não deverá realizar a inclusão de um novo registro.

   c) Ambas as operações de cadastrar ou alterar cliente deverão validar se todos os dados foram informados, se estão consistentes conforme tamanhos, tipos de dados e formatações disponibilizadas na regra “1”. Em caso de qualquer inconsistência, o sistema deverá retornar um status coerente informando os detalhes do erro.

   d) A operação de consultar um cliente deverá validar se o cadastro já existe. Se o cadastro não existir, o sistema deverá retornar um status coerente informando que o cliente ainda não está cadastrado.
   
**Desafio:**

a) Modelar uma API REST com operações que possibilitem a criação, alteração, exclusão e consulta de pré-cadastros de clientes. O entregável deverá ser um documento Swagger.

b) Implementar na linguagem Java utilizando o framework Spring Boot as APIs modeladas no item 1. Os dados podem ser armazenados em memória.

c) Desenvolver teste unitário para as regras descritas.

<br><div align="right">[Subir ao Início](#home)</div><br>

### DESAFIO 2
### Fila de atendimento

**User Story:** Fila de atendimento

Como área de Comercialização da Cielo, desejo ter uma fila de atendimento aos prospect, para que cada cliente possa ser analisado de forma sequencial pelos gestores comerciais.

**Regras:**
1. Toda vez que um novo cadastro ou uma alteração de cadastro for realizada no sistema, o cliente deverá entrar na última posição da fila de atendimento.
2. Possibilitar a retirada do cliente na primeira posição da fila de atendimento, apresentando seus dados para o tratamento.
3. Caso o gestor comercial solicite um prospect da fila para atendimento e não houver nenhum cliente na fila, deverá retornar um status coerente informando que a fila de atendimento está vazia.

**Desafio:**

a) Incluir na API criada no desafio “1” uma nova operação que possibilite a retirada do próximo cliente da fila de atendimento e retorne os dados disponíveis.

b) Implementar na linguagem Java uma estrutura de dados para uma fila, onde seja possível acrescentar e retirar clientes na fila no modelo FIFO (First In, First Out).

c) Contemplar as regras da história de usuário através da implementação da operação modelada no item “a”, utilizando a estrutura de fila criada no item “b”.
<br><div align="right">[Subir ao Início](#home)</div><br>

### DESAFIO 3
### Web Front End

**User Story:** Web Front End

Como área de Comercialização da Cielo, desejo poder realizar a gestão de pré-cadastro de clientes e, no mesmo sistema, fornecer aos gestores comerciais a possibilidade de recuperar dados dos prospects da fila de atendimento.

**Desafio:**

a) Desenvolver uma aplicação em React ou Angular que consuma a API descrita nos Desafios 2 e 3.

b) As telas devem contemplar as operações de criação, alteração, exclusão e consulta de pré-cadastro de clientes.

c) Ao recuperar um prospect da fila, deve ser exibido o mesmo resultado da consulta de pré-cadastro deste cliente.

d) Deve ser apresentada uma mensagem amigável quando for solicitado um prospect da fila quando ela estiver vazia.

e) Responsividade: o desafio deve ser desenvolvido para ser responsivo em diferentes dispositivos e tamanhos de tela.

f) Acessibilidade: o desafio deve ser desenvolvido de forma acessível, seguindo as diretrizes do WCAG2.

g) Design e UX: o desafio deve ter um bom design e uma boa experiência do usuário, seguindo as melhores práticas de design e UX.
</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## ARQUITETURA

**Arquitetura de Microsserviços**

<p align='justify'>Pensando nos quesitos de flexibilidade, escalabilidade e facilidade de manutenção, optei por utilizar uma arquitetura de microsserviços em que cada desafio se tornou uma aplicação independente. As aplicações se comunicam entre si através de API.</p>

<p align='justify'>Basicamente temos uma aplicação Java responsável pelas funções de validação e de pré-cadastro, essa aplicação salva as informações em banco de dados, fornece endpoints e realiza POST em api da segunda aplicação Java. Esta é responsável pela gestão da fila fifo, responável por inclusão e exclusão da fila de espera. Ela oferece endpoints como tamanho da fila, indica quem são os cadastros que estão na fila de espera como também o próximo da fila. A aplicação React de front-end é responsável por acessar os endpoints das duas aplicações java e entregar ao usuário uma forma de cadastro, alteração e exclusão via formulário (da aplicação 1) e acessar clientes da fila de espera e o próximo da fila (da aplicação 2).</p>

<p align='justify'>Enfim, embora as aplicações ganhem um pouco mais de complexibilidade quando trabalhamos com microsserviços, as vantagens de manutenção e escalabilidade compensam, principalmente se tratarmos de cloudificação.</p>


<br><div align="right">[Subir ao Início](#home)</div><br>

## FERRAMENTAS

Utilizamos diversas ferramentas nestes três desafios, além das dependências utilizadas no Maven e no ReactJS, listarei aqui as principais ferramentas e versões:

| Software    | Versão  |
|-------------|---------|
| [APACHE MAVEN](https://maven.apache.org/) | 3.9.4 |
| [JAVA JDK](https://www.java.com/pt-BR/download/help/develop_pt-br.html) | 17.0.8 |
| [NODE](https://nodejs.org/) | 18.18.0 |
| [YARN](https://yarnpkg.com/cli/install) | 1.22.19 |
| [VISUAL STUDIO CODE](https://code.visualstudio.com/) | 1.82.2 |
| [MONGODB COMPASS](https://www.mongodb.com/products/tools/compass) | 1.39.4 |
| [SWAGGER/OPENAPI](https://www.openapis.org/) | 3.0.0 |
| [POSTMAN](https://www.postman.com/) | 10.18.9 |
| [JUNIT](https://junit.org/) | 4.13.2 |
| [DOCKER](https://www.docker.com/) | 24.0.6 |
| [GITHUB](https://github.com/) | 582 |


<br><div align="right">[Subir ao Início](#home)</div><br>

## PRE CADASTRO DE CLIENTES

### Documentação do Microsserviço de Pré-Cadastro de Clientes

### Descrição
Este microsserviço foi desenvolvido como parte de um sistema maior e é responsável pelo pré-cadastro de clientes. Ele recebe informações dos clientes, valida e persiste esses dados em um banco de dados MongoDB e, em seguida, envia uma requisição POST para o endpoint de outra aplicação responsável por colocar o cliente em uma fila de espera.

### Tecnologias Utilizadas
- Linguagem de Programação: Java
- Framework: Spring Boot
- Banco de Dados: MongoDB
- Documentação da API: Swagger
- Comunicação com Outros Microsserviços: RestTemplate
- Testes Unitários: JUnit
- Gerenciamento de Dependências: Maven

### Estrutura do Projeto
O projeto é dividido em componentes principais:

1. **Controller** (`ClienteController`): Responsável por lidar com as requisições HTTP, definir os endpoints da API e interagir com o serviço.

2. **Service** (`ClienteService`): Lida com a lógica de negócios, valida os dados dos clientes, persiste os dados no banco de dados MongoDB e envia os clientes para a fila de espera.

3. **Model** (`Cliente`): Define a estrutura dos dados do cliente.

4. **Repository** (`ClienteRepository`): Define métodos de consulta e interage com o banco de dados MongoDB.

5. **Configurações** (`OpenAPIConfig`, `RestTemplateConfig`, `CorsFilter`): Configurações para o OpenAPI (Swagger), RestTemplate e tratamento de CORS.

### Endpoints da API
### Criar um novo cliente
- **Método:** POST
- **URL:** `/clientes`
- **Descrição:** Cria um novo cliente com base nos dados fornecidos.
- **Exemplo de Payload JSON:**
  ```json
  {
      "nome": "Nome do Cliente",
      "email": "cliente@email.com",
      "mcc": "1234",
      "cpf": "12345678901",
      "telefone": "1234567890",
      "tipo": "FISICA"
  }
  ```
- **Resposta de Sucesso:** Retorna os dados do cliente criado.
- **Códigos de Resposta:** 201 (Created), 400 (Bad Request), 500 (Internal Server Error)

### Atualizar um cliente por ID
- **Método:** PUT
- **URL:** `/clientes/{id}`
- **Descrição:** Atualiza os dados de um cliente existente com base no ID fornecido.
- **Exemplo de Payload JSON:**
  ```json
  {
      "nome": "Novo Nome do Cliente",
      "email": "novo@email.com"
  }
  ```
- **Resposta de Sucesso:** Retorna os dados do cliente atualizado.
- **Códigos de Resposta:** 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

### Excluir um cliente por ID
- **Método:** DELETE
- **URL:** `/clientes/{id}`
- **Descrição:** Exclui um cliente com base no ID fornecido.
- **Resposta de Sucesso:** Retorna um status vazio.
- **Códigos de Resposta:** 204 (No Content), 404 (Not Found), 500 (Internal Server Error)

### Consultar um cliente por ID
- **Método:** GET
- **URL:** `/clientes/{id}`
- **Descrição:** Consulta um cliente com base no ID fornecido.
- **Resposta de Sucesso:** Retorna os dados do cliente consultado.
- **Códigos de Resposta:** 200 (OK), 404 (Not Found), 500 (Internal Server Error)

### Listar todos os clientes cadastrados
- **Método:** GET
- **URL:** `/clientes`
- **Descrição:** Lista todos os clientes cadastrados.
- **Resposta de Sucesso:** Retorna uma lista de clientes.
- **Códigos de Resposta:** 200 (OK), 500 (Internal Server Error)

## Configurações
- **Configuração do OpenAPI (Swagger):** Você pode acessar a documentação da API em execução em [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html).

## Testes Unitários
O projeto inclui testes unitários para garantir a qualidade e a confiabilidade do código.

## Como Executar
1. Certifique-se de ter o Java 17 e o MongoDB instalados em seu ambiente.
2. Clone este repositório.
3. Execute o MongoDB localmente na porta padrão (27017).
4. Navegue até o diretório raiz do projeto e execute `mvn spring-boot:run` para iniciar o microsserviço.
5. Acesse a documentação da API Swagger em [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html).

Lembre-se de configurar o banco de dados MongoDB de acordo com suas necessidades no arquivo `application.properties`.
<br><div align="right">[Subir ao Início](#home)</div><br>

## FILA DE ATENDIMENTO

### Fila de Atendimento Microservice

O **Fila de Atendimento** é uma aplicação em Maven que atua como um microsserviço para gerenciar uma fila de clientes em espera. Ele recebe o cadastro de clientes de outras aplicações, os coloca em uma fila FIFO (First-In-First-Out) e fornece endpoints para consultar informações sobre a fila e atender os clientes na ordem de chegada.

### Funcionalidades

1. **Listar Clientes na Fila**
   - Endpoint: `/fila-de-atendimento/clientes-na-fila`
   - Descrição: Retorna a lista de clientes que estão na fila de espera.

2. **Obter Número de Clientes na Fila**
   - Endpoint: `/fila-de-atendimento/numero-de-clientes-na-fila`
   - Descrição: Retorna o número de clientes atualmente na fila de espera.

3. **Obter Próximo Cliente**
   - Endpoint: `/fila-de-atendimento/proximo-cliente`
   - Descrição: Retorna o próximo cliente da fila para atendimento, seguindo a ordem de chegada.

4. **Adicionar Cliente à Fila**
   - Endpoint: `/fila-de-atendimento/adicionar-cliente`
   - Descrição: Permite adicionar um cliente à fila de espera.

### Model de Cliente

A estrutura de dados do cliente é definida no modelo `ClienteNaFila`, que possui os seguintes campos:

- `id`: Identificador único do cliente.
- `nome`: Nome do cliente.
- `mcc`: Código MCC.
- `cpf`: CPF do cliente.
- `email`: Endereço de e-mail do cliente.
- `telefone`: Número de telefone do cliente.
- `tipo`: Tipo de cliente.
- `cnpj`: CNPJ (para clientes do tipo empresa).
- `razaoSocial`: Razão social (para clientes do tipo empresa).

### Configuração CORS

A aplicação está configurada para permitir solicitações de diferentes origens (CORS). As origens permitidas estão definidas no filtro `CorsFilter` no arquivo `CorsFilter.java`.

### Executando a Aplicação

Para executar a aplicação, siga os passos abaixo:

1. Certifique-se de que o Maven esteja instalado.
2. Clone este repositório.
3. Navegue até o diretório raiz do projeto.
4. Execute o seguinte comando para iniciar a aplicação:
   ```
   mvn spring-boot:run
   ```

A aplicação estará disponível em `http://localhost:8081`.

### Requisitos

- Java 17
- Maven
- Spring Boot 3.1.4
<br><div align="right">[Subir ao Início](#home)</div><br>

## FRONT END

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## BANCO DE DADOS

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## SWAGGER

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## CONTAINERIZACAO

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## DESENVOLVEDOR RESPONSAVEL

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>

## AGRADECIMENTO

* <p align='justify'> ESCREVER AQUI.</p>

<br><div align="right">[Subir ao Início](#home)</div><br>
