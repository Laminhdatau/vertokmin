export interface SendMessageResponse {
    success: boolean;
    message?: string;
    data?: any;
  }
  
  export type sendMessage = {
    phone: string;
    otp: string;
    token: string;
  };
  