import { Dispatch, SetStateAction } from "react"

interface PropsInput{
  setOnChange: any;
  title: string
  error: string | false | undefined
  textValidation: string
}

export function Input({setOnChange, title, error, textValidation}:PropsInput){
  return(
    <div 
      className="flex flex-col"
    >
      <p
        className=" font-medium text-sm"
      >
        {title}
      </p>
      <input 
        type="text" 
        className='flex rounded-lg w-[200px] h-[40px] px-[16px] bg-gray-300' 
        onChange={setOnChange}
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