import Link from 'next/link'
import styled from 'styled-components'

export default function Links() {
  return (
    <Menu>
    <li>
      <Link href='/'>
        <a className='link'>home</a>
      </Link>
    </li>

    <li>
      <Link href='/products'>
        <a className='link'>products</a>
      </Link>
    </li>

    <li>
      <Link href='/products/create'>
        <a className='link'>create</a>
      </Link>
    </li>

    <li>
      <Link href='/orders'>
        <a className='link'>orders</a>
      </Link>
    </li>

    <li>
      <Link href='/about'>
        <a className='link'>about</a>
      </Link>
    </li>
  </Menu>
  )
}

const Menu = styled.ul`
  align-self: flex-end;
  grid-column: 1/6;
  flex-wrap: wrap;
  display: flex;

  .link {
    color: inherit;
    display: block;
    font-weight: 600;
    padding: .3rem;
    text-decoration: none;
    text-transform: capitalize;

    @media screen and ( max-width: 900px ) {
      font-size: .69rem;
    }
  
    &:hover {
      opacity: .8;
    }
  }
`