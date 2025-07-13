"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = report;
const chalk_1 = __importDefault(require("chalk"));
function report(file, errors) {
    if (errors.length === 0) {
        console.log(`${chalk_1.default.green('✔')} ${file}`);
    }
    else {
        console.log(`${chalk_1.default.red('✖')} ${file}`);
        errors.forEach((err) => {
            console.log('   ' + chalk_1.default.red(err));
        });
    }
}
