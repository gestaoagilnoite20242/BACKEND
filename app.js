const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  // Importa o pacote cors
const { protect } = require("./middlewares/authMiddleware"); // Importa o middleware de autenticação
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const managementRoutes = require("./routes/managerRoutes");
const agendamentosRoutes = require("./routes/agendamentosRoutes");
const disponibilidadeRoutes = require("./routes/disponibilidadeRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const { testConnection } = require("./config/db"); // Importa a função de teste de conexão


const app = express();
app.use(cors());  // Isso habilita o CORS para qualquer origem
app.use(express.json());

app.use("/gestao/api/management", authRoutes);
app.use("/gestao/api/management", managementRoutes);
app.use("/gestao/api/management", protect, agendamentosRoutes);
app.use("/gestao/api/management", protect, disponibilidadeRoutes);
app.use("/gestao/api/management", categoriasRoutes);

const PORT = process.env.PORT || 3500;

// Testa a conexão com o banco antes de iniciar o servidor
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} | Servidor rodando na porta ${PORT}`);
  });
});