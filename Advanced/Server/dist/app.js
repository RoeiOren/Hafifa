"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const person_router_1 = __importDefault(require("./routers/person.router"));
const group_router_1 = __importDefault(require("./routers/group.router"));
dotenv_1.default.config();
const app = express_1.default();
const port = 9000; // default port to listen
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/persons', person_router_1.default);
app.use('/groups', group_router_1.default);
mongoose_1.default.connect(`mongodb+srv://RoeiHafifa:${process.env.DB_PASS}@backendtask.diqjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
const db = mongoose_1.default.connection;
db.on("error", () => {
    // tslint:disable-next-line:no-console
    console.error.bind(console, "connection error:");
});
db.once("open", () => {
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`listening at http://localhost:${port}`);
    });
});
//# sourceMappingURL=app.js.map