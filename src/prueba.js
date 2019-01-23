const express = require('express');
var app = express();

app.get("index.html", function(req,res) {
    res.send("Welcome to the home page");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server listening");
});