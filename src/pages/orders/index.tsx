import axios from 'axios'
import useSWR  from 'swr'
import styled from 'styled-components'
import { useState } from 'react'
import { Order, Spinner } from '../../components'
import { IOrder } from '../../types/order'

const fetcher = ( url: string ) => axios.get(url).then(res => res.data)

export default function Orders() {
  const { data, error } = useSWR('/api/orders', fetcher,  { refreshInterval: 10000 })
  const [disabled, setDisabled] = useState<boolean>(false)
  const [deleteMessage, setDeleteMessage] = useState<string>('Delete Pending 2 Days Or More')
  const [deleteCount, setDeleteCount] = useState<number>(0)

  async function handleDelete() {
    try {
      setDisabled(true)
      const res = await axios.delete('/api/orders')
      const count = res && res.data.deletedCount
      setDeleteCount(count)
      setDeleteMessage(count > 0 ? 'Wait Or Refresh' : 'Nothing To Delete')
      
      setTimeout(() => { 
        setDisabled(false); 
        setDeleteMessage('Delete Pending 2 Days Or More') 
      }, 10000)
      
    }catch(err) {
      setDeleteMessage('No response from server')
    }
  }

  if (error) return (
    <Wrapper>
      <div className='no-data'>An Error Has Ocurred</div>
    </Wrapper>
  )
  if (!data) return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
  if (data.length < 1) return (
    <Wrapper>
      <div className='no-data'>No Orders Yet</div>
    </Wrapper>
  )

  return (
    <Wrapper>
      <DeleteBox>
        {deleteCount > 0 && <DeleteCount>Pedidos Borrados: {deleteCount}</DeleteCount> }
        <DeleteBtn type='button' disabled={disabled} onClick={handleDelete}>{deleteMessage}</DeleteBtn>
      </DeleteBox>

      {data.map((item: IOrder) => ( <Order key={item._id} data={item}/> ) )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  width: 100vw;
  min-height: 80vh;
`

const DeleteBox = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
  height: auto;
` 

const DeleteCount = styled.span`
  background-color: #613232;
  border: 0;
  border-radius: .3rem;
  color: #ddd;
  display: flex;
  justify-content: center;
  font-weight: 700;
  padding: 0.5rem 1rem;

  width: 200px;
  height: auto;

  @media screen and ( max-width: 900px ) {
      font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
      font-size: .66rem;
  }
`

const DeleteBtn = styled.button`
  background-color: #572222;
  border: 0;
  border-radius: .3rem;
  color: #ddd;
  display: flex;
  justify-content: center;
  font-weight: 700;
  padding: 0.5rem 1rem;

  min-width: 200px;
  height: auto;

  @media screen and ( max-width: 900px ) {
      font-size: .8rem;
  }
  @media screen and ( max-width: 600px ) {
      font-size: .66rem;
  }

  &:hover {
    background-color: #7f0000;
  }

  &:disabled {
    opacity: .6;
    cursor: default;

    &:hover {
      background-color: #572222;
    }
  }
`