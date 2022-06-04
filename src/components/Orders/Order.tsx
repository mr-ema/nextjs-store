import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { IOrder } from '../../types/order'

interface Data {
  data: IOrder
}

export default function Order({ data }: Data) {
  const [disabledOne, setDisabledOne] = useState<boolean>(false)
  const [deleteOne, setDeleteOne] = useState<string>('Delete Order')
  
  async function handleDeleteOne(arg: string) {
    try {
      setDeleteOne('Wait Or Refresh')
      setDisabledOne(true)
      const post = await axios.post('/api/orders/delete', { _id: arg })
    }catch(err) {
      setDeleteOne('No response from server')
    }
  }

  return (
      <Box>
        <Customer color={ (data.status === 'Pending') ? '#ac3636':'#2e7029' }>
          <h2>Status: {data.status}</h2>
          <h1>Datos :</h1>

          <Container>
            <span><b>Nombre:</b></span>
            <span>{data.customer.firstName} {data.customer.lastName}</span>
          </Container>
          <Container>
            <span><b>Correo:</b></span>      
            <span>{data.customer.email}</span>
          </Container>
          <Container>
            <span><b>Telefono:</b></span>    
            <span>{data.customer.phoneNumber}</span>
          </Container>
          <Container>
            <span><b>Region:</b></span>      
            <span>{data.customer.region}</span>
          </Container>
          <Container>
            <span><b>Direccion:</b></span>   
            <span> {data.customer.direction}</span>
          </Container>
          <Container>
            <span><b>Fecha:</b></span>       
            <span>{data.createdAt.split('T')[0]}</span>
          </Container>

        </Customer>
        <Items>
          <h1>Carrito :</h1>
          <div>
            {data.items.map( i => (
            <div key={i._id} className='box'>
               <span>{i.name} <b>x</b> {i.quantity ? i.quantity : 1}</span>
               <span>,</span>
            </div>
            ))}
          </div>
        </Items>
        <button onClick={() => handleDeleteOne(data._id)} disabled={disabledOne}>{deleteOne}</button>
      </Box>
  )
}

const Box = styled.div`
  background-color: #2d2826c1;
  border-radius: .3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  gap: 2rem;
  padding: 2rem;

  width: 100%;
  height: auto;

  button {
    justify-self: center;
    grid-column: 1/3;
    background-color: #5c2222;
    border-radius: .3rem;
    color: #eee;
    font-weight: 600;
    padding: .6rem 1rem;

    width: 200px;
    height: auto;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }

    &:hover {
      background-color: #9b2525;
    }

    &:disabled {
      &:hover {
        background-color: #5c2222;
      }
    }
  }
`

const Customer = styled.div<{color: string}>`
  grid-column: auto;
  background-color: #000000cc;
  border-radius: .6rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  gap: 1rem;

  width: auto;
  height: auto;
  
  @media screen and ( max-width: 650px ) {
      grid-column: 1/3;
  }

  h1 {
    margin-bottom: .6rem;
    @media screen and ( max-width: 900px ) {
      font-size: 1.3rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }
  }

  h2 {
    align-self: flex-end;
    background-color: ${props => props.color};
    border-radius: .3rem;
    color: #fff;
    font-size: 1.2rem;
    padding: .6rem;
    width: fit-content;

    @media screen and ( max-width: 900px ) {
      font-size: .9rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

  span {
    color: #aaa;
    font-weight: 500;
    text-transform: capitalize;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
    
    b {
      color: #ddd;
    }
  }
`

const Items = styled.div`
  grid-column: auto;
  background-color: #000000cc;
  border-radius: .6rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: auto;
  height: auto;

  @media screen and ( max-width: 650px ) {
      grid-column: 1/3;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
  }

  h1 {
    margin-bottom: .6rem;
    @media screen and ( max-width: 900px ) {
      font-size: 1.3rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }
  }

  .box {
    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }

    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }

    span:first-child {
      font-weight: 600;
      text-transform: capitalize;

      b {
        padding: 0 .3rem;
      }
    }

    span:last-child {
      color: #eeff6d;
      font-weight: 700;
    }

    &:last-child {
      span:last-child {
        opacity: 0;
      }
    }
  }
`
