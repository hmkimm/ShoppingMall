import React from 'react'
import styled from 'styled-components'

let Modal = styled.div`
width: 1300px;
height: 600px;
background-color: #ebebeb;
/* opacity: 0.9; */
border-radius: 15px;
margin : 0 auto;
text-align: center;
font-size: 60px;
line-height: 400px;
color: black;
position: absolute;
top: 50%;
/* transform: translateY(-50%); */

`

export default function Loading() {
  return (
    <>
{<Modal>로딩 중</Modal>}
    
    </>
  )
}