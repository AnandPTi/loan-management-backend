"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGODB_URL);
    const adminExists = yield User_1.default.findOne({ email: 'anandp@gmail.com' });
    if (!adminExists) {
        const adminUser = new User_1.default({
            email: 'anandp@gmail.com',
            name: 'Anand Prakash',
            phone: '1234567890',
            address: 'Raipur',
            password: 'anandP12@',
            role: 'admin',
        });
        yield adminUser.save();
        console.log('Admin user created');
    }
    else {
        console.log('Admin user already exists');
    }
    yield mongoose_1.default.disconnect();
});
seedAdmin();
