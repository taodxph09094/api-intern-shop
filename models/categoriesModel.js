const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên hãng"],
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("Categories", categoriesSchema);
