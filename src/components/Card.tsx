
interface PropsCard{
  children:  React.ReactNode;
  title: string
  width: "P" | "M" | "G"
  align: "Center" | "Start" | "End"
  alignTitle: "Center" | "Start" | "End"
}

export function Card({children, title, width, align, alignTitle}:PropsCard){
  return(
    <div className={`
      flex flex-col p-4 bg-gray-200 gap-2 rounded-2xl shadow-lg
      ${width === "P" && "min-w-[20rem]" }
      ${width === "M" && "min-w-[52rem]" }
      ${width === "G" && "w-full" }
      ${align === "Center" && "items-center" }
      ${align === "Start" && "items-start" }
      ${align === "End" && "items-end" }
    `}>
      <p className={`
        font-semibold
          ${alignTitle === "Center" && "self-center" }
          ${alignTitle === "Start" && "self-start" }
          ${alignTitle === "End" && "self-end" }
      `}>{title}</p>
      {
        children
      }
    </div>
  )
}