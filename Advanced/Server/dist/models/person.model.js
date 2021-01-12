"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
}, {
    collection: "persons",
});
module.exports = mongoose_1.default.model("persons", userSchema);
//# sourceMappingURL=person.model.js.map