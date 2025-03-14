const { app } = require("./app");
require("dotenv").config();
const MONGOOSE_LINK = process.env.MONGOOSE_LINK;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(MONGOOSE_LINK).then(() => {
  try {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});
