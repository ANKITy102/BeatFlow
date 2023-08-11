import {Schema, model, models} from "mongoose";
const SongSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        default: "Unknown"
    },
    poster_url:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/007/643/342/small/sound-wave-logo-design-stock-pulse-music-player-audio-colorful-wave-logo-design-template-equalizer-logo-element-audio-technology-logo-icon-vector.jpg"
    },
})

const Songs = models?.Songs || model("Songs", SongSchema);
export default Songs;