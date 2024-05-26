const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }
    try{
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-mern.ivcgcr0.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-mern`,
        connectionParams)
    }catch(error){
        console.log(error);
        console.log("could not connect to database")
    }
}