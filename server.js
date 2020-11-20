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

const Schema = mongoose.Schema;

// move models to new file as constants
const User = new Schema({
  username: String,
  password: String,
  games: [Number],
});
const UserModel = mongoose.model('User', User);
// server
const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());

app.post("/register/", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    UserModel.exists({username:user})
    .then((result) => {
        // username already exists 
        if (result === true) {
            res.status(400);
            res.send("Error. User exists");
        }
        else {
            UserModel.create({ username: user, password:password  })
            .then((response) => {
                res.status(200);
                res.send("Success! User created");
            });
        };
    }).catch((err) => {
        res.send(err);
    });
});

app.post("/login/", (req,res) => {
    const user = req.body.username;
    const password = req.body.password;
    UserModel.findOne({username:user, password:password})
    .then((result) => {
        // username/password doesn't exist
        if (result === null) {
            res.status(400);
            res.send("Error. User doesn't exist/user and password don't match");
        }
        else {
            res.status(200);
            res.send("User exists! Logging you in!");
        };
    }).catch((err) => {
        res.send(err);
    });
});

app.post("/addGame/", (req, res) => {
    const user = req.body.username;
    const gameID = parseInt(req.body.gameID);
    UserModel.findOneAndUpdate({username: user}, 
    {
        $push: {
            games: gameID
        }
    },
    {new: true}
    )
    .then((result) => {
        res.status(200);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.post("/getGames", (req, res) => {
    const user = req.body.username;
    UserModel.findOne({username:user})
    .then((result) => {
        if (result === null) {
            res.status(400);
            res.send("Username not found in database");
        } else {
            res.status(200);
            res.json(result.games);
        }
    }).catch((err) => {
        res.send(err);
    });
});

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
