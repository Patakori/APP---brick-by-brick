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
export interface IChangeName {
  name: string;
  email: string;
}

// class UserService {

//   async recoveryUser(token:string){
//    const response = await api.get('/recoveryUser',{
//      headers: {
//        'Authorization': `token ${token}`
//      }
//    })
   
//     return response.data;
//  }

//   async verifyPasswordAndEmail(data: SignInData){
//     console.log("verifyPasswordAndEmail", data)
//     if(data){
//       console.log("antes do get", data)
//       const loginPost = await api.post('/login', data)
//       console.log("loginPost", loginPost)
//       const token = loginPost.data.token
   
  
//       const decoded:any = await jwt_decode(token);
  
//       setCookie(undefined, 'auth.token', token, {
//         maxAge: 60 * 60 * 1, // 1 hour
//       })
  
//       return decoded.user
//     }
//    }

//    async createdNewUser({email,password,username}:NewUser){
//     console.log()
//     const response = await api.post('/account', {
//       username,
//       email,
//       password
//     })
//     return response;
//    }

//    async getAllUser(){
//     const response = await api.get('/show');
//     return response.data;
//    }

//    async changeName({email, name}:IChangeName){
//     console.log("na função name", email)
//     console.log("na função name", name)
//     const response = await api.put(`/account/${email}`, {
//      name : name
//    })

//    console.log("nresponse", response.data)
   
//      return response.data;
//    }


  
// }

// export default new UserService

export const UserServiceObject = {
  recoveryUser:  async function recoveryUser(token:string){
    const response = await api.get('/recoveryUser',{
      headers: {
        'Authorization': `token ${token}`
      }
    })
    
      return response.data;
  },

  verifyPasswordAndEmail: async function verifyPasswordAndEmail(data: SignInData){
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
    },

    createdNewUser: async function createdNewUser({email,password,username}:NewUser){
      console.log()
      const response = await api.post('/account', {
        username,
        email,
        password
      })
      return response;
    },

    getAllUser: async function getAllUser(){
      const response = await api.get('/show');
      return response.data;
    },

    changeName: async function changeName({email, name}:IChangeName){
      console.log("na função name", email)
      console.log("na função name", name)
      const response = await api.put(`/account/${email}`, {
      name : name
    })

    console.log("nresponse", response.data)
    
      return response.data;
    }
};