import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
const isAuthenticated = async(req,res,next) => {
  try {
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:"User not authenticated."})
    };
    const jwtToken=token.replace("Bearer","").trim();
    const decode = await jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
    if(!decode){
        return res.status(401).json({message:"Invalid token"});
    };
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
