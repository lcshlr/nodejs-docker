const express = require('express');
const db = require("./db.js");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.get('/', (_, res) => {
    const createTableQuery  =  'CREATE TABLE IF NOT EXISTS times(count int)';
    db.query(createTableQuery, (err) => {
        if(err){
            res.status(404).send(err);
        }
        db.query('SELECT * FROM times', function(err, data, fields) {
            if(err){
                res.status(404).send(err);
            }
            let resultData, insertQuery;
            if(data.length === 0){
                resultData = 1;
                insertQuery = 'INSERT INTO times (count) VALUES(1)'
            }
            else {
                resultData = data[0]['count'] + 1
                insertQuery = 'UPDATE times SET count='+resultData
            }
            db.query(insertQuery, function(err, result) {
                if(err){
                    res.status(404).send(err);
                }
                res.status(200).send('Nombre de visite : ' + resultData.toString());
            });
          });
    });
});

app.listen(PORT, () => {
    console.log('Serveur lancé sur le port :',PORT);
});