import type {AppProps} from 'next/app'
import {useMemo} from 'react'
import MyLayout from '../components/MyLayout'
import WhoAmI from '../components/WhoAmI'
import './_app.scss'

export default function MyApp({Component, pageProps}: AppProps) {
  const {showSideBar} = pageProps
  return (
    <MyLayout aside={useMemo(() => showSideBar && <WhoAmI />, [showSideBar])}>
      <Component {...pageProps} />
    </MyLayout>
  )
}
