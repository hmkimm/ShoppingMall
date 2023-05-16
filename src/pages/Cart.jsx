import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

export default function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch= useDispatch()

  // const cartItem = state.cart.map((el, i) => {
  //   return (
  //     <tr key={i}>
  //       <td>{el.id}</td>
  //       <td>{el.name}</td>
  //       <td>{el.count}</td>
  //       <td>변경</td>
  //     </tr>
  //   );
  // });

  return (
    <div>
      {state.user}의 장바구니
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
         
                <td><button onClick={()=> {dispatch(changeName())}}>+</button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
