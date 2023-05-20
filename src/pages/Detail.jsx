import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "")};
  padding: ${(props) => (props.bg == "pink" ? "30px" : "10px")};
`;
let NewBtn = styled(YellowBtn)`
  border-radius: 10px;
`;


export default function Detail(props) {
  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  let [fade2, setFade2] = useState("");
  useEffect(() => {
    setFade2("end");

    return () => {
      setFade2("");
    };
  }, []);

  let [show, setShow] = useState(true);

  let [num, setNum] = useState("");
  let [탭, 탭변경] = useState(0);

  useEffect(() => {
    if (isNaN(num)) {
      alert("숫자를 입력하세요");
    }
  }, [num]);
  //num이 변할때만 useEffect가 실행되게


  
  let { id } = useParams();
  let 찾은상품 = props.shoes.find((el) => {
    return el.id == id;
  });

  let dispatch = useDispatch()
  
  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거) //set함수로 만들기(중복 제거 된 array)
    꺼낸거 = Array.from(꺼낸거) //다시 array 형태로 바꾸기
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
    
    console.log(찾은상품, 찾은상품.id)
  }, [])

  return (
    <div className={"container start " + fade2}>
      {show == true && (
        <div className="alert alert-warning">7초 이내 구매 시 할인</div>
      ) }
      {/* <YellowBtn bg="pink">버튼</YellowBtn>
      <YellowBtn bg="blue">버튼</YellowBtn>
      <NewBtn bg="pink">복사한 버튼</NewBtn> */}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          {/* //FIXME: 네임 부분 수정 */}
          <button className="btn btn-danger" onClick={()=> {dispatch(addItem({ id : 1, name : 찾은상품.title , count : 1}))}}>주문하기</button>
        </div>
        {/* 인풋에 입력값이 발생하면 그 값을 set이라는 변수에 저장 */}
        <input
          onChange={(e) => {
            setNum(e.target.value);
          }}
        />
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({ 탭 }) {
  // if (탭 == 0) {
  //   return <div>내용0</div>;
  // } else if (탭 == 1) {
  //   return <div>내용1</div>;
  // } else {
  //   return <div>내용2</div>;
  // }

  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [탭]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
