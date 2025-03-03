import mongoose from "mongoose"

let isConnected = false;

export async function ConnectDb() {
    try {

        if(isConnected){
            console.log(`Using prev DB conn.`)
            return;
        } 

        mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('New DB conn established')
        isConnected = true;
        
    } catch (error) {
        console.log(`Failed to Connect to chatDb: ${error}`)
    }
}