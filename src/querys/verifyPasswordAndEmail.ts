import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { parseCookies } from "nookies"
import { UserServiceObject } from "../services/userServices";


export function VerifyPasswordAndEmail(){
  const { push } = useRouter()

  const login = useMutation({
    mutationFn: (data:any) => UserServiceObject?.verifyPasswordAndEmail(data),
    onSuccess: () => {
      push('/constructions');   
    },
  })

  return login

}