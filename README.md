## API - Projeto Agenda

---

## Descrição:

**Projeto Agenda** é uma API que tem por objetivo...

---

## Funcionalidades

**Prestador de serviço**

- Funcionalidade 1.
- Funcionalidade 1.
- Funcionalidade 1.

**Usuário**

- Funcionalidade 1.
- Funcionalidade 1.
- Funcionalidade 1.

---

## Instalação

**Pré-requisitos**

- Node.js (versão 14 ou superior)
- PostgreSQL
- Postman (necessário para testagem de endpoints)

**Como executar a API**

1 - Execute um git clone do projeto: git clone < link-do-repositorio >.

2 - Abra o projeto com a IDE de sua preferência.

3 - Abra o terminal dentro do diretório BACKEND e execute o comando: npm install.

4 - Após a execução bem-sucedida do comando npm install, crie um arquivo .env na raiz do projeto. Este arquivo deverá ser criado utilizando o bloco de notas, e deverá conter as seguintes informações (para se conectar ao banco de dados oficial do projeto, você deverá solicitar os dados de preenchimento abaixo para o administrador da API):

```json
JWT_SECRET= sua_chave_secreta_jwt

JWT_EXPIRES_IN=1h

JWT_REFRESH_EXPIRES_IN=7d

DB_HOST=localhost

DB_PORT=5432

DB_USERNAME=seu_usuario_de_banco

DB_PASSWORD=sua_senha

DB_NAME=agenda_ii8x

DB_SCHEMA=agenda
```

5 - Uma vez criado o arquivo .env, certifique-se de executar no Postgres a criação da database, de acordo com as informações contidas no arquivo .env (para conexão com o banco de dados oficial da API, será necessário solicitar os dados de conexão ao administrador da API)

6 - Novamente dentro da IDE, execute o seguinte comando no terminal: npm start

7 - Caso a conexão com o banco de dados for bem-sucedida, aparecerá uma mensagem de êxito no terminal, e você poderá testar os endpoints no Postman.

8 - Na raiz do projeto, existe uma coleção do Postman que será utilizada para testagem dos endpoints. Importe esta coleção para dentro do Postman e interaja com os endpoints conforme descrição abaixo.

---

## Uso

A aplicação oferece os seguintes endpoints para interação com o sistema:

1.  **Endpoint de Registro de Prestador**:

    - **Endpoint:** POST api/management/register
    - **Descrição**: Este endpoint é utilizado para cadastrar um novo prestador na plataforma. Ele requer informações detalhadas sobre o prestador, como nome, e-mail, senha, CPF/CNPJ, atividade, serviços oferecidos, etc.

    - **Corpo da requisição:**:

    ```json
    {
      "nome": "Rosi Cardoso",
      "email": "rosi.cardoso99@example.com",
      "senha": "senhaSegura123",
      "telefone": "11999999999",
      "cpf_cnpj": "1234429923423401",
      "atividade": "Professora",
      "servico": "Aulas particulares",
      "logo_base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
      "social_media": "https://instagram.com/RosiRosi",
      "website": "https://Rosi.com.br",
      "cidade": "São Paulo",
      "estado": {
        "nome": "São Paulo",
        "sigla": "SP"
      },
      "ritmo_trabalho": [
        {
          "dia_semana": "segunda",
          "hora_inicio": "08:00:00",
          "hora_fim": "18:00:00"
        },
        {
          "dia_semana": "terça",
          "hora_inicio": "08:00:00",
          "hora_fim": "18:00:00"
        }
      ],
      "categoria_id": 1,
      "subcategoria_id": 2,
      "tipo_agenda": null
    }
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 201 (CREATED)**:

    ```json
    {
      "message": "Prestador cadastrado com sucesso!",
      "prestador": {
        "id": 182,
        "nome": "Rosi Cardoso",
        "email": "rosi.cardoso99@example.com",
        "senha": "$2a$08$U2coS.O2tBmWooPjAGFdSuezX..xuAGEXlQQDpPNIGz0h09i3.Tge",
        "telefone": "11999999999",
        "tipo_usuario": "prestador           ",
        "cidade_id": 4854,
        "criado_em": "2024-10-28T23:12:48.204Z",
        "atualizado_em": null,
        "ativo": true,
        "usuario_id": 335,
        "cpf_cnpj": "1234429923423401",
        "atividade": "Professora",
        "services": "Aulas particulares",
        "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
        "instagram": "https://instagram.com/RosiRosi",
        "website": "https://Rosi.com.br",
        "listado": true,
        "tipo_agenda": null,
        "subcategoria_id": 2,
        "categoria_id": 1,
        "prestador_id": 62,
        "dia_semana": "segunda             ",
        "hora_inicio": "08:00:00",
        "hora_fim": "18:00:00"
      }
    }
    ```

2.  **Login**:

    - **Endpoint:** POST api/management/login

    - **Descrição**: Este endpoint é utilizado para realizar o login de um prestador já cadastrado. Após um login bem-sucedido, o sistema retorna um token JWT e um refresh token, que podem ser usados para autenticação.

    - **Corpo da requisição:**:

    ```json
    {
      "email": "rosi.cardoso99@example.com",
      "password": "senhaSegura123"
    }
    ```

    {

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2kuY2FyZG9zbzk5QGV4YW1wbGUuY29tIiwidGlwb1VzdWFyaW8iOiJwcmVzdGFkb3IgICAgICAgICAgICIsImlhdCI6MTczMDE1Nzk3MywiZXhwIjoxNzMwMjQ0MzczfQ.WY1bvBdL6KMKQqrgOx3LE36C8XZf1wETQv_osQwJOyI",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2kuY2FyZG9zbzk5QGV4YW1wbGUuY29tIiwidGlwb1VzdWFyaW8iOiJwcmVzdGFkb3IgICAgICAgICAgICIsImlhdCI6MTczMDE1Nzk3MywiZXhwIjoxNzMwNzYyNzczfQ.uMQZ00gUKYpViXIR0C8ZHkRkr-ktkAYGQjha9NCCSBE",
      "usuario": {
        "id": 335,
        "nome": "Rosi Cardoso",
        "email": "rosi.cardoso99@example.com",
        "senha": "$2a$08$U2coS.O2tBmWooPjAGFdSuezX..xuAGEXlQQDpPNIGz0h09i3.Tge",
        "telefone": "11999999999",
        "tipo_usuario": "prestador           ",
        "cidade_id": 4854,
        "criado_em": "2024-10-28T23:12:47.735Z",
        "atualizado_em": null,
        "ativo": true
      }
    }
    ```

