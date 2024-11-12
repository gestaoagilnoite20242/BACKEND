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
      id: row.agendamento_id || row.id,
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

function formatAgendamentoAtualizado(row){
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
    }
  };
}


// Função para buscar agendamentos pelo ID do prestador
exports.getAgendByPrestId = async (req, res) => {
  const { prestador_id } = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM ${process.env.DB_SCHEMA}.agendamentos AS a
      WHERE 
        a.prestador_id = $1
        AND a.status != 'cancelado'
    `;
    const countResult = await db.query(countQuery, [prestador_id]);
    const totalRegistros = parseInt(countResult.rows[0].total, 10);
    const totalPaginas = Math.ceil(totalRegistros / limit);

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE 
        a.prestador_id = $1
        AND a.status != 'cancelado'
      LIMIT $2 OFFSET $3;
    `;
    const values = [prestador_id, limit, offset];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      totalRegistros,
      totalPaginas,
      currentPage: Math.floor(offset / limit) + 1,
      agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};

exports.getAgendByPrestIdNextHours = async (req, res) => {
  const { prestador_id } = req.params;

  try {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const currentTimeString = currentDate.toTimeString().split(' ')[0]; // Formato HH:MM:SS
    const twoHoursLater = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
    const twoHoursLaterString = twoHoursLater.toTimeString().split(' ')[0]; // Formato HH:MM:SS

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE
        a.prestador_id = $1
        AND a.data_agendamento = $2
        AND a.hora_inicio > $3
        AND a.hora_inicio < $4
        AND a.status != 'cancelado'
      ;
    `;

    const values = [prestador_id, currentDateString, currentTimeString, twoHoursLaterString];

    const { rows } = await db.query(queryWithParameter, values);

    const agendamento = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamento obtido com sucesso!',
      count: rows.length,
      agendamentos: agendamento,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamento.', error: error.message });
  }
};


// Função para buscar um agendamento pelo ID
exports.getAgendById = async (req, res) => {
  const { agendamento_id } = req.params;

  try {

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE
        a.id = $1;
      `;

    const values = [agendamento_id];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamento = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamento obtido com sucesso!',
      count: rows.length,
      agendamentos: agendamento,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamento.', error: error.message });
  }
};


// Função para buscar agendamentos pelo ID do prestador e um intervalo de tempo
exports.getAgendByPrestIdBetween = async (req, res) => {
  const { prestador_id, data_inicio, data_fim } = req.params;
  const limit = parseInt(req.query.limit, 10) || 999999999999;
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM ${process.env.DB_SCHEMA}.agendamentos AS a
      WHERE a.prestador_id = $1
        AND a.data_agendamento >= $2
        AND a.data_agendamento <= $3
        AND a.status != 'cancelado'
    `;
    const countResult = await db.query(countQuery, [prestador_id, data_inicio, data_fim]);
    const totalRegistros = parseInt(countResult.rows[0].total, 10);
    const totalPaginas = Math.ceil(totalRegistros / limit);

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE a.prestador_id = $1
        AND a.data_agendamento >= $2
        AND a.data_agendamento <= $3
        AND a.status != 'cancelado'
      LIMIT $4 OFFSET $5;
    `;
    const values = [prestador_id, data_inicio, data_fim, limit, offset];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      totalRegistros,
      totalPaginas,
      currentPage: Math.floor(offset / limit) + 1,
      agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};

