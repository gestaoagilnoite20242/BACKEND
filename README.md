## API - Projeto Agenda

---

## Descrição:

**Projeto Agenda** é uma API que tem por objetivo permitir que prestadores de serviço possam divulgar seu trabalho e organizar a agenda de seus compromissos, de modo que os usuários do aplicativo possam verificar os serviços oferecidos, consultar horários disponíveis dos profissionais e agendar horários com os mesmos.

---

## Funcionalidades

**Prestador de serviço**

- Pode cadastrar seus serviços, informando categoria e disponibilidade de horários.
- Pode consultar sua agenda de modo dinâmico, verificando todos os agendamentos futuros e também para as próximas duas horas.
- Pode consultar seu histórico de agendamentos, consultando todas os seus compromissos já marcados.

**Usuário**

- Pode consultar todas as categorias de serviço disponibilizadas e também os prestadores disponíveis por categoria, com informação da disponibilidade de cada prestador.
- Pode solicitar um agendamento de horário com o prestador.
- Pode atualizar os dados de um agendamento.
- Pode solicitar a exclusão de um agendamento.

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

8 - Na raiz do projeto, existe uma coleção do Postman que será utilizada para testagem dos endpoints. Importe esta coleção para dentro do Postman e interaja com os endpoints conforme descrição abaixo. (ATENÇÃO: será necessário executar a rota de Login para geração de um Bearer Token, que será utilizado para acessar os endpoints de número 4, 5, 6, 7, 8, 9, 10, 11, 14 e 15, conforme abaixo - os demais não necessitam de autenticação).

---

## Uso

A aplicação oferece os seguintes endpoints para interação com o sistema:

1.  **Endpoint de Registro de Prestador**:

    - **Endpoint:** POST /register
    - **Descrição**: Este endpoint é utilizado para cadastrar um novo prestador na plataforma. Ele requer informações detalhadas sobre o prestador, como nome, e-mail, senha, CPF/CNPJ, atividade, serviços oferecidos, etc.

    - **Corpo da requisição:**:

    ```json
    {
      "nome": "João Rosa",
      "email": "joao.rosa.sbardelotto@example.com",
      "senha": "senhaSegura123",
      "telefone": "51999989991",
      "cpf_cnpj": "60000100001",
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
        },
        {
          "dia_semana": "quarta",
          "hora_inicio": "08:00:00",
          "hora_fim": "18:00:00"
        },
        {
          "dia_semana": "quinta",
          "hora_inicio": "08:00:00",
          "hora_fim": "18:00:00"
        },
        {
          "dia_semana": "sexta",
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
      "resRows": [
        {
          "usuario": {
            "id": 401,
            "nome": "João Rosa",
            "email": "joao.rosa.sbardelotto@example.com",
            "telefone": "51999989991",
            "tipo_usuario": "prestador           "
          },
          "prestador": {
            "id": 90,
            "cpf_cnpj": "60000100001",
            "atividade": "Professora",
            "tipo_agenda": null,
            "services": "Aulas particulares",
            "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
            "instagram": "https://instagram.com/RosiRosi",
            "website": "https://Rosi.com.br"
          },
          "cidade": {
            "id": 4855
          },
          "categoria": {
            "id": 1,
            "subcategoria_id": 2
          },
          "ritmoTrabalho": [
            {
              "dia_semana": "segunda             ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            },
            {
              "dia_semana": "terça               ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            },
            {
              "dia_semana": "quarta              ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            },
            {
              "dia_semana": "quinta              ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            },
            {
              "dia_semana": "sexta               ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            }
          ]
        }
      ]
    }
    ```

