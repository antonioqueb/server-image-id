const express = require('express');
const cors = require('cors');
const uploadIDRouter = require('./routes/upload_id');

const app = express();
const port = 3011;

// Configurar CORS
app.use(cors({
  origin: 'https://historiallaboral.com' // Permitir solicitudes desde este dominio
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/upload_id', uploadIDRouter);

app.listen(port, () => {
  console.log(`ID Server is running at http://149.50.128.198:${port}`);
});
