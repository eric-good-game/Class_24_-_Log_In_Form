import mongoose from "mongoose";

const url = "mongodb+srv://Creik:Sidonia702@coderhouse.q5mhnd3.mongodb.net/class_24";
mongoose.connect(url).then(()=>{
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err)
});
// mongoose.connection.on("error", console.error.bind(console, "connection error:"));