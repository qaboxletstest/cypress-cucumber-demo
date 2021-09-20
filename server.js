const express = require('express');
const cors = require('cors')
const app = express();
const simpleAuth = require('./authentication')

app.use(cors());
// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Basic auth
app.use(simpleAuth)

app.use('/login', (req, res) => {
    res.send({
        token: 'qaboxletstest-session-demo'
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));