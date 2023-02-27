
interface PropsCard{
  children:  React.ReactNode;
  title: string
}

export function Card({children, title}:PropsCard){
  return(
    <div className="flex flex-col items-center p-4 bg-gray-200 gap-2 rounded-2xl">
      <p className="font-semibold">{title}</p>
      {
        children
      }
    </div>
  )
}