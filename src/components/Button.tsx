interface PropsButton{
  onclickFunction: any
  text: string
  align: "Center" | "Start" | "End"
}

export function Button({onclickFunction, text, align}:PropsButton){
  return(
  <button 
    type="button"
    className={`
      bg-blue-500 rounded-full w-[200px] h-[40px] text-white font-medium text-sm
      ${align === "Center" && "self-center" }
      ${align === "Start" && "self-start" }
      ${align === "End" && "self-end" }
    `}
    onClick={async () =>
      //handleSubmit
       await onclickFunction()
    }
  >
    {text}
  </button>
  )
}