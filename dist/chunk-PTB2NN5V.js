import {
  getSecondaryApp
} from "./chunk-IB4I2AKX.js";

// src/firebase/functions.ts
async function sendOTP(phoneNumber) {
  if (typeof window === "undefined") {
    throw new Error("sendOTP must be called on the client");
  }
  console.log("[firebase:sendOTP]", { phoneNumber });
  try {
    const [{ getFunctions, httpsCallable }] = await Promise.all([
      import("firebase/functions")
    ]);
    const app = await getSecondaryApp();
    const functions = getFunctions(app);
    const functionName = process.env.NEXT_PUBLIC_FIREBASE_SEND_OTP_FUNCTION || "sendOTP";
    const sendOTPFn = httpsCallable(
      functions,
      functionName
    );
    const result = await sendOTPFn({ phoneNumber });
    console.log("[firebase:sendOTP] success", result.data);
    return result.data;
  } catch (e) {
    console.error("[firebase:sendOTP] error", e);
    return {
      success: false,
      message: e?.message || "Failed to send OTP"
    };
  }
}
async function verifyOTP(verificationId, code) {
  if (typeof window === "undefined") {
    throw new Error("verifyOTP must be called on the client");
  }
  console.log("[firebase:verifyOTP]", { verificationId, code: "***" });
  try {
    const [{ getFunctions, httpsCallable }] = await Promise.all([
      import("firebase/functions")
    ]);
    const app = await getSecondaryApp();
    const functions = getFunctions(app);
    const functionName = process.env.NEXT_PUBLIC_FIREBASE_VERIFY_OTP_FUNCTION || "verifyOTP";
    const verifyOTPFn = httpsCallable(functions, functionName);
    const result = await verifyOTPFn({ verificationId, code });
    console.log("[firebase:verifyOTP] success", {
      hasToken: !!result.data.customToken
    });
    return result.data;
  } catch (e) {
    console.error("[firebase:verifyOTP] error", e);
    return {
      success: false,
      error: e?.message || "Failed to verify OTP"
    };
  }
}

export {
  sendOTP,
  verifyOTP
};
