import { useRouter } from "next/router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Button } from "./Button"

export function Header(){
  
  return(
    <div
      className="flex justify-between items-center w-full h-[10vh] bg-slate-300 px-20"
    >
      <h1>Logo</h1>
      <button>Menu</button>
    </div>
  )
}