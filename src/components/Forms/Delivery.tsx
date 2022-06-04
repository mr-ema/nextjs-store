import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../../context/cart'
import { IDelivery } from '../../types/delivery'
import Regions from './SelectRegion'
import { validateDelivery } from './validation/delivery'


export default function Delivery({ step, total }) {
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState<IDelivery>({
    firstName: '',
    lastName: '',
    email: '',
    region: '',
    direction: '',
    phoneNumber: ''
  })
  const [error, setError] = useState(null)
  const { items } = useCartContext()

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    const sendData = async () => {
      const order = {
        customer: data,
        items: items
      }

      try {
        setDisabled(true)
        const post = await axios.post('/api/delivery', order)
        if( post.status === 200 ) {
          return step(1)
        }
      }
      catch(error) {
        const res = 'error on the server'
        setError({...error, serverError: res})
      }
    }
    
    if(Object.keys(validateDelivery(data)).length === 0) {
        sendData()
    }else setError(validateDelivery(data)) 
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  
  return (
        <Form onSubmit={handleSubmit} autoComplete='off'>
          {error && <ServerError>{error.serverError}</ServerError>}
          <h1>Delivery</h1>
          <h3>TOTAL: {total}</h3>
          <InputBox>
          <Box>
            <input onChange={handleChange} onBlur={(event) => setError({...error, [event.target.name]: ''})}
              type='text' name='firstName' placeholder='first name' maxLength={32}/>
            {error && <span>{error.firstName}</span>}
          </Box>
          <Box>
            <input onChange={handleChange} onBlur={(event) => setError({...error, [event.target.name]: ''})} 
              type='text' name='lastName' placeholder='last name' maxLength={32}/>
            {error && <span>{error.lastName}</span>}
          </Box>
          </InputBox>
          <Box>
          <input onChange={handleChange} onBlur={(event) => setError({...error, [event.target.name]: ''})} 
            type='email' name='email' placeholder='email'/>
          {error && <span>{error.email}</span>}
          </Box>
          <InputBox>
          <Box>
            <Regions data={(region: string) => {
              setData({...data, region: region}); 
              setError({...error, 'region': ''})
            }}/>
            {error && <span>{error.region}</span>}
          </Box>
          <Box>
            <input onChange={handleChange} onBlur={(event) => setError({...error, [event.target.name]: ''})} 
              type='text' name='direction' placeholder='direction' maxLength={42}/>
            {error && <span>{error.direction}</span>}
          </Box>
          </InputBox>
          <InputBox>
            <label htmlFor='phoneNumber' className='phone-code'>+569</label>
          <Box>
            <input onChange={handleChange} onBlur={(event) => setError({...error, [event.target.name]: ''})} 
              type='tel' id='phoneNumber' name='phoneNumber' placeholder='phone number' maxLength={8}/>
            {error && <span>{error.phoneNumber}</span>}
          </Box>
          </InputBox>
          <PayBtn type='submit' disabled={disabled}>Continue To Payment</PayBtn>
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
  position: relative;

  width: 40%;

  @media screen and (max-width: 900px){
    width: 80%;
  }

  input {
    background-color: #ffffff10;
    border-radius: .3rem;
    color: inherit;
    padding: .3rem .6rem;
    width: 100%;
    height: 40px;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
  }

  h1 {
    margin-top: 1.6rem;
    @media screen and ( max-width: 900px ) {
      font-size: 1.73rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1.4rem;
    }
  }

  h3 {
    @media screen and ( max-width: 900px ) {
      font-size: 1.2rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .9rem;
    }
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

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }

  &:hover {
    background-color: #4556d4;
  }
`

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  .phone-code {
    align-self: center;
    color: rgb(204, 204, 204);
    display: block;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: 30%;
    height: 40px;
    text-align: center
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 60px;

  & > span {
    color: #ff9b43;
    font-weight: 600;
    font-size: .8rem;
    position: absolute;
    bottom: 0;
    left: .6rem;

    @media screen and ( max-width: 900px ) {
      font-size: .7rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .5rem;
    }
  }
`

const ServerError = styled.div`
  color: #ff861c;
  font-weight: 600;
  position: absolute;
  top: 2rem;
  left: 2rem;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }
`