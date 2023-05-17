import { Col } from "react-bootstrap";
import "./Card.css";

function Card(props) {
  return (
    <div className=" col-md-4" >
      <img
        className="img"
        src={"/img" + props.i + ".jpeg"}
        width="100%"
        height="210px"
      />
      <h4 className="title">{props.shoes.title}</h4>
      <p className="price">{props.shoes.price}</p>
    </div>
  );
}

export default Card;
