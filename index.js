const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

//connect to database
connectDB();

app.use(express.json({extended:false}));//to notify that incoming Requesr Object is a JSON Object and extended keyword specifies that the type can't be extended


//define routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});