const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Sallii yhteydet kaikista osoitteista (testauksen ajaksi)
app.use(express.json());

// Yhdistetään MongoDB-kantaan (käyttäen AWS-konsoliin tallentamaasi MONGO_URI-muuttujaa)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB yhteys ok!'))
  .catch((err) => console.error('❌ MongoDB virhe:', err));

// Testireitti
app.get('/', (req, res) => {
  res.json({
    message: 'Flowstate API toimii!',
    databaseStatus:
      mongoose.connection.readyState === 1 ? 'Yhdistetty' : 'Ei yhteyttä',
  });
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Palvelin pyörii portissa ${PORT}`);
});

console.log('Deploy testi 2');
