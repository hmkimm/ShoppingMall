import React from "react";
import styled from "styled-components";

let CustomBtn = styled.button`
width: 80px;
height: 40px;
border-radius: 8px;
background-color: lightskyblue;
opacity: 0.8;
font-size: 18px;
`

export default function Btn() {
  return (
  <>
  {<CustomBtn>더 보기</CustomBtn>}
  </>
  )
}

