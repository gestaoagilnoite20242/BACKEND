const db = require('../config/db'); // Importa a conexão com o banco de dados

function formatPrestadoresByCat(row) {
  return {
    prestador: {
      id: row.prestador_id,
      nome: row.nome,
      categoria: row.categoria,
      email: row.email,
      telefone: row.telefone,
      cidade: row.cidade,
      estado: row.estado,
      cpf_cnpj: row.cpf_cnpj,
      atividade: row.atividade,
      services: row.services,
      logo: row.logo,
      instagram: row.instagram,
      website: row.website,
      usuario_id: row.usuario_id,
    }
  };
}

exports.getCategorias = async (req, res) => {
   
//    res.status(200).json({ message: 'veio do getCategorias.' });
    try {
        const queryGetCategorias = `
          SELECT *
          FROM
            ${process.env.DB_SCHEMA}.categorias
          ORDER BY
            NOME
          `;

        const { rows } = await db.query(queryGetCategorias);
        
        res.status(200).json({
            message: 'Categorias obtidas com sucesso!',
            count: rows.length,
            categorias: rows
          });
    } catch (error) {
    console.error("Erro ao buscar categorias do banco de dados.", error);
    res.status(500).json({ message: 'Erro ao buscar categorias do banco de dados.', error: error.message });
  }
}

// Função para buscar a disponibilidade de um prestator por ID
exports.getPrestadoresByCat = async (req, res) => {
  const { categoria_id } = req.params;

  try {
    const queryWithParameter = `
      SELECT
        cat.nome AS categoria
        ,pr.id AS prestador_id
        ,pr.cpf_cnpj
        ,pr.atividade
        ,pr.services
        ,pr.logo
        ,pr.instagram
        ,pr.website
        ,pr.usuario_id
        ,us.nome
        ,us.email
        ,us.telefone
        ,cid.nome AS cidade
        ,est.nome AS estado 
      FROM
        ${process.env.DB_SCHEMA}.prestadores as pr
      INNER JOIN
        ${process.env.DB_SCHEMA}.categorias as cat
          ON cat.id = pr.categoria_id
      INNER JOIN
        ${process.env.DB_SCHEMA}.usuarios as us
          ON pr.usuario_id = us.id
      INNER JOIN
        ${process.env.DB_SCHEMA}.cidades as cid
          ON us.cidade_id = cid.id
      INNER JOIN
        ${process.env.DB_SCHEMA}.estados as est
          ON cid.estado_id = est.id

      WHERE
        cat.id = $1
      ;
      `;

    const values = [categoria_id];
    const { rows } = await db.query(queryWithParameter, values);

    const prestadores = rows.map(formatPrestadoresByCat);

    res.status(200).json({
      message: 'Prestadores da categoria obtidos com sucesso!',
      count: rows.length,
      prestadores: prestadores
    });
  } catch (error) {
    console.error("Erro ao buscar prestadores da categoria.", error);
    res.status(500).json({ message: 'Erro ao buscar prestadores da categoria.', error: error.message });
  }
};
