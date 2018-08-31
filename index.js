const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

var Pusher = require('pusher');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
console.log(__dirname);
app.use(express.static(path.join(__dirname+'/public')));

var pusher = new Pusher({
    appId: '588799',
    key: '89e4f057cdf5121f1c93',
    secret: '9593e2a04b496fa0531f',
    cluster: 'ap2',
    encrypted: true
});

app.use(function(req, res, next){
    console.log('Im in the middle');
    console.log(req.body.user);
    console.log(req.body.pass);
    next();
})

app.get('/', function(req, res){
    console.log('Hi');
    console.log(req.body);
    res.send("Hello People");
})
app.post('/comments', function(req, res){
    console.log(req.body);
    var newMessage = {
        name: req.body.name,
        message: req.body.message
    }
    pusher.trigger('my-channel', 'my-event', newMessage);
    res.json({created: true});
})
app.listen(3001);
