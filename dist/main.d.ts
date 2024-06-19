import { sendMessage, SendMessageResponse } from "../types";
export declare function sendVerificationToken({ phone, otp, token, }: sendMessage): Promise<SendMessageResponse>;
