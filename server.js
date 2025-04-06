// AS PER EXPRESS DOCUMENTATION THS IS THE EASIEST WAY TO IMPLEMENT A BASIC NODE API - Reference code like - https://expressjs.com/ - Point No. 1
const express = require('express')
const app = express()
const port = 1000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//NOW ADD REQUIRED DEPENDENCY (MIDDLEWARES) TO IT WHICH IS MANDATORY WHILE WORKING IN PRODUCTION LEVEL DEVELOPMENT ENVIRONMENT - Description mentioned in Readme file at Point No. 2
const express = require('express')
const bodyParser = require('body-parser') // TO PARSE HTTP REQUEST BODY/FORM - Middleware
const cors = require('cors') // CROSS-ORIGIN RESOURCE SHARING (CORS) WHICH RISTRICT ACCESS FROM THE DIFFERENT DOMAIN - Middleware
const helmet = require('helmet') // HELPS TO SECURE EXPRESS APPS BY SETTING HTTP RESPONSE HEADER - Middleware
var morgan = require('morgan') // ITS AN HTTP REQUEST LOGGER - Middleware
var compression = require('compression') // COMPRESS HTTP RESPONSES - Middleware
var crid = require('connect-rid'); // ASSIGN REQUEST A ID CONTAIN THE UUID TYPE ID WHICH HELPS IN LOGGING THE REQUEST - Middleware
var responseTime = require('response-time') // ADD TIME REQUIRE FOR THE REPONSE, APPEARS IN HEADER - Middleware

const app1 = express();
const port2 = 2000;

app1.use(helmet()) // FOR ALL ROUTES - Middleware
app1.use(cors()); // FOR ALL ROUTES - Middleware
app1.use(morgan('dev')) // FOR BASIC I'M USING DEVELOPMENT FORMAT - FORMATS('combined', 'common', 'dev', 'short', 'tiny')  - Middleware
app1.use(compression()) // COMPRESS ALL RESPONSE - Middleware

app1.use(bodyParser.json()) // TO PARSE application/json - ONLY FOR OLDER VERSION OF EXPRESS BUT YOU CAN USE IT FOR SPECIFIC REASON - Middleware 
app1.use(bodyParser.urlencoded()) // TO PARSE application/x-www-form-urlencoded - ONLY FOR OLDER VERSION OF EXPRESS BUT YOU CAN USE IT FOR SPECIFIC REASON - Middleware 

app1.use(express.json()); // TO PARSE application/json - EXPRESS PROVIDE INBUILD PARSER IN THE LATEST VERISON OF IT.
app1.use(express.urlencoded({ extended: true })); // TO PARSE application/x-www-form-urlencoded - EXPRESS PROVIDE INBUILD PARSER IN THE LATEST VERISON OF IT.

app1.use(crid()); // APPEARS SOMETHING LIKE THIS: X-RID: 98a7sda8-808a-da27-8au7-asd7a8s6d02a - Middleware
app1.use(crid({ headerName: 'X-Request-ID'})); // CUSTUM HEADER NAME APPEARS SOMETHING LIKE THIS: X-Request-ID: 98a7sda8-808a-da27-8au7-asd7a8s6d02a - Middleware
app1.use(responseTime()) // ADD HEADER OF REPONSE TIME SO THAT YOU CAN LOG IT FOR NODE PERFORMANCE STATS OR FOR REPONSE TIME CHECK : x-response-time - Middleware

app1.get('/', (req, res) => {
    res.send('Hello World!')
})

app1.get('/cors-example/', cors(), (req, res) => { // FOR A PARTICULAR ROUTE
    res.send('Hello Cors!')
})

app1.listen(port2, () => {
    console.log(`Example app listening on port ${port2}`)
})