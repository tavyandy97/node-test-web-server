const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
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

app.get('/projects' , (req,res) => {
	res.render('projects.hbs',{
		pageTitle:'Projects'
	})
})

//bad - send back JSON with errorMessage
app.get('/bad', (req,res) => {
	res.send({
		errorMessage:'Unable to handle request'
	});
})

app.get('/error' , (req , res) => {
	res.send({
		errorMessage:'Unable to handle request'
	});
});

app.listen(port , () => {
	console.log(`Server is up on port ${port}`);
});