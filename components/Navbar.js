import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../constants/urls'
import Link from 'next/link'
const getUrl = url
const logoutUrl = getUrl + "/logout"

export default function Navbar(props) {
  const router = useRouter()
  let data = props.data
  async function logout() {
    try {
      let response = await axios.post(logoutUrl, {}, { withCredentials: true })
      router.push('/login')
    } catch (e) {
      console.log(e)
    }
  }
  let h_data = null;
  let t_data = null;
  let s_data = null;
  let humidityChart = null;
  let temperatureChart = null;
  let statusChart = null;
  if (data != null) {
    h_data = data.humidities
    t_data = data.temperatures
    s_data = data.status
    humidityChart = <Humidity humidityData={data.humidities} />
    temperatureChart = <Temperature temperatureData={data.temperatures} />
    statusChart = <Status statusData={data.status} />
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src='/images/PiLogo.png' width="65" height="50" className="d-inline-block align-top" alt="" />
        PI Temperature
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link" href="#">About</a>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Charts
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link href="/humidity"><a className="dropdown-item" href="#">Humidity</a></Link>
              <Link href="/temperature"><a className="dropdown-item" href="#">Temperature</a></Link>
              <Link href="/status"><a className="dropdown-item" href="#">Status</a></Link>
            </div>
          </li>

          <button className="btn btn-outline-danger my-2 my-sm-0" onClick={logout}>Logout</button>
        </ul>
      </div>
    </nav>

  )
}