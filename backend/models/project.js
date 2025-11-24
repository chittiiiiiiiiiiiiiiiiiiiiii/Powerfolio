import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  image: String,
  github: String,
  userId: String,
  status: { type: String, default: "pending" }, // approved/rejected/pending
});

export default mongoose.model("Project", projectSchema);
