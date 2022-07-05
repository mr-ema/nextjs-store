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

    // Hide results when input is empty
    if (!query) setActive(false)
    else setActive(true)
    // Check if exist results
    if(filter.length > 0 && !!query) setResult(filter)
    else return
  }

  return (
    <SearchBox>
      <SearchBar 
        placeholder='Search'
        type='search' 
        maxLength={24} 
        onChange={handleChange} 
        onFocus={() => setActive(true)}
        // Without TimeOut The Results Vanish Before You Can Click The Link
        onBlur={() => setTimeout(() => setActive(false), 100) }
      />
      <Results $visibility={active ? 'visible':'hidden'}>
        {result && result.map((product, idx) => (
        <Link key={idx} href={`/products/${product._id}`} >
          <a>{product.name}</a>
        </Link>)
        )}
      </Results>
    </SearchBox>
  )
}

const SearchBox = styled.div`
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
  height: 46px;

  @media screen and (max-width: 900px) {
    width: 80%;
  }
`

const SearchBar = styled.input`
  background: #1b1b1bdc;
  border-left: 3px solid #475698;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0 .6rem;
  text-transform: capitalize;

  width: 80%;
  height: 46px;

  &:focus {
    border-left: 3px solid #758fff;
  }

  @media screen and ( max-width: 900px ) {
      font-size: .8rem;
      height: 30px;
  }
`

const Results = styled.div<{$visibility: string}>`
  border-radius: 0 0 .3rem .3rem;
  background-color: #1b1b1bdc;
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  overflow-y: scroll;
  visibility: ${props => props.$visibility};
  text-transform: capitalize;
  top: 46px;
  left: 0;

  width: 80%;
  max-height: 300px;
  z-index: 2;

  @media screen and ( max-width: 900px ) {
      font-size: .8rem;
      top: 30px;
  }

  a {
    color: inherit;
    display: flex;
    font-weight: 600;
    padding: 1rem;
    text-align: start;
    text-decoration: none;
    width: 100%;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }

    &:hover {
      background-color: #4d4d4d;
    }
  }
`