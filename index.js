const express = require("express");
const app = express();
const cors = require("cors");
const { port } = require("./config/config");
const { userRouter } = require("./routes/user.route");
const { adminProductRouter } = require("./routes/admin-product.route");
const { productRouter } = require("./routes/ProductRoutes");
const { AllItem } = require("./models/modelDb");
const { feedbackRoutes } = require("./routes/feedbackRoutes");

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use("/auth", userRouter);
app.use("/admin", adminProductRouter);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res)=>{
    res.send({message: "server running"});
})

app.use((req, res, next)=>{
    res.status(404).send("<h1 style='text-align: center;'>Page not found</h1>");
})

app.use((error, req, res, next)=>{
    res.status(500).send(`<h1>Something went wrong</h1>`);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
