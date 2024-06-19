import dotenv from "dotenv";
import env from "./utils/variable";
import { sendMessage, SendMessageResponse } from "../types";

dotenv.config();

const VERTOKMIN_APIURL = env.VERTOKMIN_APIURL || "";

export async function sendVerificationToken({
  phone,
  otp,
  token,
}: sendMessage): Promise<SendMessageResponse> {
  try {
    const body = { phone, otp };
    const response = await fetch(`${VERTOKMIN_APIURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Invalid response format:", text);
      return {
        success: false,
        message: "Invalid response format from API",
        data: text,
      };
    }

    const responseData = await response.json();

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
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, message: "Internal server error", data: error };
  }
}
