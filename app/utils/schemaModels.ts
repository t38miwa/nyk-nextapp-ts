import mongoose from "mongoose"

const Schema = mongoose.Schema

interface ItemDataType {
    Image: string,
    FavorTeam: string,
    FavorPlayer: string,
    prefecture: string,
    description: string,
    email: string
}

interface UserDataType {
    name: string,
    email: string,
    password: string
}

const ItemSchema = new Schema<ItemDataType>({
    Image: String,
    FavorTeam: String,       
    FavorPlayer: String,
    prefecture: String,  
    description: String,
    email: String,    
})

{/*title: String,       
    image: String,
    price: String,      
    description: String,
    email: String,*/}

const UserSchema = new Schema<UserDataType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const ItemModel = mongoose.models.Item || mongoose.model<ItemDataType>("Item", ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model<UserDataType>("User", UserSchema)