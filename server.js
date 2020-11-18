const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// connecting to mongo db
const uri = "mongodb+srv://master:cs1300capstone@cluster0.b5rtk.mongodb.net/main?retryWrites=true&w=majority";
connectToDB = async () => {
    await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    // console.log(mongoose.connection.readyState);
};
connectToDB();

// server
const app = express();

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
