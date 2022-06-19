import jwt from "jsonwebtoken";

const validRoles = { USER: "USER", ADMIN: "ADMIN" };

/**
 * @description - check if a user is logged in
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {object} next
 *
 * @returns
 */
export const isLoggedIn = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    res.status(401);
    throw new Error("log in to continue");
  }

  jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error(`${err.message}..log in to continue`);
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.username = decoded.username;
    return next();
  });
};

/**
 * @description - check if a logged in user is an admin
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {object} next
 *
 * @returns
 */
export const isAdmin = (req, res, next) => {
  const role = req.userRole;
  if (!role) {
    res.status(401);
    throw new Error("Please log in to continue");
  }

  if (role.toUpperCase() !== validRoles.ADMIN) {
    res.status(403);
    throw new Error("Forbidden: you don't have permission to perform action");
  }

  return next();
};
