import { useState } from "react"
import { Factory } from "./Factory"


export default function TesteLazy() {
 
  const [ nameCompoenent, setNameComponent] = useState<string>('')

  function handleGetComponent(name:string){
    setNameComponent(()=>name)
  }

  console.log('NAME', nameCompoenent)

  return (
    <>
      <Factory componentName={nameCompoenent}/>
      <button
        onClick={()=>handleGetComponent('testeUm')}
      >
        Chamando componente teste01
      </button>
      <button
        onClick={()=>handleGetComponent('testeDois')}
      >
        Chamando componente teste02
      </button>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       componentName: context?.query?.name || 'error' ,
//     },
//   };

// }