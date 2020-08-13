const express = require('express');
const router = require('./server/apiRoutes');

const server = express();
server.use(express.json());



server.use('/api',router);

server.listen(3000, () => console.log("\nListening to Port 3000....\n\n\tAPI routes :-\n\t localhost:3000/api/getInfo\n\t localhost:3000/api/addNewKey"));

