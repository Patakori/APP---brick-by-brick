import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { parseCookies } from "nookies"
import { UserServiceObject } from "../services/userServices";



export function SubmitNewUser(){

  const{ push } = useRouter()

  const register = useMutation({
    mutationFn: (data:any) => UserServiceObject.createdNewUser(data),
    onSuccess: () => {
      push('/');
    },
  })

  return register
  
}