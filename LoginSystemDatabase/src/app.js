"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const accountModel_1 = require("./model/accountModel");
//wait until the database is finished with a certain call, therefore we do asyncronous
//this code will only run when you go inside /account
//para is what we dont see
//query is what we put inside the url and can see
//if we wwant to console.log the query then we need to do req.query
const app = (0, express_1.default)();
app.get('/account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rUsername, rPassword } = req.query; // deconstructing the req.query
    //this is obviously not the nice way to do it, as we're passing in the paramters into the Url
    if (rUsername === null || rPassword === null) // if either are null send invalid credentials
     {
        res.send("Invalid credentials"); //doing it this way because we dont want to let any attackers to know if there is an account with a corresponding username
        return; // which is why we're simply saying hey, the combination of the 2 dont work(Invalid Credentials), as we never want to reveal too much info.
    }
    //find any account with an existing username(in the database)
    let userAccount = yield accountModel_1.GameAccount.findOne({ username: rUsername });
    if (userAccount === null) {
        //create a new account (AS ACCOUNT DOESNT EXIST ON DB)
        console.log("Creating new account..."); //obvivously creating an account here is not done very well, usually we'd have a login page seperately and a Creating page seperately
        let newAccount = new accountModel_1.GameAccount({
            //user
            username: rUsername,
            password: rPassword,
        });
        yield newAccount.save(); //wait until the newAccount has been saved in the DB
        console.log("Successfully Created Account of " + rUsername + "!");
        res.send(newAccount);
        return;
    }
    else {
        if (rPassword == userAccount.password) {
            console.log("Welcome Back " + rUsername + "!");
            res.send(userAccount);
            return;
        }
    }
    res.send("Invalid credentials"); //which is why we're using it here too
    return;
}));
app.listen(3150, () => {
    console.log('server is listening at port 3150');
    (0, database_1.connectToDB)();
    (0, database_1.connectToDB)().then(connectedToDBSuccessfully).catch(failedToConnectToDB);
});
const connectedToDBSuccessfully = (result) => {
    console.log('Connected to Database!');
    console.log(result);
};
const failedToConnectToDB = (error) => {
    console.log('Failed Connected to Database!');
    console.log(error);
};
