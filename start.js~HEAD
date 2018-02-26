var express = require('express');
var logger = require('morgan');

var bodyParser = require('body-parser');

var admin = require('firebase-admin');
var serviceAccount = require('./node-firebase-intro-3b82f-firebase-adminsdk-2ig6m-20e2509220.json');

var firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://node-firebase-intro-3b82f.firebaseio.com'
});



var database = firebaseAdmin.database();
//Create instance of express app
var app = express();

//We want to serve.js and html in ejs
//ejs stands for embedded java script
app.set('view engine', 'ejs');

//We also wnat to send css, images and other static files
app.use(express.static('views'));
app.set('views', __dirname + '/views');

//Give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));


//Create authentication middleware
function isAuthenticated(request, response, next){
	//check if user if logged in
	next();
}

app.get('/homecoming-queen', isAuthenticated, (req, resp) =>{
	resp.render('homecomingQueen.ejs')
});

app.get('/', (req, resp) =>{
	var restaurantsRef = database.ref('/restaurants');

	restaurantsRef.once('value', (snapshot) =>{
		var data = snapshot.value;
		if(!data){
			data = {};
		}
		resp.render('home.ejs', {restaurants: snapshot.val()})
	});
	
});

app.post('/', (req, resp) => {
	var breackfast = req.body.breakfast;
	resp.render('results.ejs', {data: breackfast});
});

var port = process.env.PORT || 1337;

app.listen(port, () =>{
	console.log('Running at port: ' + port);
});