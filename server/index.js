// EXPRESS APP SETUP
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// EXPRESS ROUTE HANDLER

app.get('/' , (req, res) => {
  res.send('');
});

app.get('/drivers', async (req, res) => {
  const { latitude, longitude, count } = req.query;
  console.log('lat long' , latitude, longitude);
  try {
    let queryUrl = `https://qa-interview-test.splytech.dev/api/drivers?latitude=${latitude}&longitude=${longitude}`;
    if (count) { 
      queryUrl += '&count=' + count
    }
    https.get(queryUrl, (respond) => {
    let data = '';

    respond.on('data', (chunk) => {
      data +=chunk;
    })

    respond.on('end', () => {
      try {
        console.log('data' , data);
        const body = JSON.parse(data);
        if (body.drivers) {
          res.status(200).send(body);
        } else {
          res.status(500).send(body)
        }
      } catch (err) {
        res.send(err)
      }
    });

    respond.on('error', (err) => {
      console.log('req err', err)
      res.send(err);
    })
  }
    )
  } catch (err) {
    res.send(err);
  }
});

// app.get('*', function(req, res){
//   res.send('API not found', 404);
// });

app.listen(5000, err => {
  console.log('Listening');
})