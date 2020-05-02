const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
configureExpress();

mongoose.connect('mongodb+srv://admin-ayush:url@10@cluster0-731cd.gcp.mongodb.net/URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const urlSchema = new mongoose.Schema({
  uid: String,
  url: String
});
const Url = mongoose.model("Url", urlSchema);
var redirectUrl = "";
var request = require('request-promise');

app.get('/', function(req, res) {
  res.render('index', {
    success: false,
    code: ''
  });

})

app.get('/:id', (req, res) => {

  const id = req.params.id;
  Url.findOne({
    uid: id
  }, function(err, result) {
    if (!err) {
      redirectUrl = result.url.slice();
      console.log(redirectUrl);
      console.log(typeof redirectUrl);
      res.redirect(redirectUrl);
    }
  });
})

app.post('/', function(req, res) {
  console.log('posted url : ' + req.body.linkurl);
  var code = generateUID();
  const testurl = new Url({
    uid: code,
    url: req.body.linkurl
  });
  testurl.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added new document in database successfully.");
    }
  });

  res.render('index', {
    'success': true,
    code: code
  });

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
    extended: true
  })); // support encoded bodies
}

app.listen(process.env.PORT || 3000, () => console.log('Server is up and running'));
