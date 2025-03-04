const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static( __dirname ));

// Rota para o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
