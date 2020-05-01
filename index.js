const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var router = express.Router();

configureExpress();

const jsonObject = {
    "ni3mumbaikar": "https://www.github.com/ni3mumbaikar",
    "test": "https://www.github.com/ni3mumbaikar"
};

var request = require('request-promise');

app.get('/', function (req, res) {
    res.render('index', {success:false,code:''});
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    if (jsonObject.hasOwnProperty(id)) {
        res.redirect(jsonObject[id]);
    } else
        res.send(id);
})

app.post('/', function (req, res) {
    console.log('posted url : ' + req.body.linkurl);
    var code = generateUID();
    jsonObject[code] = req.body.linkurl;
    console.log(code);
    res.render('index',{'success':true,code:code});

})

function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

function configureExpress() {
    app.use(express.static('public'));
    app.use(express.static(__dirname + '/public'));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({
        extended: false
    })); // support encoded bodies    
}

app.listen(process.env.PORT || 3000, () => console.log('Server is up and running'));