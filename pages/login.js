import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

const getUrl = "https://pythontemperaturetracker.herokuapp.com/login"
// const mainUrl = "http://localhost:5000/login"

export default function Login() {
    
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])
  useEffect(async () => {
    
  }, [isMounted])
  async function handleNameChange(e){
      setName(e.target.value)
  }
  async function handlePasswordChange(e){
      setPass(e.target.value)
  }
  async function handleLogin(e){
    e.preventDefault()
    try{
        let response = await axios.post(mainUrl, {withCredentials: true}, {
            auth:{
                username:name,
                password:pass
            }
        })
        if(response.request.responseURL.match(/\/$/)){
            router.push("/")
        }
        console.log(response)
    } catch(e){
        console.log(e)
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Temperature Python</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <form onSubmit={handleLogin}>
            <label>Username</label>
            <input onChange={handleNameChange} type="text"/>
            <br/>
            <label>Password</label>
            <input onChange={handlePasswordChange} type="password"/>
            <br/>
            <button type={"submit"}>Login</button>
        </form>
      
    </div>
  )
  
}
