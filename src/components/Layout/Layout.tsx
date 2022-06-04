import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { NavBar } from '../index'

type Props = {
  children :ReactNode
}

export default function Layout({ children } :Props) {
  return (
    <Wrapper>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='e-commere project made in nextjs'
        />
        <title>Coffee Store</title>
      </Head>
        <NavBar />
        { children }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #00000099;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;

  width: 100vw;
  min-height: 100vh;

  &::before {
    content: "";
    background: url('/images/bg.jpg');
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
`