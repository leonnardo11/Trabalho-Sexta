const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
const uri = 'mongodb+srv://admin:admin123@cluster0.zckt5xg.mongodb.net/?retryWrites=true&w=majority';


// CRIAR BANCO DE DADOS CASO NÃO TENHA
// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     // Criar a base de dados e a coleção
//     mongoose.connection.db.createCollection('Database_pilotos', (err) => {
//       if (err) {
//         console.error('Erro ao criar a coleção "pilotos":', err);
//       } else {
//         console.log('Coleção "pilotos" criada com sucesso.');
//       }
//     });
//     console.log('Conectado ao banco de dados MongoDB.');
//   })
//   .catch((err) => {
//     console.error('Erro ao conectar ao banco de dados:', err);
//   });

// Conexão com o banco de dados
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

// Definição do schema do piloto
const pilotoSchema = new mongoose.Schema({
  nome: String,
  numero: Number,
  posicao: Number,
  categoria: String,
});

// Modelo do piloto
const Piloto = mongoose.model('Piloto', pilotoSchema);

// Middleware para processar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitar o CORS
app.use(cors());

// Rotas da API

// Criar um novo piloto de kart
app.post('/api/pilotos', (req, res) => {
  const piloto = new Piloto(req.body);
  piloto
    .save()
    .then((pilotoSalvo) => {
      res.json(pilotoSalvo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Buscar todos os pilotos de kart
app.get('/api/pilotos', (req, res) => {
  Piloto.find({})
    .then((pilotos) => {
      res.json(pilotos);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Buscar um piloto específico
app.get('/api/pilotos/:id', (req, res) => {
  Piloto.findById(req.params.id)
    .then((piloto) => {
      if (!piloto) {
        res.status(404).send('Piloto não encontrado.');
      } else {
        res.json(piloto);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Atualizar um piloto
app.put('/api/pilotos/:id', (req, res) => {
  Piloto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((piloto) => {
      if (!piloto) {
        res.status(404).send('Piloto não encontrado.');
      } else {
        res.json(piloto);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Excluir um piloto
app.delete('/api/pilotos/:id', (req, res) => {
  Piloto.findByIdAndRemove(req.params.id)
    .then((piloto) => {
      if (!piloto) {
        res.status(404).send('Piloto não encontrado.');
      } else {
        res.send('Piloto removido com sucesso.');
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
