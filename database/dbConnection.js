// this page is only to establish db connection using mongoose :

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const connectDB = async() => {

    process.on("uncaughtException", (err) => {
        console.log("Uncaught Exception... Shutting Down...!");
        console.log(err.name, err.message);
        process.exit(1);
    });

    const db_url =  process.env.DB_URL

        await mongoose
            .connect(db_url)
            .then(() => console.log("DB connection established successfully...!"));
        // const db = mongoose.connection;
        // return db;
};

exports.connectDB = connectDB;