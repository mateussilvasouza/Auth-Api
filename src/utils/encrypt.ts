import bcrypt from 'bcrypt';


export const encrypt = (password: string): string =>{
  return bcrypt.hashSync(password,10)
}   

export const decrypt = (password: string, hashedPassword: string): boolean =>{
  return bcrypt.compareSync(password, hashedPassword);
}