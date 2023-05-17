import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  addCount } from "../store";
import { changeName } from "../store/userSlice";

export default function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch= useDispatch()

  return (
    <div className="cart-style">
      {state.user.name} {state.user.age}의 장바구니
      <button onClick={()=> {dispatch(changeName())}}>사용자 변경</button>
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
         
                <td><button onClick={()=> {dispatch(addCount(state.cart[i].id))}}>+</button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
