const express = require('express');
const app = express();
const cors = require('cors');
const { port } = require('./config/config');
const { userRouter } = require('./routes/user.route');


app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);

app.get("/", async(req, res)=>{
    const dataPost = [
        {
            name: "Appetizers",
        },
        {
            name: "Soups",
        },
        {
            name: "Main Courses"
        },
        {
            name: "Side dishes"
        },
        {
            name: "Sandwiches and Burgers"
        },
        {
            name: "Pastas"
        },
        {
            name: "Pizzas"
        },
        {
            name: "Desserts"
        },
        {
            name: "Beverages"
        },
        {
            name: "Special Menus"
        }
    ];
    const result = await
    res.send({message: "waiting for the update"});
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
