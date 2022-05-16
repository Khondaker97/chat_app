import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    reuired: true,
    min: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isAvatarSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Users", userSchema);
