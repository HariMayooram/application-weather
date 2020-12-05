// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes and the essential dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 3000;
app.listen(port, () => {
	console.log(`Currently on the port: ${port}`);
});
app.get('/entry/:id', (req, res) => {
	res.send(projectData[req.params.id]);
});
app.get('/all', (req, res) => {
	res.send(projectData);
});
app.post('/add', (req, res) => {
	const { body } = req;
	projectData[body.id] = body;
	res.send(projectData[body.id]);
});
