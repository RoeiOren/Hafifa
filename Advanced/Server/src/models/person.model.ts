import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String
  },
  {
    collection: "persons",
  }
);

export = mongoose.model("persons", personSchema);