import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Humidity from '../components/Humidity'
import Navbar from '../components/Navbar'

import BootstrapJS from '../components/Bootstrap'
import Temperature from '../components/Temperature'
import Status from '../components/Status'

// const getUrl = "https://pythontemperaturetracker.herokuapp.com"
const getUrl = "http://localhost:5000"

export default function Home({data}) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  // const [data, setData] = useState(null)
  // const [loggedIn, setLoggedIn] = useState(false)
  useEffect(async () => {
      // await getData();
    setIsMounted(true)
  },[])
  useEffect(async () => 
  {
  }, [isMounted])

  let h_data = null;
  let t_data = null;
  let s_data = null;
  if(data != null)
  {
    h_data = data.humidities
    t_data = data.temperatures
    s_data = data.status
  } 
  // console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <BootstrapJS/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <h2>Humidity</h2>
      <p> {h_data.map(humidity => <Humidity key={humidity.id} humidityData = {humidity}/>)}</p>
      <h2>Temperature</h2>
      <p> {t_data.map(temperature => <Temperature key={temperature.id} temperatureData = {temperature}/>)}</p>
      <h2>Status</h2>
      <p> {s_data.map(status => <Status key={status.id} statusData = {status}/>)}</p>
      
    </div>
  )
  
}
export async function getServerSideProps({ req }) {
  try{
    const res = await axios.get(getUrl, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
    const data = await res.data;
    return { props: { data } }
  }catch(e){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
