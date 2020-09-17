const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/rbc-post-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Mongodb conection established successfully');
})