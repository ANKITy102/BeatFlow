import { Schema, model, Document,models } from "mongoose";
import PlayList from "./PlayList";
import UserSong from "./UserSong";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  gender: string;
  playlist: Schema.Types.ObjectId[];
}

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
  playlist: [{ type: Schema.Types.ObjectId,ref: PlayList }],
  LikedPlayList:{
    type:[{
    type:Schema.Types.ObjectId,
    ref: UserSong
  }],
  default:[]
}
});


const User = models?.User || model("User", UserSchema);
// above models.User check if the User models already exist or not

// Pre-save middleware to add a default playlist
export default User;
