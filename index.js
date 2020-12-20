const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeNav = require('./src/');
const routeAdmin = require('./src/admin');
require('dotenv').config();

var admin = require('firebase-admin');
var serviceAccount = require('./firebase.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', routeNav);
app.use('/admin/api/v1', routeAdmin);

app.use(express.static('public'));

app.listen(process.env.PORT || 8000, () => {
	console.log('Server running');
});