2.  **Login**:

    - **Endpoint:** POST /login

    - **Descrição**: Este endpoint é utilizado para realizar o login de um prestador já cadastrado. Após um login bem-sucedido, o sistema retorna um token JWT e um refresh token, que podem ser usados para autenticação.

    - **Corpo da requisição:**:

    ```json
    {
      "email": "rosi.cardoso99@example.com",
      "password": "senhaSegura123"
    }
    ```

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

    - **Endpoint:** POST /reset-password

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

    - **Endpoint:** GET /agendamentosFuturos/{idPrestador}

    - **Descrição**: Esse endpoint é responsável por fornecer uma lista de agendamentos agendados de um prestador específico com base no idPrestador, Identificador do fornecedor para o que queremos buscar agendamentos futuros.

    - **Corpo da requisição:**:

    ```json
    Não é necessário.
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
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
    ```

5.  **Obter agendamentos por id de prestador**:

    - **Endpoint:** GET /agendamentos/{idPrestador}

    - **Descrição**: Este endpoint é utilizado para recuperar uma lista de agendamentos associados a um prestador.

    - **Corpo da requisição:**:

    ```json
    Não é necessário.
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
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
    ```

6.  **Obter agendamentos por id de agendamento**:

    - **Endpoint:** GET /agendamento/{idAgendamento}

    - **Descrição**: Este endpoint permite obter uma visão detalhada e específica de um compromisso, possibilitando a consulta a informações completas sobre o agendamento e os participantes envolvidos (cliente e prestador).

    - **Corpo da requisição:**:

    ```json
    Não é necessário.
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
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
    ```

7.  **Obter agendamentos por id de prestador em um intervalo de tempo**:

    - **Endpoint:** GET /agendamentos/{idPrestador}/{dataInicio}/{dataFim}

    - **Descrição**: Esse endpoint permite filtrar agendamentos por prestador e intervalo de tempo, retornando uma lista detalhada ou vazia caso nenhum agendamento seja encontrado.

    - **Corpo da requisição:**:

    ```json
    Não é necessário.
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
      "message": "Agendamentos obtidos com sucesso!",
      "count": 1,
      "totalRegistros": 1,
      "totalPaginas": 1,
      "currentPage": 1,
      "agendamentos": [
        {
          "agendamento": {
            "id": 115,
            "data_agendamento": "2024-11-08T03:00:00.000Z",
            "hora_inicio": "12:00:00",
            "hora_fim": "12:30:00",
            "assunto": "Consulta de rotina",
            "status": "pendente            ",
            "criado_em": "2024-11-12T21:12:26.824Z",
            "atualizado_em": "2024-11-12T21:12:26.824Z"
          },
          "cliente": {
            "id": 334,
            "nome": "Jorge",
            "email": null,
            "telefone": "51999999997"
          },
          "prestador": {
            "id": 74,
            "nome": "João Rosa",
            "email": "joao.rosa@example.com",
            "telefone": "51999999991",
            "cpf_cnpj": "60000000001",
            "atividade": "Professora",
            "services": "Aulas particulares",
            "instagram": "https://instagram.com/RosiRosi",
            "website": "https://Rosi.com.br"
          }
        }
      ]
    }
    ```

8.  **Inserir agendamento no banco**:

    - **Endpoint:** POST /agendamentos

    - **Descrição**: Esse endpoint permite inserir no banco de dados um agendamento de horário.

    - **Corpo da requisição:**:

    ```json
    {
      "cliente_id": 300,
      "prestador_id": 62,
      "data_agendamento": "2024-11-07",
      "hora_inicio": "12:00",
      "hora_fim": "12:30",
      "assunto": "Consulta de rotina",
      "status": "pendente"
    }
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 201 (CREATED)**

      ```json
      {
        "message": "Agendamento inserido com sucesso!",
        "agendamento": {
          "agendamento": {
            "data_agendamento": "2024-11-07T00:00:00.000Z",
            "hora_inicio": "12:00:00",
            "hora_fim": "12:30:00",
            "assunto": "Consulta de rotina",
            "status": "pendente            ",
            "criado_em": "2024-11-10T14:09:16.945Z",
            "atualizado_em": "2024-11-10T14:09:16.945Z"
          },
          "cliente": {
            "id": 300
          },
          "prestador": {
            "id": 62
          }
        }
      }
      ```

9.  **Obter disponibilidade de um prestador para um dia da semana**:

    - **Endpoint:** GET /disponibilidade/{idPrestador}/{diaSemana}

    - **Descrição**: Esse endpoint permite consultar os horários disponíveis para um prestador em um determinado dia da semana.

    - **Corpo da requisição:**:

    ```json
    Não é necessário
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
      ```json
      {
        "message": "Disponibilidade do dia obtida com sucesso!",
        "count": 1,
        "disponibilidade": [
          {
            "prestador": {
              "id": 62,
              "cpf_cnpj": "1234429923423401",
              "atividade": "Professora",
              "services": "Aulas particulares",
              "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
              "instagram": "https://instagram.com/RosiRosi",
              "website": "https://Rosi.com.br",
              "usuario_id": 335
            },
            "usuario": {
              "nome": "Rosi Cardoso",
              "email": "rosi.cardoso99@example.com",
              "telefone": "11999999999c"
            },
            "disponibilidade": {
              "dia_semana": "segunda             ",
              "hora_inicio": "08:00:00",
              "hora_fim": "18:00:00"
            }
          }
        ]
      }
      ```

