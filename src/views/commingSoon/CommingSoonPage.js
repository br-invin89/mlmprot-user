import React from 'react'
import styled from 'styled-components'
import NavLogo from 'assets/images/navLogo.png'

const CommingSoon = props => {
  return (
    <Wrapper>
      <img src={NavLogo} className='logo-image' />
      <h3>COMING SOON...</h3>
    </Wrapper>
  )
}

export default CommingSoon

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 234, 238);
  border-radius: 0px;
  padding: 20px 24px;
  min-height: calc(-230px + 100vh) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo-image {
    height: 100px;
  }
  h3 {
    font-size: 35px;
    letter-spacing: 14px;
    font-family: sans-serif;
    font-weight: 800;
    margin: 30px 0px;
  }
`

