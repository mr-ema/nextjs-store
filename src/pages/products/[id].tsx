import { useRouter } from 'next/router'
import Image from 'next/image'
import useSWR from 'swr'
import axios from 'axios'
import styled from 'styled-components'
import { useCartContext } from '../../context/cart'
import { Spinner } from '../../components'
import coffee from '../../../public/images/coffee.jpg'

const fetcher = ( url: string ) => axios.get(url).then(res => res.data)

export default function ShowProduct() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/products/${id}`, fetcher)
  const { saveItem } = useCartContext()

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
  
  return (
    <Wrapper>
      <ProductBox>
        <ProductInfo>
          <h1>{data.name}</h1>
          <h4>{data.description}</h4>
          <InfoList>
            <div>Price: <span>${data.price}</span></div>
            <div>Size: <span>Small</span></div>
            <div>Stock: <span>{data.stock ? data.stock : 'Sin Stock'}</span></div>
          </InfoList>
          <button onClick={() => {
            saveItem({ _id: data._id, imgUrl: data.imgUrl, name: data.name, price: data.price, quantity: 1, total: data.price })
            router.push('/pay')}}>Shop Now</button>
        </ProductInfo>
        <ProductImage>
          <Image 
            src={data.imgUrl || coffee}
            blurDataURL={data.imgUrl}
            placeholder='blur'
            width={400}
            height={400}
            objectFit='cover'
          />
        </ProductImage>
      </ProductBox>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  grid-column: 1/13;
  min-height: 80vh;
`

const ProductBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  
  width: 100%;
  min-height: 70vh;

  @media screen and ( max-width: 1200px ) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 50%;

  & > h1 {
    font-size: 3.6rem;
    font-weight: 500;
    color: #C5A880;

    @media screen and ( max-width: 1200px ) {
      font-size: 2rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1.6rem;
    }
  }

  & > h4 {
    color: #d4d4d4;
    text-align: center;

    @media screen and ( max-width: 1200px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
  }

  & > button {
    background: #60e194;
    border-radius: .3rem;
    color: #222;
    font-weight: 700;
    padding: .6rem 1.2rem;

    @media screen and ( max-width: 1200px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }

    &:hover {
      background-color: #00ff66;
    }
  }
`

const ProductImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;

  @media screen and ( max-width: 1200px ) {
      width: 200px;
  }
  
  img {
    border-radius: 50%;
  }
`

const InfoList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3.6rem;
  width: fit-content;

  & > div {
    color: #C5A880;
    display: flex;
    font-size: 1.3rem;
    font-weight: 400;
    flex-direction: row;
    gap: 1rem;

    @media screen and ( max-width: 1200px ) {
      font-size: 1rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }

    & > span {
      color: #C5A880;
      font-size: 1.3rem;
      font-weight: 700;

      @media screen and ( max-width: 1200px ) {
      font-size: 1rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
    }
  }
`
