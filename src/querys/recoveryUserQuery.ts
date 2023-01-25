import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies"
import UserServices from "../services/userServices";

export function RecoveryUserQuery(){

  const { 'auth.token': token } = parseCookies()

  const recoveryUser = UserServices.recoveryUser(token)


  const verifyToken = useQuery({
    queryKey: ["session"],
    queryFn: () => recoveryUser
  })

  return verifyToken
  
}