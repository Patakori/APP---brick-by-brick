import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios/api-old";
import { IChangeName } from "../services/userServices";

export function ChangeName(){

  const queryClient = useQueryClient()

  
 async function changeName({email, name}:IChangeName){
    console.log("na função name", email)
    console.log("na função name", name)
    const response = await api.put(`/account/${email}`, {
    name : name
  })

  console.log("nresponse", response.data)
  
    return response.data;
  }

  const updatedName = useMutation({
    mutationKey: ["user"],
    mutationFn: (data:any) => changeName(data),
    onSuccess: (data) => {
      console.log("onSuccess")

      queryClient.invalidateQueries(['users'])   
 
    },

  })

  return updatedName
  
}

