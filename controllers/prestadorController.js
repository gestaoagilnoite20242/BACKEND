const db = require('../config/db'); // Importa a conexão com o banco de dados

// Função para formatar o resultado da consulta
function formatPrestador(row) {
  return {
    prestador: {
      id: row.prestador_id,
      cpf_cnpj: row.cpf_cnpj,
      atividade: row.atividade,
      tipo_agenda: row.tipo_agenda,
      categoria_id: row.categoria_id,
      subcategoria_id: row.subcategoria_id,
      services: row.services,
      logo: row.logo,
      instagram: row.instagram,
      website: row.website,
    },
    usuario: {
      id: row.usuario_id,
      nome: row.usuario_nome,
      email: row.email,
      telefone: row.telefone,
      tipo_usuario: row.tipo_usuario,
    },
    categoria: {
      id: row.categoria_id,
      nome: row.categoria_nome,
    },
    cidade: {
      id: row.cidade_id,
      nome: row.cidade_nome,
    },
    estado: {
      id: row.estado_id,
      nome: row.estado_nome,
      sigla: row.sigla,
    }
  };
}

// Função para buscar prestador pelo ID
exports.getPrestadorById = async (req, res) => {
  const { prestador_id } = req.params;

  try {
    const query = `
      SELECT
        a.id as prestador_id,
        a.cpf_cnpj,
        a.atividade,
        a.tipo_agenda,
        a.categoria_id,
        a.subcategoria_id,
        a.services,
        a.logo,
        a.instagram,
        a.website,
        b.id as usuario_id,
        b.nome as usuario_nome,
        b.email,
        b.telefone,
        b.tipo_usuario,
        c.id as categoria_id,
        c.nome as categoria_nome,
        d.id as cidade_id,
        d.nome as cidade_nome,
        e.id as estado_id,
        e.nome as estado_nome,
        e.sigla
      FROM
         ${process.env.DB_SCHEMA}.prestadores as a
      INNER JOIN
         ${process.env.DB_SCHEMA}.usuarios as b ON a.usuario_id = b.id
      INNER JOIN
         ${process.env.DB_SCHEMA}.categorias as c ON a.categoria_id = c.id
      INNER JOIN
         ${process.env.DB_SCHEMA}.cidades as d ON b.cidade_id = d.id
      INNER JOIN
         ${process.env.DB_SCHEMA}.estados as e ON d.estado_id = e.id
      WHERE
        a.id = $1;
    `;
    const values = [prestador_id];
    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Prestador não encontrado.' });
    }

    const prestadores = rows.map(formatPrestador);

    res.status(200).json({
      message: 'Prestador obtido com sucesso!',
      prestadores,
    });
  } catch (error) {
    console.error("Erro ao buscar prestador:", error);
    res.status(500).json({ message: 'Erro ao buscar prestador.', error: error.message });
  }
};