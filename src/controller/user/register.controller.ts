import { randomUUID } from "crypto"
import { Request, Response } from "express"
import { RoleType, users } from "../../model/user.model"
import { encrypt } from "../../utils/encrypt"


export interface RegisterUseProps {
  name: string;
  email: string;
  password: string;
  role?: RoleType
}

export const register = (req: Request<{},{},RegisterUseProps>, res: Response): void => {
  const { name, email, password, role = RoleType.STUDANT } = req.body

  const userExists = users.find(user => user.email === email)

  if (userExists) {
   res.status(400).json({message: 'User already exists'})
   return
  } else {
    const hashedPassword = encrypt(password);

    const newUser = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
      role
    };
  
    users.push(newUser);
  
   res.status(201).json({message: 'User registration successful'})
   return
  }
}