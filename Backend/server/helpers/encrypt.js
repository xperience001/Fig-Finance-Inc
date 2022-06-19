/**
 * @module - Export functions to hash and verify password
 */
import bcrypt from "bcrypt";

export const hashPassword = (password) => bcrypt.hashSync(password, 10);

export const verifyPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
