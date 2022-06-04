import axios from 'axios'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import styled from 'styled-components'
import { validateProduct } from '../../components/Forms/validation/product'

interface IProduct {
  name: string,
  price: string,
  description: string
}

// Define props
interface CreateProps {
  url: string
}

export default function Create(props: CreateProps) {
  // manage state of inputs
  const [error, setError] = useState(null)

  const [product, setProduct] = useState<IProduct>({
    name: '',
    price: '',
    description: ''
  })

  // get the next route
  const router = useRouter()

  // set values to product state
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({...product,
      [event.target.name]: event.target.value
    })
  }

  // Function to create new product
  const handleSubmit :FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    try {

      if(Object.keys(validateProduct(product)).length === 0) {
        const res = await axios.post('/api/products', product) // Make the API request
        const message = res.data
        
        if (message.message === 'DENIED') return alert('There must be less that 30 products to add a new one')
        else router.push('/')
      }else setError(validateProduct(product)) 

    }catch(err) {
      console.log(err)
    }
  } 

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <h2>Create New Product</h2>
        <Box>
          <input  type='text' name='name' placeholder='name of product' 
                  onChange={handleOnChange} maxLength={20} minLength={3}
                  onBlur={(event) => setError({...error, [event.target.name]: ''})}
          />  {error && <span>{error.name}</span>}
        </Box>

        <Box>
          <input  type='text' name='price' inputMode='numeric' placeholder='price'
                  onChange={handleOnChange} maxLength={6}
                  onBlur={(event) => setError({...error, [event.target.name]: ''})}
          />  {error && <span>{error.price}</span>}
        </Box>

        <Box>
          <input  type='text' name='stock' inputMode='numeric' placeholder='stock or empty if no stock '
                  onChange={handleOnChange} maxLength={4}
          />
        </Box>

        <Box>
          <input  type='text' name='description' placeholder='description' 
                  onChange={handleOnChange} minLength={12} maxLength={200}
                  onBlur={(event) => setError({...error, [event.target.name]: ''})}
          />  {error && <span>{error.description}</span>}
        </Box>

        <button type='submit'>create pruduct</button>
      </Form>
    </Wrapper>   
  )
}

const Wrapper = styled.div`
  grid-column: 2/12;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  min-height: 80vh;
`

const Form = styled.form`
  background-color: #22222299;
  border-radius: .6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  width: 60%;
  height: auto;

  @media screen and (max-width: 1200px){
   width : 80%;
  }

  @media screen and ( max-width: 600px ) {
      gap: 1rem;
  }
  

  h2 {
    color: #dadada;
    font-weight: 800;
    letter-spacing: 1px;
    margin-bottom: 2rem;

    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }
  }

  & > button {
    background-color: #656dc5;
    border-radius: .3rem;
    color: #ffffff;
    font-weight: 600;
    padding: .6rem;
    opacity: .8;
    width: 100%;

    &:hover {
      opacity: 1;
    }

    @media screen and ( max-width: 600px ) {
      font-size: 0.8rem;
    }
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

    @media screen and ( max-width: 600px ) {
      font-size: .6rem;
    }
  }

  & > input {
    background: none;
    border-bottom: 1px solid #aaa;
    color: #eee;
    font-weight: 600;
    padding: .6rem .9rem;
    height: 40px;
    width: 100%;

    &::placeholder{
      opacity: 1;
      color: #a8a671;
      font-weight: 700;
    }

    @media screen and ( max-width: 600px ) {
      font-size: 0.8rem;
    }
  }
`
