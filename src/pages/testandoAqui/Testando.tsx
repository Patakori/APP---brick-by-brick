import React, { useState } from 'react';

type MatrizInputsProps = {
  matriz: number[][];
};

type SelectedIndices = {
  [key: string]: number;
};

export const MatrizInputs: React.FC<MatrizInputsProps> = ({ matriz }) => {
  const [valores, setValores] = useState(matriz);
  const [selectedIndices, setSelectedIndices] = useState<SelectedIndices>({});

  function handleChange(i: number, j: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newSelectedIndices: SelectedIndices = {};

    // Adiciona a nova seleção de linha
    newSelectedIndices[i] = j;

    // Verifica se existe uma seleção de linha para a mesma coluna
    const indexInSameCol = Object.keys(selectedIndices).find(
      (index) => selectedIndices[index] === j
    );
    if (indexInSameCol) {
      newSelectedIndices[indexInSameCol] = -1;
    }

    // Verifica se existe uma seleção de coluna para a mesma linha
    const indexInSameRow = selectedIndices[j];
    if (indexInSameRow !== undefined) {
      newSelectedIndices[indexInSameRow] = -1;
    }

    setSelectedIndices({ ...selectedIndices, ...newSelectedIndices });

    const newValue = parseInt(event.target.value);
    const novaMatriz = valores.map((linha, indexI) => {
      if (i === indexI) {
        return linha.map((valor, indexJ) => (j === indexJ ? newValue : valor));
      }
      return linha;
    });
    setValores(novaMatriz);
  }

  return (
    <table>
      {valores?.map((linha, i) => (
        <tr key={`linha-${i}`}>
          {linha.map((valor, j) => (
            <td key={`valor-${i}-${j}`}>
              <input
                type="radio"
                value={valor}
                checked={selectedIndices[i] === j}
                onChange={(event) => handleChange(i, j, event)}
              />
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};
