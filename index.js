const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();

const allowedOrigin = 'http://localhost:3000'; // Replace with the actual domain
app.use(express.json());

app.use((req, res, next) => {
    console.log('req.headers.origin', req.headers.origin)
    if (req.headers.origin === allowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
        next(); // Pass the request to the next middleware
    } else {
        res.status(403).send('Forbidden: Access not allowed from this domain');
    }
})
const crudRouter = require('./routes/crud.router')
app.use("/api/v1/crud", crudRouter)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

require("dotenv").config();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});