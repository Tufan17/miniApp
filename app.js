const express = require('express');
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const mongooseConnect = require('./src/configs/database');
const path = require('path');

mongooseConnect();

app.use(express.json());

const routes = require('./src/routes');
const RoleService = require('./src/services/RoleService');


app.use(express.static(path.join(__dirname, 'WordSoupAdmin/dist')));



app.use('/api', routes);


app.use('*', (req, res) => {
    const indexPath = path.join(__dirname, 'WordSoupAdmin/dist/index.html');
    console.log(`Index path: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(err);
            res.status(err.status).end();
        }
    });
});




app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
