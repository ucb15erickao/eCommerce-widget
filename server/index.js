const express = require('express');
const server = express();
server.listen(8080, () => {  console.log('express port: 8080');  });
server.use(express.static(`${__dirname}/../client/dist`));