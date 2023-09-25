import * as crypto from "crypto";

export const encrypt = (text:string) => {
    const SECRET_KEY = "your-secret-key";
    const ALGORITHM = "aes-256-ctr";
    const cipher = crypto.createCipher(ALGORITHM, SECRET_KEY);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};

export const decrypt = (encryptedText:string) => {
    const SECRET_KEY = "your-secret-key";
    const ALGORITHM = "aes-256-ctr";
    const decipher = crypto.createDecipher(ALGORITHM, SECRET_KEY);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };