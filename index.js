import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import expanserouter from "./routes/expanseRoute.js"
import incomerouter from "./routes/incomeRoute.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors());

app.use('/incomes',incomerouter);
app.use('/expanses', expanserouter);

app.listen(8000,()=>{
    console.log("Server is running in port 8000");
})