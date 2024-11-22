
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const swaggerUi = require('swagger-ui-express');
const notificationroutes = require('./routes/notificationroute')


// import swagger ui module and swagger json file

const swaggerDocument = require('../swagger/swagger.json');



const app = express();

app.use(cors());
app.use(express.json())



// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/notification',notificationroutes)


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

