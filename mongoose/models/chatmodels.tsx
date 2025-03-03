import mongoose,{ Schema, Document } from 'mongoose'

export interface chatSchemaModel extends Document {
    teamid : string;
    sendername : string;
    message : string;
    createdAt : Date;
}

const ChatSchema: Schema<chatSchemaModel> = new Schema(
    {
        teamid : {
            type : String,
            required : true,
            unique : true
        },
        sendername : {
            type : String,
            required : true,
        },
        message : {
            type : String,
            required : true
        },
        createdAt : {
            type : Date,
            required : true
        }
    },
    { 
        timestamps : true
    }
)


const ChatModel = mongoose.models.ChatModel as mongoose.Model<chatSchemaModel> || mongoose.model('ChatModel',ChatSchema)

export  {
    ChatModel
}