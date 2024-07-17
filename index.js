const express = require('express');

const UserPublicController = require('./controllers/UserController');
const BankPrivateController = require("./controllers/BankController");


const {connectDB} = require("./infra/db");
const {RabbitMQ} = require("./infra/rabbitmq");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
RabbitMQ.connectRabbitMQ()

// Middleware para parser de JSON
app.use(express.json());

// Usar as rotas definidas nos controladores
app.use('/public', UserPublicController);
app.use('/private', BankPrivateController);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
