import React, { useState, memo, useMemo, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../store";
import { changeName } from "../store/userSlice";

let Child = memo(function () {
  //꼭 필요할때만(props가 변할때만) 재렌더링 하자 (오래거리리는 컴포넌트 memo로 감싸놓자)

  console.log("재렌더딩 되는중");
  return <div>자식임</div>;
});

export default function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  let [age, setAge] = useState(20);
  useEffect(()=> {
if(count < 3 && count != 0) {
  setAge(age +1)
}
  }, [count])

  //TODO: 장바구니에 있는 정보 로컬스토리지에 저장
  // let 장바구니 = []
  // let products = {
  //   id : Date.now(),
  //   name : state.cart.name,
  //   count : state.cart.count,
  // }
  //   useEffect(()=> {
  //     localStorage.setItem('buy', JSON.stringify([]))
  //   },[])

const handleDel = (e) => {
  e.target.closest("tr").remove();}


  return (
    <div className="cart-style">
      <div>안녕하십니까 전 {age}</div>
      <button
        onClick={() => {
       
            setCount(count + 1);
      
        }}
      >
        누르면 한 살 먹기
      </button>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {state.user.name} {state.user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(changeName());
        }}
      >
        사용자 변경
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((el, i) => {
            return (
              <tr key={i}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.count}</td>

                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.cart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button onClick={handleDel}>삭제</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
