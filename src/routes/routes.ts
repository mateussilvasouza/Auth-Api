import express, { Router } from "express";
import { register as userRegister } from "../controller/user/register.controller";
import { login } from "../controller/user/login.controller";
import { AutheticateMiddleware } from "../middlewares/authenticate.middleware";
import { createBook } from "../controller/book/create-book.controller";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";



const router = Router();
router.use(express.json())
router.post("/login", login);
router.post("/register", userRegister);
router.post("/book", AutheticateMiddleware, AuthorizationMiddleware(['admin']) , createBook);


export { router };
