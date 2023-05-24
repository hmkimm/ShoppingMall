import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import data from "./data";
import { lazy, useEffect, useState, Suspense } from "react";
import Card from "./components/Card";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
// import Detail from "./pages/Detail";
// import Cart from "./pages/Cart";
import Loading from "./components/Loading";
import Btn from "./components/Btn";
const Cart = lazy(() => import("./pages/Cart")); //필요할 때 렌더링
const Detail = lazy(() => import("./pages/Detail"));

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadShow(false);
    }, 500);
  }, [<Loading />]);

  const [btnClick, setBtnClick] = useState(0);
  const [btnShow, setBtnShow] = useState(true);

  useEffect(() => {
    if (btnClick === 3) {
      setBtnShow(false);
    }
  }, [btnClick]);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  const [loadShow, setLoadShow] = useState(false);

  return (
    //TODO: 아이템 배열 중간정렬 ==> 완료
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
      <Suspense fallback={<>로딩 중! 잠시만 기다려 주세요</>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div className="container">
                  {loadShow && <Loading />}
                  <div className="row">
                    {shoes.map((el, i) => (
                      <Card key={i} shoes={shoes[i]} i={i} />
                    ))}
                  </div>

                  {/* btnshow가 true이면 버튼 보여주기 */}
                  {btnShow && (
                    <button 
                      onClick={() => {
                        setBtnClick(btnClick + 1);

                        console.log("클릭횟수", btnClick);
                        if (btnClick + 1 == 1) {
                          setLoadShow(true);

                          console.log("한번 클릭", btnClick);

                          axios
                            .get(
                              "https://codingapple1.github.io/shop/data2.json"
                            )
                            .then((result) => {
                              let copy = [...shoes, ...result.data];
                              setShoes(copy);
                            })
                            .catch(() => {
                              setLoadShow(false);
                              console.log("실패했습니다");
                            });
                        } else if (btnClick + 1 == 2) {
                          setLoadShow(true);
                          console.log("한번 클릭", btnClick);
                          axios
                            .get(
                              "https://codingapple1.github.io/shop/data3.json"
                            )
                            .then((result) => {
                              let copy = [...shoes, ...result.data];
                              setShoes(copy);
                            })
                            .catch(() => {
                              console.log("실패했습니다");
                            });
                        } else {
                          alert("더 많은 사진이 업데이트 예정입니다!");
                        }
                      }}
                    >
                      더 보기
                    </button>
                  )}

                  {/* <Btn text='테스트'></Btn> */}
                </div>
              </>
            }
          />
          //FIXME: 3번 누르면 버튼 안보이게
          {/* btnShow && ? "" :  */}
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
      </Suspense>
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
