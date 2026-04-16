const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes --------------------------------------------
app.use('/api/auth', require('./routes/authRoutes'));


// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server Error' });
});

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`App is listing on port : ${port}`);
    });
  })
  .catch((error) => {
    console.log("Server connection failed !!! : ", error);
  });
