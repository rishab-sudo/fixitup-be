const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const orderRoutes = require("./routes/order");
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://your-frontend-url.com', 'http://localhost:3000'], // Add allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  
}));

app.use("/api/orders", orderRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    try {
        console.log(`Server is listening on port ${port}`);       
    } catch (error) {
        console.log('Server is not listening ',error);        
    }
});