10. **Obter disponibilidade de um prestador para um dia da semana**:

    - **Endpoint:** PUT /agendamentos/{idAgendamento}

    - **Descrição**: Esse endpoint permite atualizar os dados de um agendamento.

    - **Corpo da requisição:**:

    ```json
    {
      "cliente_id": 300,
      "prestador_id": 62,
      "data_agendamento": "2024-10-28",
      "hora_inicio": "08:00",
      "hora_fim": "08:30",
      "assunto": "Consulta de rotina",
      "status": "pendente"
    }
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 201 (CREATED)**
      ```json
      {
        "message": "Agendamento inserido com sucesso!",
        "agendamento": {
          "agendamento": {
            "data_agendamento": "2024-10-28T00:00:00.000Z",
            "hora_inicio": "08:00:00",
            "hora_fim": "08:30:00",
            "assunto": "Consulta de rotina",
            "status": "pendente            ",
            "criado_em": "2024-11-10T14:35:56.516Z",
            "atualizado_em": "2024-11-10T14:35:56.516Z"
          },
          "cliente": {
            "id": 300
          },
          "prestador": {
            "id": 62
          }
        }
      }
      ```

11. **Obter agendamentos por id de prestador das proximas duas horas**:

    - **Endpoint:** GET /agendamentosNextHours/{idPrestador}

    - **Descrição**: Esse endpoint permite consultar os agendamentos do prestador para as próximas duas horas seguintes ao momento da requisição.

    - **Corpo da requisição:**:

    ```json
    Não é necessário
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
      ```json
      {
        "message": "Agendamento obtido com sucesso!",
        "count": 0,
        "agendamentos": []
      }
      ```

