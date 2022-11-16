import Head from 'next/head'
import Navbar from './Navbar'

const Main = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string
}) => {
  return (
    <>
      <Head>
        <title>Cloudberry</title>
      </Head>

      <div className='w-screen'>
        <Navbar />
        <div className='px-6 lg:px-20 py-4 md:py-6'>{children}</div>
      </div>
    </>
  )
}

export default Main
