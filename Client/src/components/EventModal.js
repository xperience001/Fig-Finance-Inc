import { Modal, Button } from "antd";

const EventModal = ({ visible, loading, content, handleOk, handleCancel }) => {
  return (
    <Modal
      visible={visible}
      title={content.title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Save Event
        </Button>,
      ]}
    >
      <p>
        <b>Description</b>
        {content.description}
      </p>
      <p>
        <b>Virtual</b>: {content.isVirtual ? "Yes" : "No"}
      </p>
      <p>
        <b>Category</b>: {content.category && content.category.name}
      </p>
      <p>
        <b>Address</b>: {content.address}
      </p>
      <p>
        <b>Date</b>: {new Date(content.date).toDateString()}
      </p>
    </Modal>
  );
};

export default EventModal;
