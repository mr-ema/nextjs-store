import Link from 'next/link'
import styled from 'styled-components'

export default function About() {
  return (
    <Wrapper>
      <Box>
        <Container>
          <h2>About This Site</h2>
          <span>This is My first e-commerce site, and first project on <b>NextJs </b> </span>
          <span>Is made with :</span>
          <ol>
            <li>Nextjs framework.</li>
            <li>Basic Swr</li>
            <li>MongoDB as database.</li>
            <li>WebPay as pay method.</li>
          </ol>
        </Container>

        <Container>
          <h2>To Test Pay Method use:</h2>
          <span><b>Credit Cart: </b>4051885600446623</span>
          <span><b>Rut: </b>11.111.111-1</span>
          <span><b>Password: </b>123</span>
        </Container>
        

        <Link href='https://github.com/mr-ema' target='_blank'>
          <a>My GitHub →</a>
        </Link>
      </Box>

      <Box>
        <Container>
          <h2>Info</h2>
          <span className='note'>
          - Soon I will add validation between stock and items on the cart.
          </span>
        </Container>
        <Container>
          <h2>What can this site do</h2>
          <span>This site can :</span>
          <ol>
            <li>Create a new product and save it to a database.</li>
            <li>Save an order on database and delete those that has an Pending state and have more than 2 days with a button ( probably 5min for demostration purposes ).</li>
            <li>Once pay update order status to Pagado.</li>
            <li>Add, Remove And Increase Products In The Cart.</li>
          </ol>
        </Container>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column: 2/12;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
  min-height: 100vh;
`

const Box = styled.section`
  background-color: #121212cc;
  border-radius: .6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  padding: 2rem;

  width: 100%;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }

  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }

  .note {
    display: inline;
    color: #cfbe00;
    font-weight: 700;
    border-radius: .2rem;
    padding: 0 .6rem;
    width: fit-content;
  }

  a {
    align-self: flex-end;
    display: block;
    color: #ce5cff;
    font-size: 1.3rem;
    font-weight: 600;
    position: relative;
    text-decoration: none;

    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .6rem;
  
  h2 {
    color: #ffffff;
    font-weight: 700;
    text-transform: capitalize;
  }

  span {
    font-weight: 500;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: .6rem;
    list-style: inside;

    & > li {
      text-indent: 20px;
      
    }
  }
`