const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use("/gateway", proxy("http://localhost:3000"))

app.listen(4000, () => {
    console.log('API Gateway running on port 4000');
});
