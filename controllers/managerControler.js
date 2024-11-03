const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Importa a conexão com o banco de dados

// Função para cadastrar prestador
exports.registerManager = async (req, res) => {
  try {
    const { 
      nome, 
      email, 
      senha, 
      telefone, 
      cpf_cnpj, 
      atividade, 
      servico, 
      logo_base64, 
      social_media, 
      website, 
      cidade, 
      estado, 
      ritmo_trabalho, 
      categoria_id,
      subcategoria_id,
      tipo_agenda
    } = req.body;

    // Validação básica dos campos obrigatórios
    if (!nome || !senha || !telefone || !cpf_cnpj || !servico || !logo_base64 || !cidade || !estado || !ritmo_trabalho || !categoria_id || !subcategoria_id ) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    // // Verifica se o email é fornecido
    // if (email && !isEmailValid(email)) {
    //   return res.status(400).json({ message: 'Email inválido.' });
    // }

    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(senha, 8);

    // Iniciar transação no banco de dados
    await db.query('BEGIN');

    // Verifica se o estado já existe, caso contrário, insere
    let queryEstado = `SELECT id FROM ${process.env.DB_SCHEMA}.estados WHERE sigla = $1`;
    let valuesEstado = [estado.sigla];
    let estadoResult = await db.query(queryEstado, valuesEstado);

    let estadoId;
    if (estadoResult.rows.length === 0) {
      queryEstado = `INSERT INTO ${process.env.DB_SCHEMA}.estados (sigla, nome) VALUES ($1, $2) RETURNING id`;
      valuesEstado = [estado.sigla, estado.nome];
      estadoResult = await db.query(queryEstado, valuesEstado);
      estadoId = estadoResult.rows[0].id;
    } else {
      estadoId = estadoResult.rows[0].id;
    }

    // Verifica se a cidade já existe, caso contrário, insere
    let queryCidade = `SELECT id FROM ${process.env.DB_SCHEMA}.cidades WHERE nome = $1 AND estado_id = $2`;
    let valuesCidade = [cidade, estadoId];
    let cidadeResult = await db.query(queryCidade, valuesCidade);

    let cidadeId;
    if (cidadeResult.rows.length === 0) {
      queryCidade = `INSERT INTO ${process.env.DB_SCHEMA}.cidades (nome, estado_id) VALUES ($1, $2) RETURNING id`;
      cidadeResult = await db.query(queryCidade, valuesCidade);
      cidadeId = cidadeResult.rows[0].id;
    } else {
      cidadeId = cidadeResult.rows[0].id;
    }

    // Query SQL para inserir um novo usuário (email agora pode ser NULL)
    const queryUsuario = `
      INSERT INTO ${process.env.DB_SCHEMA}.usuarios (nome, email, senha, telefone, tipo_usuario, cidade_id, criado_em, ativo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;

    const valuesUsuario = [
      nome,
      email || null, // Permite que o email seja NULL
      hashedPassword,
      telefone, // Telefone obrigatório e único
      'prestador', // Tipo de usuário é 'prestador'
      cidadeId, // ID da cidade
      new Date(), // Data de criação
      true // Ativo
    ];

    // Executa a query de inserção na tabela `usuarios`
    const { rows } = await db.query(queryUsuario, valuesUsuario);
    const usuarioId = rows[0].id; // Pega o ID gerado

    // Query SQL para inserir na tabela `prestadores` com o ID do usuário
    const queryPrestador = `
      INSERT INTO ${process.env.DB_SCHEMA}.prestadores (usuario_id, cpf_cnpj, atividade, services, logo, instagram, website, criado_em, atualizado_em, listado, ativo, tipo_agenda, subcategoria_id, categoria_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const valuesPrestador = [
      usuarioId,
      cpf_cnpj,
      atividade,
      servico,          // Ajusta o campo para o tipo de serviço
      logo_base64,      // String base64 para o logotipo
      social_media,     // Instagram ou outras redes sociais
      website,
      new Date(),       // Data de criação
      null,             // atualizado_em, inicialmente null
      true,             // listado
      true,             // ativo
      tipo_agenda,
      subcategoria_id,
      categoria_id
    ];

    // Executa a query de inserção na tabela `prestadores`
    const { rows: prestadorRows } = await db.query(queryPrestador, valuesPrestador);

    // Inserir os dados de ritmo de trabalho na tabela `ritmo_trabalho`
    const queryRitmo = `
      INSERT INTO ${process.env.DB_SCHEMA}.ritmo_trabalho (prestador_id, dia_semana, hora_inicio, hora_fim, criado_em)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const ritmo of ritmo_trabalho) {
      const { dia_semana, hora_inicio, hora_fim } = ritmo;
      const valuesRitmo = [prestadorRows[0].id, dia_semana, hora_inicio, hora_fim, new Date()];
      await db.query(queryRitmo, valuesRitmo);
    }

    // Query para buscar os dados completos do usuário e do prestador
    const queryFinal = `
      SELECT u.*, p.*, r.*
      FROM ${process.env.DB_SCHEMA}.usuarios u
      JOIN ${process.env.DB_SCHEMA}.prestadores p ON u.id = p.usuario_id
      LEFT JOIN ${process.env.DB_SCHEMA}.ritmo_trabalho r ON p.id = r.prestador_id
      WHERE u.id = $1
    `;

    const { rows: finalRows } = await db.query(queryFinal, [usuarioId]);

    // Confirma a transação
    await db.query('COMMIT');

    // Retorna a resposta de sucesso com os dados completos do prestador e usuário
    res.status(201).json({
      message: 'Prestador cadastrado com sucesso!',
      prestador: finalRows[0], // Retorna o prestador, usuário e ritmo de trabalho concatenados para o front tratar
    });
  } catch (error) {
    // Em caso de erro, faz o rollback da transação
    await db.query('ROLLBACK');

    // Tratamento de erros específicos
    if (error.code === '23505' && error.constraint === 'usuarios_telefone_key') {
      return res.status(409).json({
        message: 'O telefone fornecido já está em uso. Por favor, utilize outro telefone.',
      });
    } else if (error.code === '23505' && error.constraint === 'prestadores_cpf_cnpj_key') {
      return res.status(409).json({
        message: 'O CPF/CNPJ fornecido já está em uso. Por favor, utilize outro CPF/CNPJ.',
      });
    }

    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar prestador.', error: error });
  }
};
