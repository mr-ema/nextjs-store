import { PayConfirmation } from '../../middleware/webpay';
import styled from 'styled-components'
import Custom404 from '../404'
import { useCartContext } from '../../context/cart';
import { useEffect } from 'react';
import { CanceledPayment } from '../../components';
import { removeCookies } from 'cookies-next';

interface PayStatus {
  status: string,
  amount?: number,
  buyOrder?: string,
  date?: string,
  authorizationCode?: string
}

export default function payStatus(props: PayStatus) {
  if(props.status === 'error') { return <Custom404 /> }
  if(props.status === 'FAILED') { return <CanceledPayment />}

  const { status, amount, buyOrder, date, authorizationCode } = props
  const { clearCart } = useCartContext()

  function clear() { 
    if(props.status !== 'FAILED') clearCart()
    else return
  }

  useEffect(() => {
    addEventListener('load', clear)
    
    return () => removeEventListener('load', clear)
  })

  // format amount to local currency
  const currenty: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
  // custom status
  const customStatus = status === 'AUTHORIZED' ? 'Aprovado' : status
  // format date
  const customDate = date.replace('T', ' ').split('.')[0]

  return (
    <Wrapper>
      <Ticket>
        <span>Estado De La Operation: { customStatus }</span>
        <h1>Coffee Store</h1>
        <h3>Codigo De Autorizacion: { authorizationCode }</h3>
        <h2>N° De Orden: { buyOrder }</h2>
        <h3>Fecha De La Compra: { customDate}</h3>
        <h2>Total Compra: { currenty } CLP</h2>
      </Ticket>
    </Wrapper>
  )
}

export async function getServerSideProps({ req, res,  query }) {
  try {
    const token: string = query.token_ws ? query.token_ws : undefined
   
    if(token) { // redirect to cart, in case abort pay or load page without token
      const webpay = await PayConfirmation(token)
      
      if(webpay.status === 'AUTHORIZED') removeCookies('order-token', { req, res })

      return { 
        props: webpay 
      }
    }else {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }
  }catch(err) {
    console.log(err)
    console.log(req.headers.host)
  }
}

const Wrapper = styled.div`
  grid-column: 1/13;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
`

const Ticket = styled.div`
  background-color: #ffffffd9;
  color: #222;
  border-radius: .6rem;
  box-shadow: 0 0 6px 3px #00000099;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.6rem;
  padding: 2rem;
  position: relative;

  width: 50%;
  height: 70%;

  @media screen and ( max-width: 1200px ) {
    width: 80%;
  }

  span {
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: flex;
    font-weight: 700;
  }

  h1 {
    @media screen and ( max-width: 1200px ) {
      font-size: 2rem;
    }
    @media screen and ( max-width: 900px ) {
      font-size: 1.6rem;
    }
    @media screen and ( max-width: 900px ) {
      font-size: 1rem;
    }
  }

  h2 {
    @media screen and ( max-width: 1200px ) {
      font-size: 1.6rem;
    }
    @media screen and ( max-width: 900px ) {
      font-size: 1rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .8rem;
    }
  }

  h3 {
    @media screen and ( max-width: 1200px ) {
      font-size: 1.2rem;
    }
    @media screen and ( max-width: 900px ) {
      font-size: .9rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .8rem;
    }
  }
`