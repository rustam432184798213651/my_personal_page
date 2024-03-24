const express = require('express');
const fs = require('fs');
var path = require('path');
const cors = require('cors');
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/new').
  catch(error => console.log(error));
mongoose.connection.on('connected', () => console.log('connected'));
const app = express();
const PORT = 1234;
app.use(express.static('public'))
const PersonSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Integration with server
app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
});

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "index.html");
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(__dirname + '/index.html');
})



app.post('http://localhost:1234/improvement/upload', (req, res) => {
    console.log(req.body);
})


