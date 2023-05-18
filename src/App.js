import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail";
import axios from "axios";
import Cart from "./pages/Cart";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  const [btnClick, setBtnClick] = useState(0);
  const [btnShow, setBtnShow] = useState(true);

  return (
    //TODO: 아이템 배열 중간정렬
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">HM Photo Studio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((el, i) => (
                    <Card key={i} shoes={shoes[i]} i={i} />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setBtnClick(btnClick + 1);
                    //FIXME: 로딩 중 유아이 띄우기
                    console.log("클릭횟수", btnClick);
                    if (btnClick + 1 == 1) {
                      console.log("한번 클릭", btnClick);
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((result) => {
                          let copy = [...shoes, ...result.data];
                          setShoes(copy);
                        })
                        //FIXME: 로딩 중 유아이 없애기
                        .catch(() => {
                          console.log("실패했습니다");
                          //FIXME: 로딩 중 유아이 없애기
                        });
                    } else if (btnClick + 1 == 2) {
                      console.log("한번 클릭", btnClick);
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                          let copy = [...shoes, ...result.data];
                          setShoes(copy);
                        })
                        //FIXME: 로딩 중 유아이 없애기
                        .catch(() => {
                          console.log("실패했습니다");
                          //FIXME: 로딩 중 유아이 없애기
                        });
                    } else {
                      alert("더 많은 사진 업데이트 예정입니다!");
                    }
                  }}
                >
                  더 보기
                </button>
              </div>
            </>
          }
        />
        //FIXME: 3번 누르면 버튼 안보이게
        {/* {btnClick==3 ? "" : setBtnShow(false)} */}
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <>
      <h2>오늘의 이벤트</h2>
      <Outlet />
    </>
  );
}
export default App;
