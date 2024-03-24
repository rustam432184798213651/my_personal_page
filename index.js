const express = require('express');
const fs = require('fs');
var path = require('path');
const cors = require('cors');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/new').
  catch(error => console.log(error));
mongoose.connection.on('connected', () => console.log('connected'));
const app = express();
const PORT = 443;
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
const SuggestionSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Suggestion: String
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
});

app.get("/upload", (req, res) => {
  const suggestion = mongoose.model('suggestion', SuggestionSchema);
  const name = req.query.name;
  
  const email = req.query.email;
  const new_suggestion = req.query.suggestion;
  const saver = new suggestion({ Name: name, Email: email, Suggestion: new_suggestion});
  saver.save();
  res.sendFile(__dirname + "\\index.html");
});

app.get("/show_suggestions", (req, res) => {
    const suggestion = mongoose.model('suggestion', SuggestionSchema);
    res.setHeader('Content-Type', 'text/html');
    let suggestions = [];
    suggestion.find({}).then((docs)=>{
      for (let i = 0; i < docs.length; i++) {
        suggestions.push(docs[i]["Suggestion"]);
      }
      res.send("<!DOCTYPE html><html><head><link rel='stylesheet' href='suggestions.css'></head><body><p>Suggestions that have been already received:<br/>"+ suggestions.join("<br/>") +"</p></body></html>");
    })
    .catch((err)=>{
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(__dirname + '/does_not_exist.html');
    });
});

app.post('http://localhost:1234/improvement/upload', (req, res) => {
    console.log(req.body);
});


