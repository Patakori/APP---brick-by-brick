import { Dispatch, SetStateAction } from "react"

interface PropsInput{
  setOnChange: any;
  title: string
  error: string | false | undefined
  textValidation: string
  placeholder: string
  width: "P" | "M" | "G"
}

export function Input({setOnChange, title, error, textValidation, placeholder, width}:PropsInput){
  return(
    <div 
      className={`
      flex flex-col
      ${width === "P" && "min-w-[20rem]" }
      ${width === "M" && "min-w-[52rem]" }
      ${width === "G" && "w-full" }
      `}
    >
      <p
        className=" font-medium text-sm"
      >
        {title}
      </p>
      <input 
        type="text" 
        className={`
          flex rounded-lg h-[40px] px-[16px] bg-gray-300 placeholder:text-xs my-[2px] w-full
        `} 
        onChange={setOnChange}
        placeholder={placeholder}
      />
      {
        error ? 
          <p
            className="font-normal text-xs text-red-400"
          >
            {error}
          </p> :
          <p
            className="font-normal text-xs text-green-600"
          >
            {textValidation}
          </p>
      }

    </div>
  )
}