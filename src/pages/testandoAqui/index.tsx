import { MatrizInputs } from "./Testando";

const matriz = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];

export default function TestandoAqui(){

  return(
    <div>
      <MatrizInputs matriz={matriz} />;
    </div>
  )
}