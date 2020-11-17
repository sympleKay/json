const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userData = require('./data.json');


const app = express();


app.use(express.static('./public'));

let urlencoded = bodyParser.urlencoded( {extended: false} );

let PORT = process.env.PORT || 2000;

app.get('/data', (req, res) => {
   res.status(200).json(userData);
})


app.post('/submit', urlencoded, (req, res) => {
   const {surname, fname, lname, ssa, dcos, email, yog, tel_no, city} = req.body;
   userData.push({
      surname,
      fname,
      lname,
      ssa,
      dcos,
      email,
      yog,
      tel_no,
      city
   })
   fs.writeFile('./data.json', JSON.stringify(userData), (err) => {
      if (err) {
         console.log(err)
      }
   })
   console.log(userData);
   res.status(200).json(userData);
})

app.listen(PORT, () => console.log (`Server running on port: ${PORT}`));