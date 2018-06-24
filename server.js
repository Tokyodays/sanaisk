
var express = require('express');
var app = express();
var morgan      = require('morgan');
var compression = require('compression');
var serveStatic = require('serve-static');
var basicAuth   = require('basic-auth-connect');
var sm = require('sitemap');
//var router = app.Router();

var user = process.env.USER;
var pass = process.env.PASS;

app.set('port', process.env.PORT || 3000);

if (user && pass) {
  app.use(basicAuth(user, pass));
}

app.use(morgan('dev'));
app.use(compression());
app.use(serveStatic(__dirname + '/dist'));
//app.use('/static', express.static(__dirname + '/dist/public'));

var sitemap = sm.createSitemap ({
  hostname: 'http://www.sunai.sk',
  cacheTime: 600000,
  urls: [
    { url: '/index.html',  changefreq: 'monthly', priority: 0.3 },
    { url: '/aboutus.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/crosstable.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/electrode_holder.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/electrode_holder_detail.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/electrode_holder_thesis.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/magnetic_chuck.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/presetter.html',  changefreq: 'monthly',  priority: 0.7 },
    { url: '/rolling_holder.html',  changefreq: 'monthly',  priority: 0.7 }
  ]
});

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port %s', app.get('port'));
});
app.get(/.svgz/, function(req, res, next) {
  res.set({'Content-Encoding': 'gzip'});
  next();
});

var email   = require("emailjs/email");
var server  = email.server.connect({
   user:    "talkinlaud",
   password:"bjork",
   host:    "smtp.mail.yahoo.co.jp",
   ssl:     true
});

app.get('/send/', function (req, res) {
  var urlinfo = require('url').parse( req.url , true );
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    "i hope this works",
     from:    "talkinlaud@yahoo.co.jp",
     to:      "talkinlaud@yahoo.co.jp",
     subject: "testing emailjs"
  }, function(err, message) {
    // console.log(err || message);
        var body = null;
        if (err) {
          body = err.toString();
        } else {
          body = message;
        }
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);

  });
});
