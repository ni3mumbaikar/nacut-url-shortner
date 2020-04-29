const express = require('express');
const app = express();

var request = require('request-promise');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {});
})



app.listen(process.env.PORT || 3000, () => console.log('Server is up and running'))