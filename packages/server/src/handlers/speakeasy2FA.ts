import { Request, RequestHandler, Response } from "express";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { generateSecret, totp } from "speakeasy";
import { v4 } from "uuid";

const db = new JsonDB(new Config('myDatabase',true,false))

export const register: RequestHandler = (_: Request, res: Response) => {
   const id = v4()
   try{
    const path = `/user/${id}`
    const tempSecret = generateSecret()
    db.push(path, {id,temp_secret: tempSecret})
    return res.json({id,secret: tempSecret.base32})
   }
   catch(error){
      return res.status(500).json({message: 'Error Generating secret'})
   }  
}

export const verify: RequestHandler = (req:Request,res:Response) => {
  const { token, userId } = req.body
  try {
    const path = `/user/${userId}`
    const user = db.getData(path)
    const { base32:secret } = user.temp_secret
    const isVerified = totp.verify({ secret, encoding: 'base32',token})
    if(isVerified){
      db.push(path, {id: userId, secret: user.temp_secret})
    }
    return res.json({ verified: isVerified})
  } catch (error) {
    return res.status(500).json({message: 'Error finding user'})
  }
}

export const validate: RequestHandler = (req:Request,res:Response) => {
  const { token, userId } = req.body
  try {
    const path = `/user/${userId}`
    const user = db.getData(path)
    const { base32:secret } = user.secret
    const validateTokens = totp.verify({ secret, encoding: 'base32',token, window: 1})
    return res.json({ validated: validateTokens})
  } catch (error) {
    return res.status(500).json({message: 'Error finding user'})
  }
}
