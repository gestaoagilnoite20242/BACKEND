const db = require('../config/db'); // Importa a conexão com o banco de dados

function formatDisponibilidade(row) {
  return {
    prestador: {
      id: row.id,
      cpf_cnpj: row.cpf_cnpj,
      atividade: row.atividade,
      services: row.services,
      logo: row.logo,
      instagram: row.instagram,
      website: row.website,
      usuario_id: row.usuario_id,
    },
    usuario: {
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
    },
    disponibilidade: {
      dia_semana: row.dia_semana,
      hora_inicio: row.hora_inicio,
      hora_fim: row.hora_fim,
    }
  };
}


// Função para buscar a disponibilidade de um prestator por ID
exports.getDispByPrestIdDay = async (req, res) => {
  const { prestador_id, dia_da_semana } = req.params;

  try {

    const queryWithParameter = `
      select
        a.id
        ,a.cpf_cnpj
        ,a.atividade
        ,a.services
        ,a.logo
        ,a.instagram
        ,a.website
        ,a.usuario_id
        ,c.nome
        ,c.email
        ,c.telefone
        ,b.dia_semana
        ,b.hora_inicio
        ,b.hora_fim
      from
        ${process.env.DB_SCHEMA}.prestadores as a
      inner join
        ${process.env.DB_SCHEMA}.ritmo_trabalho as b
          on a.id = b.prestador_id
      inner join
        ${process.env.DB_SCHEMA}.usuarios as c
          on a.usuario_id = c.id
      where
        a.id = $1
        and b.dia_semana = $2
      ;
      `;

    const values = [prestador_id, dia_da_semana];
    const { rows } = await db.query(queryWithParameter, values);

    const disponibilidade = rows.map(formatDisponibilidade);

    res.status(200).json({
      message: 'Disponibilidade do dia obtida com sucesso!',
      count: rows.length,
      disponibilidade: disponibilidade,
    });
  } catch (error) {
    console.error("Erro ao buscar disponibilidade do dia:", error);
    res.status(500).json({ message: 'Erro ao buscar disponibilidade do dia.', error: error.message });
  }
};
