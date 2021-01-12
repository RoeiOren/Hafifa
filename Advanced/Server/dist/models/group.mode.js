"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    fatherGroup: String,
    subGroups: Array,
    persons: Array
}, {
    collection: "groups",
});
module.exports = mongoose_1.default.model("groups", userSchema);
//# sourceMappingURL=group.mode.js.map