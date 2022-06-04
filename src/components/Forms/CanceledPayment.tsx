import styled from 'styled-components'

export default function CanceledPayment() {
  return (
      <Wrapper>
        <h1>Pago Rechazado O Cancelado</h1>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  min-height: 100vh;
  width: 100vw;

  @media screen and ( max-width: 900px ) {
    font-size: 2rem;
  }
`