import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import { Item } from '../../components/index'
import { useCartContext, ICartItem } from '../../context/cart'

export default function Cart(){
  const { items, clearCart } = useCartContext()
  const [total, setTotal] = useState('')
  const router = useRouter()

 useEffect(() => {
   // get new array with all totals
  const totals: number[] | false = items ? items.map(item => item.total) : false
  // return sum of all totals
  const result: number = totals ? totals.reduce((a, b) => a + b, 0) : 0
  // format result to local currency
  const currenty: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(result)
  // update total state
  setTotal(currenty)

 }, [items])

 if(items.length < 1) {
   return (
      <Wrapper>
        <EmptyCart>Your Cart Is Empty</EmptyCart>
      </Wrapper>
 )
}

  return (
    <Wrapper>
      <HeaderText>
        <h1>Shopping Cart</h1>
        <button onClick={clearCart}><FaTrash/></button>
      </HeaderText>
      <Box>
        <Table>
          <TableHead>
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>  
            <span>Total Price</span>
          </TableHead>
          
          {items && 
            items.map((item: ICartItem) => (
              <Item key={item._id} {...item} /> // ...item => { name, price, quantity, total }
            ))
          }

        </Table>
      </Box>
      <Box>
        <TableFooter>
          <span>Total: {total}</span>
          <PayBtn onClick={() => router.push('/pay')}>Check Out</PayBtn>
        </TableFooter>  
      </Box>
    </Wrapper>
  )
}

export const Wrapper = styled.main`
  grid-column: 2/12;
  padding: 3rem 0;
  min-height: 80vh;
`

export const HeaderText= styled.header`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  position: relative;
  width: 100%;

  & > h1 {
    justify-self: flex-start;
    color: #E6E6E6;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 1px;
    width: fit-content;

    @media screen and ( max-width: 900px ) {
      font-size: 2rem;
    }
  }

  button {
    align-self: center;
    background: none;
    color: #eee;
    font-size: 2.6rem;
    position: absolute;
    right: 2rem;
    transition: all 300ms ease;

    @media screen and ( max-width: 900px ) {
      font-size: 2rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1.6rem;
    }

    &:hover {
      color: #ff5454;
      font-size: 3rem;
      transform: rotate(30deg);
      transition: all 300ms ease;

      @media screen and ( max-width: 900px ) {
        font-size: 2.5rem;
      }
      @media screen and ( max-width: 900px ) {
        font-size: 2rem;
      }
    }
  }
`

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }
`

export const TableHead = styled.div`
  background: #2b2b2b90;
  border-bottom: 1px solid #000;
  color: #E6E6E6;
  border-radius: .3rem .3rem 0 0;
  grid-column: 1/5;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  padding: .6rem 2rem;

  & > span {
    display: flex;
    justify-content: center;
    grid-column: auto;
    font-size: 1.1rem;
    font-weight: 600;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
  }

  & > span:first-child {
    justify-content: flex-start;
  }
`

export const PayBtn = styled.button`
  background: #947b58;
  border-radius: .3rem;
  color: #fff;
  font-weight: 700;
  padding: .6rem 2.3rem;
  width: fit-content;

  &:hover {
    background: #a57b3f;
  }
`

export const TableFooter = styled.div`
  background-color: #2b2b2b90;
  border-radius: 0 0 .3rem .3rem;
  color: #E6E6E6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  padding: .6rem 1.6rem;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }

  width: 100%;
`

const EmptyCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 600;
  text-align: center;

  @media screen and ( max-width: 900px ) {
    font-size: 2rem;
  }

  width: 100%;
  height: 100%;
`