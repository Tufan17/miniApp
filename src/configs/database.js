const mongoose = require("mongoose");


const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Bağlantısı Başarılı...");
});

const mongooseConnect = async () => {
  await mongoose.connect(
    process.env.MONGO_URI,
    {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   serverSelectionTimeoutMS: 10000,
    //   bufferCommands: false,
    }
  );
};

module.exports = mongooseConnect;