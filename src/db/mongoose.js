const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGODB_URL)
// You can’t use the localhost connection string. Use the connection string you get from MongoDB Atlas.

// If you have it in the environment variable then remove the second mongoose.connect call.

mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName:"she_log_user",
  useNewUrlParser: "true",
  useUnifiedTopology: "true"

})