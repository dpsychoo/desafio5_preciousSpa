const express = require('express');
const app = express();
const logger = require('./middlewares/logger.js');
const joyasRoutes = require('./routes/joyasRoutes.js');
require('dotenv').config();

// Mdd
app.use(logger);

app.use(joyasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
