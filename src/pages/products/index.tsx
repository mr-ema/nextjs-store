import axios from 'axios'
import styled from 'styled-components'
import useSWR from 'swr'
import { Card, Spinner } from '../../components'
import { IProduct } from '../../types/types'

const fetcher = ( url: string ) => axios.get(url).then(res => res.data)

export default function Index() {
  const { data, error } = useSWR('/api/products', fetcher,  { refreshInterval: 10000 })
  
  if (error) { return (
    <Wrapper>
      <div className='no-data'>An Error Has Ocurred</div>
    </Wrapper>
  )}
  if (!data) { return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )}
  if (data.length < 1) { return (
    <Wrapper>
      <div className='no-data'>No Products</div>
    </Wrapper>
  )}

  return (
    <Wrapper>
      <Box>
        <Products>
          {data.map( (product: IProduct, idx: number) => (
          <Card 
            key={idx}
            _id={product._id}
            img={product.imgUrl}
            name={product.name} 
            price={product.price}
            remove={true}
          />) )}
        </Products>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  grid-column: 1/13;
  padding-top: 2rem;
  min-height: 80vh;
`

const Box = styled.section`
  margin-bottom: 3rem;
  position: relative;
  width: 100vw;
`

const Products = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;

  width: 100%;
  height: 100%;
`