const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const dbConfig = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb"
}

const connection = mysql.createConnection(dbConfig);
const initDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      return;
    }
    console.log('Conexão ao MySQL bem-sucedida');

    const sql = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error('Erro ao criar tabela:', error);
        connection.end();
        return;
      }

      console.log('Tabela criada com sucesso', results);

      insertData('Edney-default')
        .then((results) => {
          console.log('Registro inserido com sucesso:', results);
        })
        .catch((error) => {
          console.error('Erro ao inserir registro:', error);
        })

    });
  });
}

initDatabase();

const insertData = (name) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO people(name) values (?)`;
    connection.query(sql, [name], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/', (req, res) => {
  const query = "SELECT * FROM people";

  // Executa a query no banco de dados
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao buscar registros: ' + error);
    }

    // Envia a lista de registros como resposta
    res.send(`<h1>Full Cycle</h1><ul>${results.map(row => `<li>${row.name}</li>`).join('')}</ul>`);
  });
});

app.post('/:name', (req, res) => {
  const name = req.params.name;
  insertData(name)
    .then(() => {
      res.send(`<h1>Bem vindo ao Full Cycle ${name}</h1>`);
    })
    .catch((error) => {
      res.status(500).send('Erro ao inserir registro: ' + error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})