const { Pool } = require('pg');

// Configurando a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',  // Adicione a variável DB_HOST ou utilize 'localhost' como padrão
  user: process.env.DB_USERNAME || 'postgres',   // Usuário do banco
  password: process.env.DB_PASSWORD || 'senha_do_postgres', // Senha do banco
  database: process.env.DB_NAME || 'Backend-202402SNG-3',   // Nome do banco
  port: 5432,         // Porta do banco
  ssl: {
    rejectUnauthorized: false,               // Permitir SSL sem verificar o certificado
  }
});

console.log('Tentando conectar ao banco com as seguintes credenciais:');
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Função para testar a conexão com o banco e definir o schema 'agenda'
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conectado ao banco de dados com sucesso!');

    // Define o schema 'agenda' como padrão para esta sessão
    await client.query("SET search_path TO " + process.env.DB_SCHEMA);
    
    client.release(); // Libera o cliente após testar e definir o schema
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', {
      message: err.message,     // Mensagem de erro principal
      code: err.code,           // Código do erro (se disponível)
      stack: err.stack,         // Stack trace (para mais detalhes)
      errno: err.errno,         // Código específico do sistema operacional (se houver)
      syscall: err.syscall,     // Qual chamada do sistema falhou
      address: err.address,     // Endereço ao qual tentou se conectar
      port: err.port            // Porta à qual tentou se conectar
    });
    process.exit(1); // Encerra o processo em caso de erro
  }
};

// Função para executar queries no banco, já utilizando o schema 'agenda'
const query = (text, params) => pool.query(text, params);

// Exporta a função de teste de conexão e a função de query
module.exports = {
  testConnection,
  query
};
