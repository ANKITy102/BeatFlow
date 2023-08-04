import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minLength: [6, "Password must be up to 6 characters"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  gender: {
    type: String,
  },
});

const User = models?.User || model("User", UserSchema);
// above models.User check if the User models already exist or not
export default User;