12. **Obter categorias de serviços**:

    - **Endpoint:** GET /categorias/getall

    - **Descrição**: Esse endpoint permite obter uma lista de todas categorias de serviço cadastradas no sistema.

    - **Corpo da requisição:**:

    ```json
    Não é necessário
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
      ```json
      {
        "message": "Categorias obtidas com sucesso!",
        "count": 12,
        "categorias": [
          {
            "id": 10,
            "nome": "Administração e Imóveis",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 9,
            "nome": "Animais de Estimação",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 8,
            "nome": "Consultoria e Assessoria",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 6,
            "nome": "Educação e Cursos",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 7,
            "nome": "Eventos e Festas",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 11,
            "nome": "Financeiro e Jurídico",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 12,
            "nome": "Marketing e Comunicação",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 1,
            "nome": "Reformas e Construção",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 3,
            "nome": "Saúde e Bem-Estar",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 2,
            "nome": "Serviços Domésticos",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 4,
            "nome": "Tecnologia e Informática",
            "criado_em": "2024-10-26T18:50:37.331Z"
          },
          {
            "id": 5,
            "nome": "Transporte e Mudanças",
            "criado_em": "2024-10-26T18:50:37.331Z"
          }
        ]
      }
      ```

13. **Obter prestadores por categoria de serviços**:

    - **Endpoint:** GET /categorias/prestadores/{idCategoria}

    - **Descrição**: Esse endpoint permite obter uma lista de todos prestadores cadastrados em uma determinada categoria de serviço cadastrada no sistema.

    - **Corpo da requisição:**:

    ```json
    Não é necessário
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**
      ```json
      {
        "message": "Prestadores da categoria obtidos com sucesso!",
        "count": 20,
        "prestadores": [
          {
            "prestador": {
              "id": 53,
              "nome": "Marcelo Pereira",
              "categoria": "Reformas e Construção",
              "email": "marcelo@example.com",
              "telefone": "51981838118",
              "cidade": "Porto Alegre",
              "estado": "Rio Grande do Sul",
              "cpf_cnpj": "1234423923423402",
              "atividade": "Desenvolvedor de Software",
              "services": "Criação de sites e aplicações",
              "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
              "instagram": "https://www.linkedin.com/in/marcelopoars/",
              "website": "https://www.marcelopereira.dev/",
              "usuario_id": 313
            }
          },
          {
            "prestador": {
              "id": 55,
              "nome": "Gleisson",
              "categoria": "Reformas e Construção",
              "email": "gleisson@example.com",
              "telefone": "51999303193",
              "cidade": "São Paulo",
              "estado": "São Paulo",
              "cpf_cnpj": "1234423923523402",
              "atividade": "Professora",
              "services": "Aulas particulares",
              "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...base64string",
              "instagram": "https://instagram.com/RosiRosi",
              "website": "https://Rosi.com.br",
              "usuario_id": 316
            }
          }
        ]
      }
      ```

14. **Atualizar agendamento no banco**:

    - **Endpoint:** PUT /agendamentos/{idAgendamento}

    - **Descrição**: Este endpoint permite atualizar os dados de um agendamento.

    - **Corpo da requisição:**:

    ```json
    {
      "cliente_id": 300,
      "prestador_id": 74,
      "data_agendamento": "2024-11-18",
      "hora_inicio": "08:00",
      "hora_fim": "08:30",
      "assunto": "Consulta de rotina",
      "status": "pendente"
    }
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
      "message": "Agendamento atualizado com sucesso!",
      "agendamento": {
        "agendamento": {
          "data_agendamento": "2024-11-18T03:00:00.000Z",
          "hora_inicio": "08:00:00",
          "hora_fim": "08:30:00",
          "assunto": "Consulta de rotina",
          "status": "pendente            ",
          "criado_em": "2024-11-17T00:09:40.821Z",
          "atualizado_em": "2024-11-17T00:10:47.574Z"
        }
      }
    }
    ```

15. **Soft delete de agendamentos**:

    - **Endpoint:** DEL /agendamentos/{idAgendamento}

    - **Descrição**: Este endpoint permite atualizar os dados de um agendamento.

    - **Corpo da requisição:**:

    ```json
    Não é necessário.
    ```

    - **Resposta Esperada em Caso de Sucesso – HTTP Status 200 (OK)**

    ```json
    {
      "message": "Agendamento cancelado com sucesso!",
      "agendamento": {
        "agendamento": {
          "id": 163,
          "data_agendamento": "2024-11-18T03:00:00.000Z",
          "hora_inicio": "08:00:00",
          "hora_fim": "08:30:00",
          "assunto": "Consulta de rotina",
          "status": "cancelado           ",
          "criado_em": "2024-11-17T00:09:40.821Z",
          "atualizado_em": "2024-11-17T00:14:32.746Z"
        },
        "cliente": {
          "id": 300
        },
        "prestador": {
          "id": 74
        }
      }
    }
    ```

---

**Contato**

Para quaisquer dúvidas ou sugestões, sinta-se à vontade para entrar em contato através de:

- E-mail: sbardelottopedro97@gmail.com
- E-mail: jonatasdavi.ads@gmail.com