3.  **Reset de Senha**:

    - **Endpoint:** GET api/management/reset-password

    - **Descrição**: Este endpoint é utilizado para resetar a senha de um prestador já cadastrado. Recebe o email do usuário para verificar se ele existe no sistema, e também recebe a nova senha que será armazenada.

    - **Corpo da requisição:**:

    ```json
    {
      "email": "rosi.cardoso99@example.com",
      "newPassword": "novaSenhaSegura123"
    }
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
      "message": "Senha atualizada com sucesso"
    }
    ```
4.  **Obter agendamentos futuros de um prestador**:

    - **Endpoint:** GET api/management/agendamentosFuturos/{idPrestador}

    - **Descrição**:Esse endpoint é responsável por fornecer uma lista de agendamentos agendados de um prestador específico com base no idPrestador, Identificador do fornecedor para o que queremos buscar agendamentos futuros.

    - **Corpo da requisição:**:

    não é necessário
    
    **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
    ```json {
    "message": "Agendamentos obtidos com sucesso!",
    "count": 1,
    "agendamentos": [
        {
            "agendamento": {
                "id": 34,
                "data_agendamento": "2024-11-11T03:00:00.000Z",
                "hora_inicio": "08:00:00",
                "hora_fim": "08:30:00",
                "assunto": "Consulta de rotina",
                "status": "pendente            ",
                "criado_em": "2024-11-06T20:29:06.457Z",
                "atualizado_em": "2024-11-06T20:29:06.457Z"
            },
            "cliente": {
                "id": 300,
                "nome": "Bianca Mendonça",
                "email": "luancarvalho@example.org405384066214102024",
                "telefone": "+55 (041) 6513 4477"
            },
            "prestador": {
                "id": 62,
                "nome": "Rosi Cardoso",
                "email": "rosi.cardoso99@example.com",
                "telefone": "11999999999c",
                "cpf_cnpj": "1234429923423401",
                "atividade": "Professora",
                "services": "Aulas particulares",
                "instagram": "https://instagram.com/RosiRosi",
                "website": "https://Rosi.com.br"
            }
        }
    ]
}
´´´
5.  **Obter agendamentos por id de prestador**:

 - **Endpoint:** GET api/management/agendamentos/{idPrestador}

    - **Descrição**:Este endpoint é utilizado para recuperar uma lista de agendamentos associados a um prestador.

    - **Corpo da requisição:**:

    não é necessário
    
    **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
    ```json {
    "message": "Agendamentos obtidos com sucesso!",
    "count": 28,
    "agendamentos": [
        {
            "agendamento": {
                "id": 4,
                "data_agendamento": "2024-10-28T03:00:00.000Z",
                "hora_inicio": "08:00:00",
                "hora_fim": "08:30:00",
                "assunto": "teste",
                "status": "confirmado          ",
                "criado_em": "2024-10-29T14:38:14.652Z",
                "atualizado_em": "2024-10-29T17:43:20.211Z"
            },
            "cliente": {
                "id": 300,
                "nome": "Bianca Mendonça",
                "email": "luancarvalho@example.org405384066214102024",
                "telefone": "+55 (041) 6513 4477"
            },
            "prestador": {
                "id": 62,
                "nome": "Rosi Cardoso",
                "email": "rosi.cardoso99@example.com",
                "telefone": "11999999999c",
                "cpf_cnpj": "1234429923423401",
                "atividade": "Professora",
                "services": "Aulas particulares",
                "instagram": "https://instagram.com/RosiRosi",
                "website": "https://Rosi.com.br"
            }
        },
        {
            "agendamento": {
                "id": 5,
                "data_agendamento": "2024-11-04T03:00:00.000Z",
                "hora_inicio": "08:00:00",
                "hora_fim": "08:30:00",
                "assunto": "teste",
                "status": "pendente            ",
                "criado_em": "2024-10-29T14:41:15.586Z",
                "atualizado_em": "2024-10-29T14:41:15.586Z"
            },
            "cliente": {
                "id": 300,
                "nome": "Bianca Mendonça",
                "email": "luancarvalho@example.org405384066214102024",
                "telefone": "+55 (041) 6513 4477"
            },
            "prestador": {
                "id": 62,
                "nome": "Rosi Cardoso",
                "email": "rosi.cardoso99@example.com",
                "telefone": "11999999999c",
                "cpf_cnpj": "1234429923423401",
                "atividade": "Professora",
                "services": "Aulas particulares",
                "instagram": "https://instagram.com/RosiRosi",
                "website": "https://Rosi.com.br"
            }
        },
        {
            "agendamento": {
                "id": 6,
                "data_agendamento": "2024-11-04T03:00:00.000Z",
                "hora_inicio": "08:00:00",
                "hora_fim": "08:30:00",
                "assunto": "Consulta de rotina",
                "status": "pendente            ",
                "criado_em": "2024-10-29T21:28:26.523Z",
                "atualizado_em": "2024-10-29T21:28:26.523Z"
            },
            "cliente": {
                "id": 300,
                "nome": "Bianca Mendonça",
                "email": "luancarvalho@example.org405384066214102024",
                "telefone": "+55 (041) 6513 4477"
            },
            "prestador": {
                "id": 62,
                "nome": "Rosi Cardoso",
                "email": "rosi.cardoso99@example.com",
                "telefone": "11999999999c",
                "cpf_cnpj": "1234429923423401",
                "atividade": "Professora",
                "services": "Aulas particulares",
                "instagram": "https://instagram.com/RosiRosi",
                "website": "https://Rosi.com.br"
            }
                },
}
6.  **Obter agendamentos por id de agendamento**:

 - **Endpoint:** GET api/management/agendamento/{idAgendamento}

    - **Descrição**Este endpoint permite obter uma visão detalhada e específica de um compromisso, possibilitando a consulta a informações completas sobre o agendamento e os participantes envolvidos (cliente e prestador).

  - **Corpo da requisição:**:

    não é necessário
    
  **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
    ```json{
    "message": "Agendamento obtido com sucesso!",
    "count": 1,
    "agendamentos": [
        {
            "agendamento": {
                "id": 29,
                "data_agendamento": "2024-10-28T03:00:00.000Z",
                "hora_inicio": "08:00:00",
                "hora_fim": "08:30:00",
                "assunto": "Consulta de rotina",
                "status": "pendente            ",
                "criado_em": "2024-10-31T05:24:51.802Z",
                "atualizado_em": "2024-11-01T06:08:57.427Z"
            },
            "cliente": {
                "id": 300,
                "nome": "Bianca Mendonça",
                "email": "luancarvalho@example.org405384066214102024",
                "telefone": "+55 (041) 6513 4477"
            },
            "prestador": {
                "id": 62,
                "nome": "Rosi Cardoso",
                "email": "rosi.cardoso99@example.com",
                "telefone": "11999999999c",
                "cpf_cnpj": "1234429923423401",
                "atividade": "Professora",
                "services": "Aulas particulares",
                "instagram": "https://instagram.com/RosiRosi",
                "website": "https://Rosi.com.br"
            }
        }
    ]
}
7-**Obter agendamentos por id de prestador em um intervalo de tempo**:

- **Endpoint:** GET api/management/agendamentos/{idPrestador}/{dataInicio}/{dataFim}

    - **Descrição**Esse endpoint permite filtrar agendamentos por prestador e intervalo de tempo, retornando uma lista detalhada ou vazia caso nenhum agendamento seja encontrado.

  - **Corpo da requisição:**:

    não é necessário
    
  **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
    ```json{
    "message": "Agendamentos obtidos com sucesso!",
    "count": 0,
    "agendamentos": []
}
---

**Contato**

Para quaisquer dúvidas ou sugestões, sinta-se à vontade para entrar em contato através de:

- E-mail: email do Pedro Sbardelotto (INSERIR)
- E-mail: email do Jonatas Davi (INSERIR)
