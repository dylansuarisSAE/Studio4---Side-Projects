import mongoose from "mongoose"
const { Schema } = mongoose

interface Iaccount {
    username: string
    password: string

}
const accountSchema = new Schema<Iaccount>({

    username: String,
    password: String,               //we arent encripting the Password, so it will be seen
})
export const GameAccount = mongoose.model<Iaccount>('accounts', accountSchema)
//this is what the Account will look like On the Database (MongoDB)