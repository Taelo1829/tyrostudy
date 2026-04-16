import bcrypt from "bcrypt";

const saltRounds = 12;

export async function hashPassword(password) {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}