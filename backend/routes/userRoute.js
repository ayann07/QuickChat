import express from "express";
import { changePass, getOtherUsers, login, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isAuthenticated,getOtherUsers);
router.route("/change").post(changePass)


export default router;