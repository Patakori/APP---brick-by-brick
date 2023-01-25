import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { parseCookies } from "nookies"
import UserServices, { SignInData } from "../services/userServices";


export function VerifyPasswordAndEmail(){
  const { push } = useRouter()

  const login = useMutation({
    mutationFn: async (data:any) => await UserServices.verifyPasswordAndEmail(data),
    onSuccess: () => {
      push('/profile');    
    },
  })

  return login

}