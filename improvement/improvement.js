const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/new').
catch(error => console.log(error));
mongoose.connection.on('connected', () => console.log('connected'));
function fn(e){
    e.preventDefault();
    const fd = new FormData(form);
    // Index of: name = 0, email = 1, suggestion = 2
    var urlEncoded = new URLSearchParams(fd).toString();
    urlEncoded = urlEncoded.replaceAll('+', ' ');
    urlEncoded = urlEncoded.split("&");
    urlEncoded[1] = urlEncoded[1].replace("%40", "@");
    for(let i = 0; i < 3; i++) {
        urlEncoded[i] = urlEncoded[i].split("=")[1];
    }
    console.log(urlEncoded);
}