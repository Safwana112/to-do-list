const mongoose=require("mongoose")
function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected') }
        catch(error){
            console.log('Not connected')

        }
    }
    module.exports=RunServer;

    // 3eT6xALKGST95gD8