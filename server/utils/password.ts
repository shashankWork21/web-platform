import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(64).toString("hex");
  const hash = (await scrypt(password, salt, 128)) as Buffer;
  const result = `${salt}.${hash.toString("hex")}`;
  return result;
}

export async function comparePassword(
  enteredPassword: string,
  password: string
) {
  const [salt, storedHash] = password.split(".");
  const hash = (await scrypt(enteredPassword, salt, 128)) as Buffer;
  return hash.toString("hex") === storedHash;
}
