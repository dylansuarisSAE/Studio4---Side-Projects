import {connect} from 'mongoose'

export const connectToDB = () =>{
    return connect('mongodb+srv://camlus:W8IOlodghUAnX5vR@cluster0.p1lpvu8.mongodb.net/LoginGameDataBase')

}

//very poorly done in terms of security!
