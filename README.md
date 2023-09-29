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

### Endpoints Disponíveis

#### Listagem de Clientes na Fila

- **Método**: GET
- **Endpoint**: `/fila-de-atendimento/clientes-na-fila`
- **Descrição**: Retorna a lista de clientes na fila de espera.
- **Exemplo**: [http://localhost:8081/fila-de-atendimento/clientes-na-fila](http://localhost:8081/fila-de-atendimento/clientes-na-fila)

#### Número de Clientes na Fila

- **Método**: GET
- **Endpoint**: `/fila-de-atendimento/numero-de-clientes-na-fila`
- **Descrição**: Retorna o número de clientes atualmente na fila de espera.
- **Exemplo**: [http://localhost:8081/fila-de-atendimento/numero-de-clientes-na-fila](http://localhost:8081/fila-de-atendimento/numero-de-clientes-na-fila)

#### Próximo Cliente a ser Atendido

- **Método**: GET
- **Endpoint**: `/fila-de-atendimento/proximo-cliente`
- **Descrição**: Retorna o próximo cliente a ser atendido e o remove da fila.
- **Exemplo**: [http://localhost:8081/fila-de-atendimento/proximo-cliente](http://localhost:8081/fila-de-atendimento/proximo-cliente)

#### Adicionar Cliente à Fila

- **Método**: POST
- **Endpoint**: `/fila-de-atendimento/adicionar-cliente`
- **Descrição**: Adiciona um cliente à fila de espera.
- **Corpo da Solicitação**: Um objeto JSON contendo os detalhes do cliente.
- **Exemplo**:
  ```json
  {
    "id": "1",
    "nome": "Nome do Cliente",
    "mcc": "1234",
    "cpf": "12345678901",
    "email": "cliente@example.com",
    "telefone": "123-456-7890",
    "tipo": "JURIDICA",
    "cnpj": "12345678901234",
    "razaoSocial": "Razão Social da Empresa"
  }
  ```

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

### Projeto Web Front End React

Este documento descreve o projeto em React que atua como uma interface de usuário para acessar os dois microsserviços Java mencionados acima e um banco de dados MongoDB. O projeto permite o cadastro de clientes por meio de um formulário e interage com os microsserviços para obter informações sobre os clientes e gerenciar uma fila de atendimento.

### Requisitos

Certifique-se de que você tenha as seguintes dependências instaladas antes de executar o projeto:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (gerenciador de pacotes Node.js)

### Instalação

1. Clone o repositório do projeto no seu ambiente local:

```bash
git clone https://github.com/andersonaoliveira/Desafio_Fullstack_Ada_Cielo.git
cd web-front-end
```

2. Instale as dependências do projeto usando o npm:

```bash
npm install
```

### Configuração

Antes de executar o projeto, você precisa verificar as URLs dos microsserviços Java. A aplicação pre-cadastro-de-clientes deve ser executada na porta 8080, enquanto a aplicação fila-de-atendimento na porta 8081, em caso de alteração será necessário modificar os arquivos da pasta "pages"

### Execução

Para iniciar o aplicativo React, execute o seguinte comando:

```bash
npm start
```

O aplicativo será iniciado e estará disponível em `http://localhost:3000` no seu navegador. Caso opte por abrir via docker-compose, abrirá na porta 80. As configurações de CORs dos microsserviços permitem o acesso de ambas as portas.

### Funcionalidades Principais

Aqui estão as principais funcionalidades do aplicativo React:

#### Cadastro de Clientes

- Acesse a página de cadastro de clientes clicando em "Cadastrar Cliente" no menu.
- Preencha o formulário com as informações do cliente.
- Clique no botão "Enviar" para cadastrar o cliente. Os dados serão enviados para o microsserviço Java correspondente.

#### Clientes Cadastrados

- Acesse a página de clientes cadastrados clicando em "Clientes Cadastrados" no menu.
- Você verá uma lista de clientes cadastrados no banco de dados MongoDB. Você pode apagar ou atualizar os clientes a partir desta página.

#### Visualização da Fila de Espera

- Acesse a página de visualização da fila de espera clicando em "Fila de Espera" no menu.
- Você poderá ver o próximo cliente na fila de atendimento. Você também pode atualizar a fila para ver o próximo cliente.

#### Próximo Cliente da Fila

- Acesse a página de próximo cliente da fila clicando em "Próximo Cliente da Fila" no menu.
- Você poderá ver o cliente que deverá ser atendido na fila de espera. Você pode avançar para o próximo cliente quando o atendimento for concluído.

### Acessibilidade

O projeto inclui recursos de acessibilidade, como opções de aumento/diminuição de fonte e alto contraste. Você pode acessar esses recursos clicando nos botões correspondentes no menu de acessibilidade ou pressionando as teclas ```Alt + "número correspondente"```.

### Estrutura do Projeto

- `package.json`: Contém as dependências e scripts do projeto.
- `src/Routes.js`: Define as rotas do aplicativo, as URLs.
- `src/pages/`: Contém as diferentes páginas do aplicativo.
- `src/components/`: Contém os componentes reutilizáveis, como cabeçalho e rodapé.
- `src/assets/`: Contém os arquivos de estilos, imagens e outros recursos.

### Conclusão

Este projeto em React oferece uma interface de usuário para interagir com microsserviços Java e um banco de dados MongoDB para o cadastro de clientes e gerenciamento de uma fila de atendimento.
<br><div align="right">[Subir ao Início](#home)</div><br>

## BANCO DE DADOS

Esta documentação fornece uma visão geral do banco de dados utilizado em nossas aplicações

Nossos microsserviços utilizam o MongoDB, um banco de dados NoSQL orientado a documentos, para armazenar informações dos clientes que são cadastrados para posterior atendimento em fila. Abaixo estão os detalhes do banco de dados:

- **Tipo de Banco de Dados**: MongoDB
- **Host**: localhost
- **Porta**: 27017
- **Nome do banco**: banco_de_dados

### Estrutura do Banco de Dados

O MongoDB é um banco de dados NoSQL que armazena dados em documentos BSON (formato binário JSON). Neste banco de dados, a aplicação utiliza uma coleção para armazenar os detalhes dos clientes que estão na fila de atendimento. Abaixo estão os detalhes da coleção:

#### Coleção `cliente`

- **Documentos**:

  Cada documento na coleção representa os detalhes de um cliente cadastrado. Os campos do documento correspondem aos atributos do objeto `Cliente` em nossos microsserviços.

  Exemplo de documento:

  ```json
  {
    "_id": ObjectId("5d7a4a536a3d2a1e4c30153a"),
    "id": "123",
    "nome": "Nome do Cliente",
    "mcc": "1234",
    "cpf": "12345678901",
    "email": "cliente@email.com",
    "telefone": "+1234567890",
    "tipo": "FISICA",
    "cnpj": null,
    "razao_social": null
  }
  ```

- **Índices**:

### Exemplo de Consulta

Aqui está um exemplo de consulta MongoDB simples que permite recuperar todos os clientes cadastrados:

```javascript
db.cliente.find({});
```
<br><div align="right">[Subir ao Início](#home)</div><br>

## SWAGGER

### Documentação da API com Swagger

Este projeto utiliza o Swagger para fornecer uma documentação interativa e detalhada da API. O Swagger simplifica a exploração e o teste dos endpoints da API diretamente no navegador. Siga as instruções abaixo para acessar a documentação Swagger:

#### Acesso à Documentação Swagger

1. Certifique-se de que a aplicação esteja em execução. Caso não esteja, você pode iniciar a aplicação com o seguinte comando:

   ```
   mvn spring-boot:run
   ```

2. Abra um navegador da web.

3. Acesse a interface Swagger em:

   ```
   http://localhost:8080/swagger-ui.html
   ```

   Isso abrirá a página principal da documentação Swagger.

### Explorando a Documentação

A interface Swagger fornece uma visão geral dos endpoints disponíveis e permite que você teste as operações diretamente na página. Aqui está o que você pode fazer na documentação:

- **Listagem de Endpoints**: A página inicial exibe uma lista de todos os endpoints da API. Clique em um endpoint para ver mais detalhes.

- **Detalhes do Endpoint**: Ao clicar em um endpoint, você verá informações detalhadas, incluindo os métodos HTTP suportados, parâmetros, exemplos de solicitação e resposta, entre outros.

- **Teste de Endpoint**: Você pode testar um endpoint diretamente na documentação. Basta clicar no botão "Try it out" e preencher os campos de entrada. Em seguida, clique em "Execute" para enviar a solicitação.

- **Visualização do Modelo de Dados**: A documentação também inclui informações sobre os modelos de dados usados na API, como a estrutura de um objeto de cliente.

### Benefícios da Documentação Swagger

A documentação Swagger é uma ferramenta valiosa para desenvolvedores, testadores e qualquer pessoa que precise interagir com a API. Ela oferece:

- **Facilidade de Uso**: Permite explorar e entender rapidamente a API.

- **Teste Direto**: Você pode testar os endpoints sem precisar de ferramentas externas.

- **Exemplos Claros**: Mostra exemplos claros de solicitações e respostas.

- **Economia de Tempo**: Reduz o tempo gasto na pesquisa de informações sobre a API.

Aproveite a documentação Swagger para explorar e interagir com a API deste projeto.
<br><div align="right">[Subir ao Início](#home)</div><br>

## CONTAINERIZACAO

O Docker foi escolhido por sua variedade de imagens, agilidade e por ser a ferramenta mais utilizada. Rodar a aplicação em container permite disponibilidade, segurança, agilidade, economia de recursos, escalabilidade dentre outras. Para configuração do Docker utilizamos o docker-compose em conjunto com os Dockerfile de cada aplicação.

O projeto é composto por três serviços principais: `pre-cadastro-de-clientes`, `fila-de-atendimento` e `web-front-end`, e utiliza o MongoDB como banco de dados. Cada serviço é definido em um contêiner Docker separado.

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema antes de prosseguir.

- [Instalação do Docker](https://docs.docker.com/get-docker/)
- [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

### Como Executar as Aplicações com Docker

Siga as etapas abaixo para configurar e executar as aplicações em contêineres Docker:

1. Clone o repositório do projeto para o seu ambiente local, se ainda não o tiver feito:

   ```bash
   git clone [https://github.com/andersonaoliveira/Desafio_Fullstack_Ada_Cielo.git]
   ```

2. Navegue até o diretório raiz do projeto:

   ```bash
   cd [Desafio_Fullstack_Ada_Cielo]
   ```

3. Execute o seguinte comando para construir as imagens Docker e iniciar os serviços:

   ```bash
   docker-compose up --build
   ```

   Isso criará e iniciará todos os contêineres Docker necessários com base nas configurações definidas no arquivo `docker-compose.yml`. Os serviços ficarão em execução em segundo plano.

4. Após a conclusão bem-sucedida, você pode acessar as seguintes aplicações nos seguintes URLs:

   - **Pré-Cadastro de Clientes**: [http://localhost:8080](http://localhost:8080)
   - **Fila de Atendimento**: [http://localhost:8081](http://localhost:8081)
   - **Web Front-End**: [http://localhost](http://localhost)

5. Para parar os serviços e remover os contêineres Docker, execute o seguinte comando no diretório do projeto:

   ```bash
   docker-compose down
   ```

### Estrutura de Diretórios do Projeto

- `pre-cadastro-de-clientes/`: Código-fonte e configuração para o serviço de Pré-Cadastro de Clientes.
- `fila-de-atendimento/`: Código-fonte e configuração para o serviço de Fila de Atendimento.
- `web-front-end/`: Código-fonte e configuração para o serviço Web Front-End.
- `docker-compose.yml`: Arquivo de composição Docker que define os serviços e suas configurações.

### Observações

- Certifique-se de que as portas especificadas nos serviços (por exemplo, 8080, 8081, 80) não estejam em uso por outros processos em sua máquina.
- Os contêineres Docker para o MongoDB e cada serviço serão construídos a partir das imagens base especificadas nos arquivos `Dockerfile`.
- Você pode personalizar ainda mais as configurações do Docker, como nomes de contêineres e volumes, diretamente no arquivo `docker-compose.yml` conforme necessário.
<br><div align="right">[Subir ao Início](#home)</div><br>

## DESENVOLVEDOR RESPONSAVEL

<a href="https://github.com/andersonaoliveira"><img src="https://avatars.githubusercontent.com/u/90530503?v=4" width="100px;" alt="Foto do Anderson de Aguiar de Oliveira no GitHub"/><br><sub><b>Anderson de Aguiar de Oliveira</b></sub></a>

<br><div align="right">[Subir ao Início](#home)</div><br>

## AGRADECIMENTO

**Prezadas ADA e Cielo**

<p align='justify'>Gostaria de expressar minha sincera gratidão por me proporcionarem a incrível oportunidade de participar do "Bootcamp Ada/Cielo FullStack". É com grande alegria que escrevo estas palavras, pois sei que essa jornada está apenas começando, e foi graças a vocês que estou tendo essa chance transformadora.</p>

<p align='justify'>Ao longo desse processo seletivo desafiador, desde a prova de aptidão tech até a resolução de case, pude perceber o comprometimento e o esforço das equipes da ADA e da Cielo em identificar e apoiar talentos promissores como os que estiveram comigo nessa jornada. A competição foi intensa, com mais de 3400 candidatos, mas saber que fui escolhido entre os 125 que tiveram a oportunidade de seguir adiante foi uma honra e uma responsabilidade que levei muito a sério.</p>

<p align='justify'>Também é importante mencionar que, embora alguns candidatos tenham desistido no meio do caminho, eu me mantive firme, determinado a superar cada desafio que se apresentou. Essa experiência não apenas testou minha habilidade técnica, mas também fortaleceu minha resiliência e determinação.</p>

<p align='justify'>Agora, com o desafio individual concluído e a perspectiva de aprender e crescer ainda mais na minha profissão, estou verdadeiramente empolgado. Sei que esta foi uma oportunidade única para aprimorar minhas habilidades e contribuir de forma significativa para evoluir no setor de tecnologia.</p>

<p align='justify'>Portanto, gostaria de agradecer novamente à ADA e à Cielo por acreditarem em meu potencial e por investirem em meu desenvolvimento. Estou ansioso pelo que vem a seguir, mas ter aprendido tanto e em tão pouco tempo, com tanta gente boa e qualificada me fazem crer que estou pronto. Com determinação e gratidão, estou comprometido em fazer o máximo possível para justificar a confiança que vocês depositaram em mim.</p>

Muito obrigado por esta oportunidade incrível.

Atenciosamente,

Anderson de Aguiar de Oliveira

<br><div align="right">[Subir ao Início](#home)</div><br>
