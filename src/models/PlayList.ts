import { Schema, model, models } from "mongoose";
import Songs from "./Song";

const PlayListSchema = new Schema(
  {
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    creator: {
      type: String,
      required: [true, "Creator name is required"],
    },
    song: [
      {
        type: Schema.Types.ObjectId,
        ref: Songs, // This should be the name of the Song model if you have one
      },
    ],
  },
  { timestamps: true }
);

// //virtual property to calculate the total
// PlayListSchema.virtual("totalsong").get(function () {
//   return this.song.length;
// });
// PlayListSchema.set("toObject", { virtuals: true });

const PlayList = models?.PlayList || model("PlayList", PlayListSchema);
// above models.User check if the User models already exist or not


export default PlayList;
