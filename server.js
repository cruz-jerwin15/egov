const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database established successfully");
})

const barangayRouter = require('./Route/barangay');
const userRouter = require('./Route/user');

app.use('/barangay',barangayRouter);
app.use('/user',userRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}

);