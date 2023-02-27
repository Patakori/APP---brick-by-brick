interface PropsButton{
  onclickFunction: any
  text: string
}

export function Button({onclickFunction, text}:PropsButton){
  return(
  <button 
    type="button"
    className=' bg-blue-500 rounded-full w-[200px] h-[40px] text-white font-medium text-sm'
    onClick={async () =>
      //handleSubmit
       await onclickFunction()
    }
  >
    {text}
  </button>
  )
}