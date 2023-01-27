import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { parseCookies } from "nookies"
import UserServices from "../services/userServices";

export function SubmitNewUser(){

  const queryClient = useQueryClient()

  const{ push } = useRouter()

  const register = useMutation({
    mutationFn: (data:any) => UserServices.createdNewUser(data),
    onSuccess: () => {
      push('/');
    },
  })

  return register
  
}