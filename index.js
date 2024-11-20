
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// const userRoutes = require('./routes/user');
// const driverRoutes = require('./routes/driver_register');
// const orderRoutes = require('./routes/accept_order');
const swaggerUi = require('swagger-ui-express');
const notificationroutes = require('./routes/notification')

// import swagger ui module and swagger json file

const swaggerDocument = require('../swagger/swagger.json');



const app = express();

app.use(cors());
app.use(express.json())



// add route for swagger document API
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/notification',notificationroutes)
// app.use('/api/v1/users', userRoutes);

// app.use('/api/v1/driver', driverRoutes);

// app.use('/api/v1/orders', orderRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

