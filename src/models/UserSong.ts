import { Schema, model, models } from "mongoose";

const UserSongSchema = new Schema(
  {
    song: {
      type: Schema.Types.ObjectId,
      ref: "Songs",
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserSong = models?.UserSong || model("UserSong", UserSongSchema);
export default UserSong;
