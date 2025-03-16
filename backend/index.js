const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

// routes
const bookroutes = require("./routes/bookRoute");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoute");
const requesBookRoutes = require("./routes/requestRoute");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();
 

//apis
app.use("/api/books", bookroutes);
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/requests", requesBookRoutes);

app.use("/", (req,res)=>
{
  res.send("Hello World");
}
);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
