import { useQuery } from "@tanstack/react-query";
import { UserServiceObject } from "../services/userServices";

export function GetAllUserQuery(){
  
  const allUsers = useQuery({
    queryKey: ["users"],
    queryFn: () => UserServiceObject.getAllUser(),
  })

  console.log("allUsers")

  return allUsers
  
}