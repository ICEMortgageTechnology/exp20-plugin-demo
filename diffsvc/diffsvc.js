// Provides a web service subtracts two numbers and allows for an artificially delayed response
// To install:  node init
// To run:      node diffsvc.js
// To invoke:   http://localhost:8080/diff?v1=<value1>&v2=<value2>&delay=<timeInMs>

const express = require('express');
const cors = require('cors');
const server = express();
const port = 8080;

// Enable CORS headers
server.use(cors());

// Create the route for the "diff" operation
server.get('/diff', (req, res) => {

    // Read the request patameters
    var v1 = req.query.v1 || 0;
    var v2 = req.query.v2 || 0;
    var delay = req.query.delay || 0;

    // Introduce an artifical delay before returning the response
    setTimeout(() => {
        res.send({ ...req.query, diff: (v2 - v1).toFixed(2) });
    }, delay);

});

server.listen(port, () => console.log(`Diff Service listening on port ${port}...`));
