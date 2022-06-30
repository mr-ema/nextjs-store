import styled from 'styled-components'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import Image from 'next/image'
import { useCartContext } from '../../context/cart'
import coffee from '../../../public/images/coffee.jpg'

interface IProps {
  _id: string,
  imgUrl: string,
  name: string,
  price: number,
  quantity: number,
  total: number
}

export default function Item({ _id, imgUrl, name, price, quantity, total }: IProps) {
  const { updateQuantity } = useCartContext()
  // format price and total to local currency
  const formatedTotal: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total)
  const formatedPrice: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

  return (
    <ItemBox>
      <Box>
        <ImageBox>
          <Image 
            className='img'
            alt={name}
            src={imgUrl || coffee}
            blurDataURL={imgUrl}
            layout='fill'
            width={100}
            height={100}
            objectFit='cover'
          />
        </ImageBox>
      </Box>
      
      <Quantity>
        <button onClick={() => updateQuantity(_id, 'remove', 1)}><AiFillMinusSquare/></button>
          {quantity}
        <button onClick={() => updateQuantity(_id, 'add', 1)}><AiFillPlusSquare/></button>
      </Quantity>

      <span>
        {formatedPrice}
      </span>
      <span>
        {formatedTotal}
      </span>
  </ItemBox>
  )
}

const Quantity = styled.div`
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
  gap: .6rem;

  @media screen and ( max-width: 900px ) {
    gap: .3rem;
  }
    

  & > button {
    background: none;
    color: #C5A880;
    font-size: 1.3rem;
    padding: 0;

    @media screen and ( max-width: 900px ) {
      font-size: 1rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .8rem;
    }
    
  
    &:hover {
      transform: scale(1.2);
    }
  }
`

const ItemBox = styled.div`
  grid-column: 1/5;
  background: #2b2b2b90;
  color: #ffffff;
  border-bottom: 2px solid #666;
  align-items: center;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  padding: .6rem 2rem;

  & > span {
    display: flex;
    justify-content: center;
    color: inherit;
    font-weight: 700;
  }
`

const Box = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and ( max-width: 900px ) {
    flex-direction: column;
    align-items: flex-start;
    gap: .6rem;
  }

  span {
    width: 80px;
    text-align: center;

    @media screen and ( max-width: 600px ) {
      width: 50px;
    }
  }
`

const ImageBox = styled.div`
  display: flex;
  position: relative;

  width: 100px;
  height: 100px;

  .img {
    border-radius: .3rem;
  }

  @media screen and ( max-width: 900px ) {
    width: 80px;
    height: 80px;
  }
  @media screen and ( max-width: 600px ) {
    width: 50px;
    height: 50px;
  }
`