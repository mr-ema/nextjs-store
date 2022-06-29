import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, Spinner } from '../components'
import { IProduct } from '../types/types'
import banner from '../../public/images/banner.jpg'
import logo from '../../public/logo.png'
import { connectDB } from '../middleware/mongodb'
import { Product } from '../models/product'
import coffee from '../../public/images/coffee.jpg'


interface IProps {
  data?: IProduct[],
  error?: string,
}

export default function Home(props: IProps) {
  const { data, error } = props
  const [ramdom, setRamdom] = useState(0)

  useEffect( () => { if(data) setRamdom( Math.floor(Math.random() * data.length) ) }, [data])

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
    <>
      <Head>
        <meta name='title' content='NextJs Coffe Store' />
        <meta name='description' content='This is a demo ecommerce site made with NextJs framework'/>
        <meta name='keywords' content='Github,Next,Nextjs,Ecommerce,Coffe,React,Webpay,Mongodb'/>
        <meta name='robots' content='index, nofollow'/>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8'/>
        <meta name='language' content='English'/>
      </Head>
      <Wrapper>
        <Box>
          <Banner>
            <Image 
              alt='banner'
              src={banner}
              layout='fill'
              objectFit='cover'
              priority={true}
            />
          </Banner>
          <Info>
            <ImageBox>
              <Image 
                alt='logo'
                src={logo}
                layout='fill'
                objectFit='cover'
              />
            </ImageBox>
            <h1>Best Coffee</h1>
        
            <BannerItem>
              <div className='info'>
                <div className='box'>
                  <span>{data[ramdom].name}</span>
                  <span>${data[ramdom].price}</span>
                </div>

                <h3>{data[ramdom].description || ''}</h3>
                <Link href={'/products/' + data[ramdom]._id}>
                <a>See More</a>
                  </Link>
              </div>
              <div>
              <Image 
                alt={data[ramdom].name}
                src={data[ramdom].imgUrl || coffee}
                blurDataURL={data[ramdom].imgUrl}
                placeholder='blur'
                width={300}
                height={300}
                objectFit={'cover'}
              />
              </div>
            </BannerItem>
          </Info>
        </Box>
        
        <Box>
          <Products>
            {data.map( (product: IProduct, idx: number) => (
            <Card
              key={idx}
              _id={product._id}
              name={product.name} 
              price={product.price}
              img={product.imgUrl}
            />) )}
          </Products>
        </Box>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps() {
  try {
    await connectDB() // conect to database
    const response = JSON.stringify( await Product.find({}).exec() )
    const data = JSON.parse(response)
    
    return {
      props: { data }
    }
  
  }catch(err) {
    return {
      props: { error: 'no response from data-base'}
    }
  }
}

const Wrapper = styled.main`
  grid-column: 1/13;
  min-height: 80vh;
`

const Box = styled.section`
  margin-bottom: 3rem;
  position: relative;
  width: 100vw;
`

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: #00000077;
    background: radial-gradient(circle, rgba(0,0,0, .4) 0%, rgba(0,0,0,1) 100%);
  }

  min-height: 100vh;
  width: 100vw;
`

const Info = styled.div`
  display: flex;
  background-color: #00000090;
  flex-direction: column;
  gap: .6rem;
  position: absolute;
  padding: 3rem;
  top: 0;

  & > h1 {
    color: #efd2a8;
    font-size: 4rem;
    margin-bottom: 1rem;

    @media screen and ( max-width: 900px ) {
      font-size: 3rem;
    }

    @media screen and ( max-width: 600px ) {
      font-size: 2rem;
    }
  }
  
  width: 100%;
  height: 100%;
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

const BannerItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and ( max-width: 1000px ) {
    flex-direction: column-reverse;
  }

  img {
    border-radius: 1rem;
  }

  h3 {
    max-width: 500px;

    @media screen and ( max-width: 900px ) {
        font-size: 1rem;
    }

    @media screen and ( max-width: 600px ) {
      font-size: 0.8rem;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 350px;

    .box {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 2.6rem;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;

      span:first-child {
        color: #ce7d4c;
      }

      span {
        color: #4cce75;
        font-weight: 800;
        font-size: 2.8rem;
        text-align: center;
        text-transform: capitalize;

        @media screen and ( max-width: 900px ) {
          font-size: 2rem;
        }

        @media screen and ( max-width: 600px ) {
          font-size: 1.6rem;
        }
      }
    }

    a {
      background-color: #574fac;
      border-radius: .3rem;
      color: #eee;
      font-weight: 600;
      margin-top: 1rem;
      padding: 1rem;
      text-decoration: none;
      text-align: center;
    }
  }
`

const ImageBox = styled.div`
  opacity: .8;
  position: absolute;
  right: 5%;
  top: 1rem;
  
  width: 200px;
  height: 200px;

  @media screen and ( max-width: 900px ) {
    top: 1rem;
    
    width: 140px;
    height: 140px;
  }
  @media screen and ( max-width: 700px ) {
    top: 1rem;
    
    width: 100px;
    height: 100px;
  }
`