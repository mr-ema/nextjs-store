import styled from 'styled-components'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Wrapper>
      <h1>404</h1>
      <h3>This Page Doesn't Exits</h3>
      <Link href='/'>
        <a>Go Back</a>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #000;
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  position: fixed;

  min-width: 100vw;
  min-height: 100vh;
  z-index: 3;

  & > h1 {
    font-size: 4.6rem;
    color: inherit;
  }

  & > h3 {
    font-size: 1.6rem;
    color: #ccc;
  }

  & > a {
    border: 2px solid #6387a799;
    border-radius: .3rem;
    color: inherit;
    display: block;
    font-size: 1rem;
    font-weight: 500;
    padding: .6rem .9rem;
    text-decoration: none;

    &:hover {
      border-color: #6387a7;
    }
  }
`