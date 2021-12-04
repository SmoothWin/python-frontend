import axios from 'axios'
import { useRouter } from 'next/router'

const getUrl = "https://pythontemperaturetracker.herokuapp.com"
// const getUrl = "http://localhost:5000"
const logoutUrl = getUrl+"/logout"

export default function Navbar(props)
{
  const router = useRouter()

  async function logout(){
    try{
      let response = await axios.post(logoutUrl, {}, {withCredentials:true})
      router.push('/login')
    }catch(e){
      console.log(e)
    }
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            
            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Logout</button>
          </ul>
        </div>
      </nav>

    )}