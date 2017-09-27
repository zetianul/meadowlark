var express = require('express');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'})

var app = express();

app.use(express.static(__dirname + '/public'))
app.engine('handlebars',handlebars.engine)
app.set('view engine','handlebars')

app.set('port',process.env.PORT || 3000);

var fortunes = [
    'IS is using d25t','IS-3 is using BL-9','IS-8 is using 440','IS-7 is using S70'
]


app.get('/',function (req,res) {
    res.render('home')
})

app.get('/about',function (req,res) {
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{fortune:randomFortune})
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