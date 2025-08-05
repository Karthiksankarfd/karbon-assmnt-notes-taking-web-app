const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  loginType: {
    type: String,
    enum: ["standard", "googlelogin"],
    default: "standard",
  },
password: {
  type: String,
  required: function () {
    return this.loginType !== "googlelogin";
  },
  select: false // ✅ prevents password from being returned in queries
},

  profilePicture: { type: String },

  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
