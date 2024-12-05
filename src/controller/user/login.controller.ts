import { Request, Response } from "express";
import { users } from "../../model/user.model";
import { generateToken } from "../../utils/jwt.utils";
import { decrypt } from "../../utils/encrypt";

interface LoginRequestProps {
  email: string;
  password: string;
}

export const login = (req: Request<{}, {}, LoginRequestProps>, res: Response): void =>{
  const {email, password} = req.body

  const user = users.find(user => user.email === email)

  if(user && decrypt(password, user.password)){
    const {id,name,email,role} = user
    const token = generateToken({userId: id, role})

    res.status(200).json({
      token,
      name,
      email
    })
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
    return
  }
}