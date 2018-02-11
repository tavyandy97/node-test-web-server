const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname+'/public') );

app.use((req , res , next) => {
	var now = new Date().toString();
	let log = `${now} : ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log', log+'\n');
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintennance.hbs')
// })

hbs.registerHelper('getCurrentYear' , () =>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt' , (text) =>{
	return text.toUpperCase();
});

app.get('/' , (req , res) =>{
	res.render('home.hbs', {
		pageTitle:'Home Page',
		welcomeMessage:'Welcome to my website'
	});
});

app.get('/about' , (req , res) => {
	res.render('about.hbs' , {
		pageTitle: 'About Page'
	});
});

//bad - send back JSON with errorMessage

app.get('/error' , (req , res) => {
	res.send({
		errorMessage:'Unable to handle request'
	});
});

app.listen(3000 , () => {
	console.log('Server is up on port 3000');
});