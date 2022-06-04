import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IProduct } from '../../types/types'

export default function Search() {
  const [result, setResult] = useState<IProduct[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
   const fetchData = async () => {
    const res = await axios.get('/api/products')
    const data = await res.data

    setProducts(data)
   }

   fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    const filter = products.filter(item => item.name.includes(query))

    if(filter.length > 0 && !!query) setResult(filter)
    else return
  }

  return (
    <SearchBox border={active && result.length > 0 ? true:false}>
      <SearchBar 
        placeholder='Search'
        type='search' 
        maxLength={24} 
        onChange={handleChange} 
        onFocus={() => setActive(true)}
        onBlur={() => setTimeout(() => setActive(false), 200) }
      />
      <Results $visibility={active ? 'visible':'hidden'}>
        {result && result.map(product => (
        <Link href={`/products/${product._id}`}>
          <a>{product.name}</a>
        </Link>)
        )}
      </Results>
    </SearchBox>
  )
}

const SearchBox = styled.div<{border: boolean}>`
  grid-column: 2/7;
  justify-self: center;
  align-items: flex-start;
  justify-content: flex-start;
  background: none;
  color: #ffffff;
  display: flex;
  gap: 0;
  position: relative;

  width: 70%;
  height: 35px;

  @media screen and (max-width: 900px) {
    width: 80%;
  }
`

const SearchBar = styled.input`
  background: #ffffff16;
  border-radius: .6rem;
  color: #fff;
  font-weight: 600;
  padding: 0 .6rem;

  width: 80%;
  height: 35px;

  @media screen and ( max-width: 600px ) {
      font-size: .8rem;
      height: 30px;
  }
`

const Results = styled.div<{$visibility: string}>`
  border-radius: 0 0 .3rem .3rem;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  overflow-y: scroll;
  visibility: ${props => props.$visibility};
  top: 35px;
  left: 0;

  width: 80%;
  max-height: 300px;
  z-index: 2;

  @media screen and ( max-width: 600px ) {
      top: 30px;
  }

  a {
    color: inherit;
    display: flex;
    font-weight: 600;
    padding: .6rem;
    text-align: start;
    text-decoration: none;
    width: 100%;

    @media screen and ( max-width: 600px ) {
      font-size: .8rem;
    }

    &:hover {
      background-color: #4d4d4d;
    }
  }
`