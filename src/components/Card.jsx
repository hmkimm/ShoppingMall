import { Col } from "react-bootstrap";
import "./Card.css";
import { useNavigate } from "react-router-dom";

function Card(props) {
  let navigate = useNavigate()
  return (
    <div className=" col-md-4" >
      <img onClick={()=> {navigate('/detail')}}
        className="img"
        src={"/img" + props.i + ".jpeg"}
        width="100%"
        height="210px"
      />
      <h4 className="title">{props.shoes.title}</h4>
      <p className="price">{props.shoes.price}</p>
      <button className="cart-btn">담기</button>
    </div>
  );
}

export default Card;
