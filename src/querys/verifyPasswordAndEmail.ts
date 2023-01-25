// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/router";
// import { parseCookies } from "nookies"
// import UserServices, { SignInData } from "../services/userServices";


// export async function VerifyPasswordAndEmail(){
//   const {push} = useRouter()

//   const verify = await UserServices.verifyPasswordAndEmail(null)


//   const login = useMutation({
//     mutationFn: () => verify,
//     onSuccess: () => {
//       push('/profile');    
//     },
//   })

  

//   return login

// }