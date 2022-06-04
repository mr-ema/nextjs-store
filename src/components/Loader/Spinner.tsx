import styled, { keyframes } from 'styled-components'

export default function Spinner() {
  return (
    <Wrapper>
      <SpinnerBox/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%; 
`

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerBox = styled.div`
  animation: ${rotate} 1800ms infinite linear;
  border-radius: 50%;
  border: 13px solid #ffffff;
  border-left-color: transparent;
 
  width: 150px;
  height: 150px;

  @media screen and ( max-width: 900px ) {
    border-width: 10px;
    width: 100px;
    height: 100px;
  }
  @media screen and ( max-width: 600px ) {
    border-width: 7px;
    width: 50px;
    height: 50px;
  }
`
