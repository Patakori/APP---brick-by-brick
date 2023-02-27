import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies"
import { UserServiceObject } from "../services/userServices";

export function RecoveryUserQuery(){

  const { 'auth.token': token } = parseCookies()

  const verifyToken = useQuery({
    queryKey: ["session"],
    queryFn: () => UserServiceObject.recoveryUser(token)
  })

  return verifyToken
  
}