//basic web server for the application 

//required dependancies:-
var express = require("express")
var bodyParser = require("body-parser")
var mongoose =require("mongoose")

//creating the express application:-
const app = express()

// using the dependencies 
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//connnect to the  "MoneyData" database on localhost port 27017
mongoose.connect('mongodb://localhost:27017/MoneyData')
var db = mongoose.connection

db.on('error', ()=> console.log("error in connecting to the database.."))
db.once('open', () => console.log("Connected to Database."))

app.post("/add", (req,res) => {
    var category_select =  req.body.category_select             //variables to store user input
    var amount_input = req.body.amount_input
    var info = req.body.info 
    var date_input = req.body.date_input

    var data={          // creating a list to store the user information.
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    }       //push this list to a 'users' table in the database..
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record inserted successfully.") //will display when add button is clicked.
    })
})

app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html')

}).listen(4000)

console.log("Listening to port 4000")