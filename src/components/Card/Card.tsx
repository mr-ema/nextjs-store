import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useCartContext } from '../../context/cart'
import { FiLoader, FiTrash } from 'react-icons/fi'
import coffee from '../../../public/images/coffee.jpg'

interface IProps {
  _id: string,
  img: string,
  name: string,
  price: number,
  remove?: boolean
}

export default function Card({ img, name, price, _id, remove = false }: IProps, ) {
  const { saveItem } = useCartContext()
  const [disabled, setDisabled] = useState<boolean>(false)
  // format price to local currency
  const formatedPrice: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

  async function handleDelete() {
    try {
      setDisabled(true)
      const res = await axios.delete(`/api/products/${_id}`)
      const message = res.data
      if (message.status === 'DENIED') {
        alert('Must be at least 5 elements to remove others.')
        setDisabled(false)
      }
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ProductImg>
      <Link href={`/products/${encodeURIComponent(_id)}`}>
        <a></a>
      </Link>
      <Image 
        src={img || coffee}
        blurDataURL={img}
        width={250}
        height={300}
        placeholder='blur'
        objectFit='cover'
      />
      </ProductImg>

      <ProductInfo>
        <Name>{name}</Name>
        <Cost>{formatedPrice}</Cost>
        <AddBtn onClick={() => saveItem({ _id: _id, imgUrl: img ,name: name, price: price, quantity: 1, total: price })}>+</AddBtn>
        
        {remove && 
        <RemoveBtn disabled={disabled} onClick={handleDelete}>
          {disabled ? <FiLoader/>:<FiTrash/>}
          </RemoveBtn>}
        
      </ProductInfo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #2b2b2b90;
  border-radius: .39rem;
  position: relative;
  
  width: 250px;
  height: 350px;

  &:hover {
    transform: scale(1.03);
  }

  a {
    background: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  @media screen and (max-width: 900px) {
    width: 150px;
    height: 230px;
  }
`

const ProductImg = styled.div`
  border-radius: .39rem .39rem 0 0;
  display: flex;
  position: relative;
  height: 65%;
  width: 100%;

  img {
    border-radius: .39rem .39rem 0 0;
  }
`

const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 1rem;
  text-transform: capitalize;
  height: 40%;

  @media screen and ( max-width: 900px ){
    font-size: .69rem;
  }
`

const Name = styled.span`
  grid-row: 1;
  grid-column: 1/3;
  color: inherit;
  font-weight: 600;
`

const Cost = styled.span`
  grid-row: 3;
  grid-column: 1;
  background: #5420ff52;
  border-radius: .3rem 0 .2rem 0;
  color: inherit;
  font-weight: 700;
  padding: .2rem .6rem;
  position: absolute;
  
  top: 0;
  left: 0;
  height: fit-content;
  width: fit-content;
`

const AddBtn = styled.button`
  grid-row: 4;
  grid-column: 3;
  justify-self: end;
  background: #C5A880;
  border-radius: .2rem;
  color: #000;
  font-weight: 800;
  padding: .2rem .6rem;
  opacity: .8;
  z-index: 3;

  width: fit-content;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`

const RemoveBtn = styled.button`
  grid-row: 4;
  grid-column: 1;
  justify-self: start;
  background: none;
  border-radius: .2rem;
  color: #ddd;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 0;
  transition: all 300ms ease;
  z-index: 3;

  width: fit-content;

  &:hover {
    color: #742121;
    font-size: 1.3rem;
    transform: rotate(45deg);
    transition: all 300ms ease;
  }
`