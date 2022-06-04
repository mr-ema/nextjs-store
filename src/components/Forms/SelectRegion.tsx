import { useState } from 'react'
import styled from 'styled-components'

const options = [ 
  'Arica', 'Tarapaca', 'Antofagasta', 'Atacama', 'Coquimbo', 
  'Valparaiso', 'Metripolitana', 'O\'Higgins', 'Maule', 'Ñuble',
  'Bio Bio', 'Araucania', 'Los Rios', 'Los Lagos', 'Aysen', 'Magallanes'
]

export default function Regions({ data }) {
  const [region, setRegion] = useState<string>('Select Region')
  const [toggleRegions, setToggleRegions] = useState<boolean>(false)

  const regions = options.map((option, index) => (
    <span 
      key={index} 
      onClick={() => {
        setRegion(option); 
        setToggleRegions(!toggleRegions)
        data(option)
      }}>{option}</span>
  ))

  return (
    <SelectRegion>
      <button type='button' onClick={() => setToggleRegions(!toggleRegions)}>{region}</button>
        <RegionsBox $opacity={toggleRegions}>
          {regions}
        </RegionsBox>
    </SelectRegion>
  )
}

const SelectRegion = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }

  button {
    background: #565fa7;
    border-radius: .3rem;
    color: #fff;
    padding: .6rem;

    width: 100%;
    height: 40px;
  }
`

const RegionsBox = styled.div<{$opacity: boolean}>`
  background: #0F0F0Ff0;
  border-radius: 0 0 .3rem .3rem;
  border: 1px solid #565fa7;;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 39px;
  left: 0;
  overflow-y: scroll;
  visibility: ${props => props.$opacity ? 'visible' : 'hidden'};
  width: 100%;
  height: 200px;
  z-index: 1;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .6rem;
    text-align: center;

    &:hover {
      background-color: #565fa7;
      color: #fff;
    }
  }
`