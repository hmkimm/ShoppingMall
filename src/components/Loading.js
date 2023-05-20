import React from 'react'
import styled from 'styled-components'

let Modal = styled.div`
width: 1300px;
height: 400px;
background-color: #ebebeb;
border-radius: 10px;
margin : 0 auto;
text-align: center;
font-size: 60px;
line-height: 400px;
color: black;
position: absolute;

`

export default function Loading() {
  return (
    <>
{<Modal>로딩 중</Modal>}
    
    </>
  )
}
