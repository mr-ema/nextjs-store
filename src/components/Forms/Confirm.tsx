import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../../context/cart'

// define props
interface PayProps {
  url?: string
  token?: string,
  error?: boolean
}

export default function ConfirmPay({ total }) {
  const [response, setResponse] = useState<PayProps | null>(null)
  const { items } = useCartContext()

  useEffect(() => {
    const cart = items.map(item => ({ _id: item._id, quantity: item.quantity }) )

    async function getToken () {
      try {
        const res = await axios.put('/api/pay', cart)
        const data: PayProps = await res.data
    
        setResponse(data)
      
      }catch (err) {
        setResponse({ error: true })
      }
    } 
    
    getToken()
  }, [])

  
  if (!response) { return ( <h2>Wait...</h2> ) }

  if (response && response.error) { return ( <h1>Something Broken Try Again Later</h1> ) }

  return (
    <Form method='post' action={response && response.url}>
      <span>Total: {total}</span>
      <input type='hidden' name='token_ws' value={response && response.token} />
      <PayBtn type='submit'>Confirm And Pay</PayBtn>
    </Form>
  )
}

const Form = styled.form`
  background-color: #0F0F0Ff0;
  border-radius: .6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.6em 1.6rem;

  width: 40%;

  @media screen and (max-width: 900px){
    width: 80%;
  }

  input {
    background-color: #00000010;
    border-radius: .3rem;
    padding: .3rem .6rem;
    width: 100%;
    height: 40px;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66;
    }
  }

  span {
    font-size: larger;
    font-weight: 600;
  }
`

const PayBtn = styled.button`
  background: #565fa7;
  border-radius: .3rem;
  color: #fff;
  font-weight: 700;
  padding: 1rem 0;
  text-align: center;

  width: 100%;

  &:hover {
    background-color: #4556d4;
  }
`