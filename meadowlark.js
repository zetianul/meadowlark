var express = require('express');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'})
var fortune = require('./lib/fortune')
var app = express();

app.use(express.static(__dirname + '/public'))
app.engine('handlebars',handlebars.engine)
app.set('view engine','handlebars')

app.set('port',process.env.PORT || 3000);

app.use(function (req,res,next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next()
})

app.get('/',function (req,res) {
    res.render('home')
})

app.get('/tours/hood-river',function (req,res) {
    res.render('tours/hood-river')
})

app.get('/tours/request-group-rate',function (req,res) {
    res.render('tours/request-group-rate')
})

app.get('/about',function (req,res) {
    res.render('about',{
        fortune:fortune.getFortune(),
        pageTestScript:'/qa/tests-about.js'
    })
})

//404
app.use(function (req,res,next){
    res.status(404);
    res.render('404');
})

//500
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'),function () {
    console.log('Express started on http://localhost:'+
    app.get('port') + '; press Ctrl - C to terminate');
})