// Função para buscar agendamentos futuros por um ID do prestador
exports.getAgendFuturByPrestId = async (req, res) => {
  const { prestador_id } = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM ${process.env.DB_SCHEMA}.agendamentos AS a
      WHERE a.data_agendamento >= CURRENT_TIMESTAMP
        AND a.prestador_id = $1
        AND a.status != 'cancelado'
    `;
    const countResult = await db.query(countQuery, [prestador_id]);
    const totalRegistros = parseInt(countResult.rows[0].total, 10);
    const totalPaginas = Math.ceil(totalRegistros / limit);

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE a.data_agendamento >= CURRENT_TIMESTAMP
        AND a.prestador_id = $1
        AND a.status != 'cancelado'
      LIMIT $2 OFFSET $3;
    `;
    const values = [prestador_id, limit, offset];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamentos = rows.map(formatAgendamento);

    res.status(200).json({
      message: 'Agendamentos obtidos com sucesso!',
      count: rows.length,
      totalRegistros,
      totalPaginas,
      currentPage: Math.floor(offset / limit) + 1,
      agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
};


// Função para inserir um novo agendamento
exports.postAgendamento = async (req, res) => {
  const { cliente_telefone, cliente_nome, prestador_id, data_agendamento, hora_inicio, hora_fim, assunto, status } = req.body;

  if (!cliente_telefone || !cliente_nome || !prestador_id || !data_agendamento || !hora_inicio || !hora_fim) {
    return res.status(400).json({ message: 'Os campos cliente_telefone, cliente_nome, prestador_id, data_agendamento, hora_inicio e hora_fim são obrigatórios.' });
  }

  try {

    // Verifica se o usuário já existe
    const queryCheckUser = `
      SELECT id as usuario_id
      FROM agenda.usuarios
      WHERE telefone = $1
        AND tipo_usuario = 'cliente'
        AND ativo = true;
    `;
    const { rows: userRows } = await db.query(queryCheckUser, [cliente_telefone]);

    let cliente_id;
    if (userRows.length > 0) {
      // Usuário encontrado, usa o id existente
      cliente_id = userRows[0].usuario_id;
    } else {
      // Usuário não encontrado, cria um novo usuário
      const queryInsertUser = `
        INSERT INTO agenda.usuarios
          (id, nome, senha, telefone, ativo, tipo_usuario, criado_em, atualizado_em)
        VALUES
          (nextval('agenda.usuarios_id_seq'::regclass), $1, 'NonePassword', $2, true, 'cliente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id;
      `;
      const { rows: newUserRows } = await db.query(queryInsertUser, [cliente_nome, cliente_telefone]);
      cliente_id = newUserRows[0].id;
    }

    // Mapeamento de números para dias da semana em português
    const diasSemanaMap = {
      0: "domingo",
      1: "segunda",
      2: "terça",
      3: "quarta",
      4: "quinta",
      5: "sexta",
      6: "sábado"
    };

    // Cria uma nova data e obtém o dia da semana
    const data = new Date(data_agendamento + 'T00:00:00-03:00'); // Ajustando para o fuso horário de Brasília
    const diaSemana = diasSemanaMap[data.getUTCDay()]; // Usando getUTCDay para corresponder ao fuso horário



    // Query para verificar o horário de atendimento do prestador para o dia da semana
    const queryCheckAvailability = `
      SELECT 
        b.dia_semana,
        b.hora_inicio,
        b.hora_fim
      FROM 
        ${process.env.DB_SCHEMA}.prestadores AS a
      INNER JOIN 
        ${process.env.DB_SCHEMA}.ritmo_trabalho AS b ON a.id = b.prestador_id
      WHERE 
        a.id = $1
        AND b.dia_semana = $2;
    `;

    const availabilityValues = [prestador_id, diaSemana];

    const { rows: availabilityRows } = await db.query(queryCheckAvailability, availabilityValues);

    // Verifica se encontrou disponibilidade para o dia da semana
    if (availabilityRows.length === 0) {
      return res.status(400).json({ message: 'O prestador não atende no dia selecionado.' });
    }

    const { hora_inicio: horarioInicio, hora_fim: horarioFim } = availabilityRows[0];

    // Converte os horários de atendimento para o formato HH:MM
    const convertToHHMM = (time) => {
      return time.slice(0, 5); // Pega apenas HH:MM dos horários no formato HH:MM:SS
    };

    // Converte os horários de atendimento
    const horarioInicioFormatado = convertToHHMM(horarioInicio);
    const horarioFimFormatado = convertToHHMM(horarioFim);

    if (hora_inicio < horarioInicioFormatado || hora_fim > horarioFimFormatado) {
      return res.status(400).json({ message: 'O horário do agendamento está fora do horário de atendimento do prestador.' });
    }

    // Verifica se já existe um agendamento com a mesma data, hora de início e hora de fim
    const queryCheckDuplicate = `
      select 
        id
      from 
        ${process.env.DB_SCHEMA}.agendamentos as a
      where 
        a.prestador_id = $1
        AND a.data_agendamento = $2
        AND a.hora_inicio = $3
        AND a.hora_fim = $4
        AND a.status != 'cancelado'
      ;
    `;
    const duplicateValues = [prestador_id, data_agendamento, hora_inicio, hora_fim];
    const { rows: duplicateRows } = await db.query(queryCheckDuplicate, duplicateValues);

    if (duplicateRows.length > 0) {
      const agendamentoIdDuplicate = duplicateRows[0].id;
      return res.status(400).json({ 
        message: 'Já existe um agendamento para este prestador com a mesma data e horário.', 
        agendamento_id: agendamentoIdDuplicate 
      });
    }
    // Query de inserção do agendamento
    const queryInsert = `
      INSERT INTO ${process.env.DB_SCHEMA}.agendamentos 
        (id, cliente_id, prestador_id, data_agendamento, hora_inicio, hora_fim, assunto, status, criado_em, atualizado_em)
      VALUES 
        (nextval('agenda.agendamentos_id_seq'::regclass), $1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const insertValues = [cliente_id, prestador_id, data_agendamento, hora_inicio, hora_fim, assunto, status];
    const { rows } = await db.query(queryInsert, insertValues);

    // Formata o agendamento antes de retornar
    const agendamento = formatAgendamento(rows[0]);

    res.status(201).json({
      message: 'Agendamento inserido com sucesso!',
      agendamento: agendamento,
    });
  } catch (error) {
    console.error("Erro ao inserir agendamento:", error);
    res.status(500).json({ message: 'Erro ao inserir agendamento.', error: error.message });
  }
};

// Função para atualizar um agendamento
exports.putAgendamento = async (req, res) => {
  const { cliente_id, prestador_id, data_agendamento, hora_inicio, hora_fim, assunto, status } = req.body;
  const { agendamento_id } = req.params;

  if (!cliente_id & !prestador_id & !data_agendamento & !hora_inicio & !hora_fim) {
    return res.status(400).json({ message: 'Os campos cliente_id ou prestador_id ou data_agendamento ou hora_inicio e hora_fim são necessarios.' });
  }

  try {

    const queryWithParameter = `
      ${queryBaseAgend}
      WHERE
        a.id = $1;
      `;

    const values = [agendamento_id];
    const { rows } = await db.query(queryWithParameter, values);

    const agendamento = rows.map(formatAgendamento);

    if (agendamento.length > 0) {

      // Query de update do agendamento
      const queryUpdate = `
      UPDATE ${process.env.DB_SCHEMA}.agendamentos SET
        cliente_id = $1, 
        prestador_id = $2, 
        data_agendamento = $3, 
        hora_inicio = $4, 
        hora_fim = $5, 
        assunto = $6, 
        status = $7, 
        atualizado_em = CURRENT_TIMESTAMP
      WHERE
        agendamentos.id = $8
      RETURNING *;
      `;

      const insertValues = [cliente_id, prestador_id, data_agendamento, hora_inicio, hora_fim, assunto, status, agendamento_id];
      const { rows } = await db.query(queryUpdate, insertValues);

      // Formata o agendamento antes de retornar
      const agendamento_atualizado = formatAgendamentoAtualizado(rows[0]);

      res.status(200).json({
        message: 'Agendamento atualizado com sucesso!',
        agendamento: agendamento_atualizado,
      });
    } else {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar agendamento.' });
  }
}

// Função para realizar soft delete de um agendamento
exports.deleteAgendamento = async (req, res) => {
  const { agendamento_id } = req.params;

  if (!agendamento_id) {
    return res.status(400).json({ message: 'O campo agendamento_id é obrigatório.' });
  }

  try {
    // Verifica se o agendamento existe
    const queryCheckAgendamento = `
      select 
        id
      from 
        ${process.env.DB_SCHEMA}.agendamentos as a
      where 
        id = $1
      ;
    `;
    const { rows: agendamentoRows } = await db.query(queryCheckAgendamento, [agendamento_id]);

    if (agendamentoRows.length === 0) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    // Query para realizar o soft delete (atualizar o status para 'cancelado')
    const querySoftDelete = `
      update 
        ${process.env.DB_SCHEMA}.agendamentos
      SET 
        status = 'cancelado'
        ,atualizado_em = CURRENT_TIMESTAMP
      WHERE 
        id = $1
      RETURNING 
        *
      ;
    `;
    const { rows } = await db.query(querySoftDelete, [agendamento_id]);

    // Formata o agendamento antes de retornar
    const agendamentoCancelado = formatAgendamento(rows[0]);

    res.status(200).json({
      message: 'Agendamento cancelado com sucesso!',
      agendamento: agendamentoCancelado,
    });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    res.status(500).json({ message: 'Erro ao cancelar agendamento.', error: error.message });
  }
};
