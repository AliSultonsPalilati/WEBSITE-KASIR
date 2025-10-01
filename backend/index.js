const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080; 

app.use(cors());
app.use(bodyParser.json());

// Contoh route sederhana
app.get('/', (req, res) => {
  res.send('Backend Kasir berjalan!');
});

// Route lain bisa Anda tambahkan di sini

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});