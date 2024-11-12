const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Conexão com o banco de dados

// Função para gerar o token JWT
const generateToken = (user) => {
  return jwt.sign({ email: user.email, tipoUsuario: user.tipo_usuario }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Expira conforme configurado no .env
  });
};

// Função para gerar o refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email, tipoUsuario: user.tipo_usuario }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // Expira conforme configurado no .env
  });
};

// Função de login com verificação de tipo de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const query = `
      select 
        a.*
        ,b.id as prestador_id
      from 
        agenda.usuarios as a
      inner join
        agenda.prestadores b
          on a.id = b.usuario_id 
      where 
        email = $1
      ;`
      ;
    const { rows } = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar se a senha está correta
    const passwordIsValid = bcrypt.compareSync(password, user.senha);
    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    // Gera token e refresh token
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Retorna o token, refresh token e o tipo de usuário
    return res.status(200).json({
      token,
      refreshToken,
      usuario: user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};

// Função para resetar a senha
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const query = `SELECT * FROM ${process.env.DB_SCHEMA}.usuarios WHERE email = $1`;  // Inclua o schema do .env
    const { rows } = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Atualizar a senha do usuário
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    const updateQuery = `UPDATE ${process.env.DB_SCHEMA}.usuarios SET senha = $1 WHERE email = $2`;  // Inclua o schema do .env
    await db.query(updateQuery, [hashedPassword, email]);

    return res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
