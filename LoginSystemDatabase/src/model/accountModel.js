"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAccount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const accountSchema = new Schema({
    username: String,
    password: String, //we arent encripting the Password, so it will be seen
});
exports.GameAccount = mongoose_1.default.model('accounts', accountSchema);
//this is what the Account will look like On the Database (MongoDB)
