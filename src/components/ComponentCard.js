import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import PropTypes from "prop-types";

const ComponentCard = ({ children, title, subtitle }) => {
  console.log(title);

  return (
    <Card
      style={
        title === "사용자 등록"
          ? { width: "900px", boxShadow: " 0 2px 5px rgba(0,0,0,.25)" }
          : { boxShadow: " 0 2px 5px rgba(0,0,0,.25)" }
      }
    >
      <CardTitle tag="h6" className="border-bottom px-4 py-3 mb-0">
        {title}
      </CardTitle>
      <CardBody className="p-4">
        <CardSubtitle className="text-muted mb-3">
          {subtitle || ""}
        </CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node,
};

export default ComponentCard;
