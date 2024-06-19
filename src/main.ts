import dotenv from "dotenv";
import env from "./utils/variable";
import { SendMessageResponse } from "./types";

dotenv.config();

const VERTOKMIN_APIURL = env.VERTOKMIN_APIURL || "";

export async function sendVerificationToken(
  phone: string,
  otp: string,
  token: string
): Promise<SendMessageResponse> {
  try {
    const body = { phone, otp };
    const response = await fetch(`${VERTOKMIN_APIURL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
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
