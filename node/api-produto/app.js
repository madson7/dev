const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const produtoRoutes = require('./routes/produto');
const mongoose = require('mongoose');

// Conexão com o MongoDB
mongoose.connect("mongodb://mongouser:mongopwd@192.168.121.120:30001/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
}).catch((err) => {
  console.error('Erro ao estabelecer conexão com o MongoDB:', err);
});

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// routes
app.use('/produtos', produtoRoutes);

// swagger documentation
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;