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
exports.sendVerificationToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const variable_1 = __importDefault(require("./utils/variable"));
dotenv_1.default.config();
const VERTOKMIN_APIURL = variable_1.default.VERTOKMIN_APIURL || "";
function sendVerificationToken(_a) {
    return __awaiter(this, arguments, void 0, function* ({ phone, otp, token, }) {
        try {
            const body = { phone, otp };
            const response = yield fetch(`${VERTOKMIN_APIURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = yield response.text();
                console.error("Invalid response format:", text);
                return {
                    success: false,
                    message: "Invalid response format from API",
                    data: text,
                };
            }
            const responseData = yield response.json();
            if (responseData.error) {
                return {
                    success: false,
                    message: "Failed to send WhatsApp message",
                    data: responseData.error,
                };
            }
            return {
                success: true,
                message: "WhatsApp message sent successfully",
                data: responseData,
            };
        }
        catch (error) {
            console.error("Error sending WhatsApp message:", error);
            return { success: false, message: "Internal server error", data: error };
        }
    });
}
exports.sendVerificationToken = sendVerificationToken;
