

export function ButtonTeste(){
  return(
  <div>
    <button
      type='button'
      onClick={() => console.log("que isso")}
      className="flex flex-col w-32 h-12 bg-red-300 rounded-full justify-center items-center"
    >
      Botão
    </button>
  </div>
  )
}