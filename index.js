const express = require('express');
const app = express();
const cors = require('cors');
const { port } = require('./config/config');
const { userRouter } = require('./routes/user.route');
const { adminProductRouter } = require('./routes/admin-product.route');


app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/admin", adminProductRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to our API');
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
