import { api } from "../axios/api-old";
import jwt_decode from "jwt-decode";
import { setCookie } from "nookies";

export interface SignInData {
  email: string;
  password: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

class UserService {

  async recoveryUser(token:string){
   const response = await api.get('/recoveryUser',{
     headers: {
       'Authorization': `token ${token}`
     }
   })
   
    return response.data;
 }

  async verifyPasswordAndEmail(data: SignInData){
    console.log("verifyPasswordAndEmail", data)
    if(data){
      console.log("antes do get", data)
      const loginPost = await api.post('/login', data)
      console.log("loginPost", loginPost)
      const token = loginPost.data.token
   
  
      const decoded:any = await jwt_decode(token);
  
      setCookie(undefined, 'auth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
  
      return decoded.user
    }
   }

   async createdNewUser({email,password,username}:NewUser){
    const response = await api.post('/account', {
      username,
      email,
      password
    })
    return response;
   }



  
}

export default new UserService