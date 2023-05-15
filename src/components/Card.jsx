import { Col } from "react-bootstrap";
import "./Card.css";

function Card(props) {
  return (
    <Col>
      <img
        className="img"
        src={"/img" + props.i + ".jpeg"}
        width="80%"
        height="210px"
      />
      <h4 className="title">{props.shoes.title}</h4>
      <p className="price">{props.shoes.price}</p>
    </Col>
  );
}

export default Card;
