import '../styles/globals.css'
// import '../styles/navStyle.css'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps })
{

  return <Component  {...pageProps} />
}


export default MyApp
