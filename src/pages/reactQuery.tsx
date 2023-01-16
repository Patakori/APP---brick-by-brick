import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useQuery } from "react-query"
import { api } from "../service/axios";

interface IReactQuery{
  name:string,
  email:string
}[]

export default function ReactQuery(){
  const key = ["user"]
  const {data} = useQuery<IReactQuery[]>(key, () => api.get('/show').then(response => response.data))

  useEffect(()=>{
    console.log("usersssssssssssssssssssssss", data)
  },[data])

  

  return(
<>
  {
    data?.map((user:any)=>{
      return(
        <p
        key={user.id}
        >{user.name}</p>
      )
    })
  }
</>
    
  )
}

