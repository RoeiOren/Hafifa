import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    fatherGroup: Number,
    subGroups: Array,
    persons: Array
  },
  {
    collection: "groups",
  }
);

export = mongoose.model("groups", userSchema);