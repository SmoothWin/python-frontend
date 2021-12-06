import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import BootstrapJS from '../components/Bootstrap'
import head from 'next/head'

const mainUrl = "https://pythontemperaturetracker.herokuapp.com/login"
// const mainUrl = "http://localhost:5000/login"

export default function Login() {
    
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")

  useEffect(async () => {
    setIsMounted(true)
    // try{
    //   let response = await axios.post(mainUrl, {}, { //done in order to remove the auth cookie if 
    //     withCredentials: true         //the cookie still exists when the jwt is still expired
    //   })
    //   console.log(response)
    //   if(response.data.message == 'already authorized')
    //   router.push('/')
    // }catch(e){
      
    // }
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
        let response = await axios.post(mainUrl, {}, {
          withCredentials: true,
            auth:{
                username:name,
                password:pass
            },
        })
        router.push("/")
    } catch(e){
        console.log(e)
    }
  }
  return (
   <div>
       <Head>
       <title>Temperature Python</title>
       <meta name="description" content="Generated by create next app" />
       <link rel="icon" href="/favicon.ico" />
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
       <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
       <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
       <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
       <BootstrapJS/>
     </Head>
     <h3 className="text-center pt-5">Log in</h3>
     <br/><br/>
     <div className="wrapper fadeInDown container">
    <div id="formContent" className="row justify-content-center align-items-center text-center">
       <form onSubmit={handleLogin} className="form">
             <div className="form-group">
           <label className="text-center">Username</label>
           <input id="login" className="fadeIn second" onChange={handleNameChange} type="text"/>
            </div>  
          <br/>
          <div className="form-group">
           <label className="text-center">Password</label>
           <input id="password" className="fadeIn third" onChange={handlePasswordChange} type="password"/>
           </div>
           <br/>
           <div className="form-group">
           <button className="fadeIn fourth text-right" type={"submit"}>Login</button>
           </div>
       </form>
      
   </div>
  </div>
 </div>
 

  )
  
}

export async function getServerSideProps({ req }) {
  try{
    const res = await axios.post(mainUrl, {}, { //done in order to remove the auth cookie if 
      withCredentials: true,
      headers:{
        Cookie: req.headers?.cookie
      }
    })
    console.log(res.status)
     if(res.status == 200){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    const data = await res.data;
    // console.log(data)
    if(data.message == "already authorized"){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    return 
  }catch(e){
    return { props: { "no":"data" } }
  }
}