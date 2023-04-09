const express = require("express");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const followRoutes = require("./routes/follow");
const errorHandler = require("./middlewares/errorHandler");
const passportJWT = require('./middlewares/passportJWT')();
const mongoose = require('mongoose');
const app = express();

//For API
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

//to server static files
app.use(express.static(path.join(__dirname, "public")));

//For mongodb connection starts
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/rest-api-blog', 
    {
        useNewUrlParser: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongodb Connected successfully");
});

//For mongodb connection ends

//Enable passport
app.use(passportJWT.initialize());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/post", passportJWT.authenticate(), postRoutes);
app.use("/api/follow", passportJWT.authenticate(), followRoutes);

app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening to 8000");
});
