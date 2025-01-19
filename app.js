const express = require('express');
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const mongooseConnect = require('./src/configs/database');

mongooseConnect();

app.use(express.json());

const routes = require('./src/routes');
const RoleService = require('./src/services/RoleService');

app.use('/', routes);




app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
