import { NextPageContext } from 'next'
import Link from 'next/link'

export default function Error({ statusCode }) {

  if(statusCode) {
    return (<div className='nextjs-error'>
      <h1>{statusCode}</h1>
      <h2>Sorry, An Error Ocurred On The Server</h2>
      <Link href={'/'}>
        <a>Go Back Home</a>
      </Link>
    </div>)
    }
  
  else { return (
    <div className='nextjs-error'>
      <h2>Sorry, An Error Ocurred On The Browser</h2>
      <Link href={'/'}>
        <a>Go Back Home</a>
      </Link>
    </div>
  )}
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}