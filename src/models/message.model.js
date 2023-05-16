import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  email: {type: String, require: true},
  message: {type: String, require: true},
  username: {type: String, require: true},
  date: {type: String, require: true},
  admin: {type: Boolean, require:true}
});

const Message = model("messages", messageSchema);

export default Message