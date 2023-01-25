import { api } from "../axios/api-old";
import jwt_decode from "jwt-decode";
import { setCookie } from "nookies";

export interface SignInData {
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
    if(data){
      const loginPost = await api.post('/login', data)
      
      const token = loginPost.data.token
  
      const decoded:any = await jwt_decode(token);
  
      setCookie(undefined, 'auth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
  
      return decoded.user
    }
    

   }

  
}

export default new UserService