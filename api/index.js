const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

app.get('/', (req, res, next) => {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.send(`Nothing here. Please visit ${fullUrl}phones`);
});

app.get('/phones', (req, res, next) => {
	// call to backend system
	const phonesRaw = fs.readFileSync('phones.json');
	const phones = JSON.parse(phonesRaw);

	console.log({ phones });

	// send the response
	res.json({
		data : phones,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
