import { Button, Card, Col, Space, Spin } from "antd";

const EventCard = ({
  title,
  description,
  isVirtual,
  date,
  category,
  showModal,
  handleDelete,
  handleSave,
  user,
  isSaving,
}) => {
  return (
    <Col span={12}>
      <Card title={title} style={{ marginBottom: 10 }}>
        <p>{description}</p>
        <p>
          <b>Virtual</b>: {isVirtual ? "Yes" : "No"}
        </p>
        <p>
          <b>Category</b>: {category}
        </p>
        <p>
          <b>Date</b>: {new Date(date).toDateString()}
        </p>

        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Button onClick={showModal}>View Details</Button>
          {user && user.role === "ADMIN" && (
            <Button type="danger" onClick={handleDelete}>
              Delete Event
            </Button>
          )}
          {user && user.role === "USER" && (
            <Button type="primary" onClick={handleSave}>
              {isSaving ? <Spin /> : "Save Event"}
            </Button>
          )}
        </Space>
      </Card>
    </Col>
  );
};

export default EventCard;
