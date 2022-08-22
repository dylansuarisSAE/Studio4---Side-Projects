"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = require("mongoose");
const connectToDB = () => {
    return (0, mongoose_1.connect)('mongodb+srv://camlus:W8IOlodghUAnX5vR@cluster0.p1lpvu8.mongodb.net/LoginGameDataBase');
};
exports.connectToDB = connectToDB;
//very poorly done in terms of security!
