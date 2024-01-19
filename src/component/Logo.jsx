import React from 'react'
import {LogoImg} from "../assets/index"
const Logo = ({width='100px'}) => {
  return (
    <>
    <div>
      <img src={LogoImg} alt='logo' width={width} className="rounded-full" />
    </div>
    </>
  )
}

export default Logo