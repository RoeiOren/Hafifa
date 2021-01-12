import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String
  },
  {
    collection: "persons",
  }
);

export = mongoose.model("persons", userSchema);