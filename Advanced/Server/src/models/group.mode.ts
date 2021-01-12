import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: String,
    fatherGroup: String,
    subGroups: Array,
    persons: Array
  },
  {
    collection: "groups",
  }
);

export = mongoose.model("groups", groupSchema);