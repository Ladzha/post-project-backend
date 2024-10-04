import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"

import userRouter from "./routes/usersRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import categoryRouter from "./routes/categoriesRoutes.js";

dotenv.config();

const PORT = process.env.PORT;
const URL_MDB_LOCAL = process.env.URL_MDB_LOCAL;
const app = express();

mongoose.connect(URL_MDB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) =>{
    console.log(error);
})
db.once("open", () =>{
    console.log("Connected to MongoDB"); 
})

app.use(express.json());

app.use('/users', userRouter)
app.use('/posts', postRoutes)
app.use('/categories', categoryRouter)


app.get("/", ((request, response)=>{
    response.send("I am a get request")
    console.log("I am a get request")
}))


app.listen(PORT, ((error)=>{
    error ? console.log(`Server error ${error}`) : console.log(`Server is running on port ${PORT}`);
}))