const express = require("express")
const app = express();
const connectToMongo = require("./db/db");
connectToMongo();

const fetchUser = require("./middleware/fetchUser");
var cors= require('cors')
app.use(cors())
// // const path  =require('path')
app.use(express.json())
 const port = 5000; 
// //  static files
// app.use(express.static(path.join(__dirname,'../assignment/build')))
// app.get('x',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../assignment/build/index.html'))
// })
// //  Available Routes
app.use('/api/auth',require("./routes/auth"))
app.use('/api/ecommers',fetchUser,require("./routes/ecommers"))
app.listen(port,()=>{
    try {
        console.log(`app are listen on http://localhost:${port}`)
    } catch (error) {
        console.log(`app not listen on port no ${port} `)
    }
})