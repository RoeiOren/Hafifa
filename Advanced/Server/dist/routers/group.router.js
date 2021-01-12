"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// get all groups
router.get('/', (req, res) => {
});
// get by id
router.get('/:id', (req, res) => {
});
// get by group name
router.get('/:name', (req, res) => {
});
// add group
router.post('/add', (req, res) => {
});
// update group
router.put('/update', (req, res) => {
});
// delete group
router.delete('/delete', (req, res) => {
});
// add person to group
router.post('/addPerson', (req, res) => {
});
// remove person from the group
router.put('/removePerson', (req, res) => {
});
module.exports = router;
//# sourceMappingURL=group.router.js.map