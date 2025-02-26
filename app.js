const express = require('express');
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
const cors = require('cors');

const mongooseConnect = require('./src/configs/database');
const path = require('path');

const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:5173','https://wordsoup.usgbilisim.com'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongooseConnect();

app.use(express.json());

const routes = require('./src/routes');
const RoleService = require('./src/services/RoleService');





app.use('/app-ads.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app-ads.txt'));
});

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'admin/dist')));


app.use('*', (req, res) => {
    const indexPath = path.join(__dirname, 'admin/dist/index.html');
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
