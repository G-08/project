const mongoose = require('mongoose');

const connect = async () => {
    if(mongoose.connections[0].readyState) return;
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Mongo connesso")
    } catch(error){
        console.log(error.message);
        throw new Error("Error connecting to Mongoose");
    }
}

export default connect;