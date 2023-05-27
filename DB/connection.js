import mongoose from "mongoose"



export const connecting =()=>{
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.CONNECTION).then(()=>{
        console.log("connected to mongo");
    }).catch((err)=>{
        console.log(err);
    })
}