import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { parseCookies } from "nookies"
import UserServices, { SignInData } from "../services/userServices";


export function VerifyPasswordAndEmail(){
  const { push } = useRouter()

  const login = useMutation({
    mutationFn: (data:any) => UserServices?.verifyPasswordAndEmail(data),
    onMutate(variables) {
      console.log("onMutate", variables)
    },
    onSuccess: (data) => {
      console.log("xxxx", data)
      push('/profile');   
    },
    onError(error, variables, context) {
      console.log("variables", variables)
      console.log("error", error)
      console.log("context", context)
    },
  })

  console.log("login", login)

  return login

}