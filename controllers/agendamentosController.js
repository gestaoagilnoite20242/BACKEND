const db = require('../config/db'); // Importa a conexão com o banco de dados

// Consulta SQL base para buscar agendamentos com detalhes de cliente e prestador
const queryBaseAgend = `
  SELECT 
    a.id as agendamento_id
    ,a.cliente_id
    ,b.nome as cliente_nome
    ,b.email as cliente_email
    ,b.telefone as cliente_telefone
    ,a.prestador_id
    ,d.nome as prestador_nome
    ,d.email as prestador_email
    ,d.telefone as prestador_telefone
    ,c.cpf_cnpj as prestador_cpf_cnpj
    ,c.atividade
    ,c.services
    ,c.instagram
    ,c.website
    ,a.data_agendamento
    ,a.hora_inicio
    ,a.hora_fim
    ,a.assunto
    ,a.status
    ,a.criado_em
    ,a.atualizado_em
  FROM 
    ${process.env.DB_SCHEMA}.agendamentos AS a
  INNER JOIN
    ${process.env.DB_SCHEMA}.usuarios AS b ON a.cliente_id = b.id
  INNER JOIN
    ${process.env.DB_SCHEMA}.prestadores AS c ON a.prestador_id = c.id
  INNER JOIN
    ${process.env.DB_SCHEMA}.usuarios AS d ON c.usuario_id = d.id
  `;


function formatAgendamento(row) {
  return {
    agendamento: {
      id: row.agendamento_id,
      data_agendamento: row.data_agendamento,
      hora_inicio: row.hora_inicio,
      hora_fim: row.hora_fim,
      assunto: row.assunto,
      status: row.status,
      criado_em: row.criado_em,
      atualizado_em: row.atualizado_em,
    },
    cliente: {
      id: row.cliente_id,
      nome: row.cliente_nome,
      email: row.cliente_email,
      telefone: row.cliente_telefone,
    },
    prestador: {
      id: row.prestador_id,
      nome: row.prestador_nome,
      email: row.prestador_email,
      telefone: row.prestador_telefone,
      cpf_cnpj: row.prestador_cpf_cnpj,
      atividade: row.atividade,
      services: row.services,
      instagram: row.instagram,
      website: row.website,
    }
  };
}


// Função para buscar agendamentos pelo ID do prestador
exports.getAgendByPrestId = async (req, res) => {
  const { prestador_id } = req.params;

  try {

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE
        a.prestador_id = $1;
      `;

    const values = [prestador_id];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      agendamentos: agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};

// Função para buscar agendamentos pelo ID do prestador e um intervalo de tempo
exports.getAgendByPrestIdBetween = async (req, res) => {
  const { prestador_id } = req.params;
  const { data_inicio } = req.params;
  const { data_fim } = req.params;

  try {

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE
        a.prestador_id = $1
        and a.data_agendamento >= $2
        and a.data_agendamento <= $3
      ;
      `;

    const values = [prestador_id, data_inicio, data_fim];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      agendamentos: agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};

// Função para buscar agendamentos futuros por um ID do prestador
exports.getAgendFuturByPrestId = async (req, res) => {
  const { prestador_id } = req.params;

  try {

    const queryWithParameter = `
      ${queryBaseAgend}
      where
	      a.data_agendamento >= CURRENT_TIMESTAMP
        and  a.prestador_id = $1
      ;
      `;

    const values = [prestador_id];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      agendamentos: agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};
