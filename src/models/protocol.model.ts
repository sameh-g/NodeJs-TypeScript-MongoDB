import * as mongoose from "mongoose";

const protocolSchema = new mongoose.Schema({

}, { timestamps: true });



const protocol = mongoose.model("Protocol", protocolSchema);
export default protocol;