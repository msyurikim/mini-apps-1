const express = require('express');
const app = express();

//serve (static) client files
//if doesn't work, __dirname + '/public'
//if doesn't work, __dirname + './public'
//by default, Express will look for a file: index.html, in specified folder
app.use(express.static('public'));

