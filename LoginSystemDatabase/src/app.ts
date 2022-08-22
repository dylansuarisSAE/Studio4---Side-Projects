import express from "express"
import { connectToDB } from "./database"
import { GameAccount } from "./model/accountModel"


//wait until the database is finished with a certain call, therefore we do asyncronous
//this code will only run when you go inside /account


//para is what we dont see
//query is what we put inside the url and can see
//if we wwant to console.log the query then we need to do req.query

const app = express()
app.get('/account', async (req, res) => {   //request, response

  const { rUsername, rPassword } = req.query // deconstructing the req.query
  //this is obviously not the nice way to do it, as we're passing in the paramters into the Url

  if (rUsername === null || rPassword === null) // if either are null send invalid credentials
  {
    res.send("Invalid credentials")  //doing it this way because we dont want to let any attackers to know if there is an account with a corresponding username
    return;                          // which is why we're simply saying hey, the combination of the 2 dont work(Invalid Credentials), as we never want to reveal too much info.
  }

  //find any account with an existing username(in the database)
  let userAccount = await GameAccount.findOne({ username: rUsername })

  if (userAccount === null) {
    //create a new account (AS ACCOUNT DOESNT EXIST ON DB)

    console.log("Creating new account...")  //obvivously creating an account here is not done very well, usually we'd have a login page seperately and a Creating page seperately

    let newAccount = new GameAccount({
      //user
      username: rUsername,
      password: rPassword,

    })
    await newAccount.save() //wait until the newAccount has been saved in the DB
    console.log("Successfully Created Account of " + rUsername + "!")  

    res.send(newAccount)
    return;
  }
  else {
    if (rPassword == userAccount.password) {

      console.log("Welcome Back " + rUsername + "!");
      
      res.send(userAccount)
      return;
    }

  }

  res.send("Invalid credentials") //which is why we're using it here too
  return;
})


app.listen(3150, () => { //lamda function
  console.log('server is listening at port 3150')
  connectToDB()
  connectToDB().then(connectedToDBSuccessfully).catch(failedToConnectToDB)
})

const connectedToDBSuccessfully = (result: any) => {
  console.log('Connected to Database!');

  console.log(result);

}

const failedToConnectToDB = (error: any) => {
  console.log('Failed Connected to Database!');
  console.log(error);
}