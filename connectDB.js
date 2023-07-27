const mongoose = require('mongoose');
connectDB().catch((err) => console.log(err));

async function connectDB() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/employes");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

exports.connectDB=connectDB