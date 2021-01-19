import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: String,
    fatherGroup: Object,
    subGroups: Array,
    persons: Array
  },
  {
    collection: "groups",
  }
);

export = mongoose.model("groups", groupSchema);