import { successResponse } from "../helpers/responseUtil";
import { createUser, addUserEvent, login } from "../services/user.services";

class UserController {
  static async createUserHandler(req, res, next) {
    try {
      const user = await createUser(req.body, res);
      return successResponse(res, 201, "registration successful", user);
    } catch (e) {
      next(e);
    }
  }

  static async loginHandler(req, res, next) {
    try {
      const response = await login(req.body, res);
      return successResponse(res, 200, "login successful", response);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
