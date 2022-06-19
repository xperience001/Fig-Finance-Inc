import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spin,
  DatePicker,
  Row,
  Col,
  Menu,
  Divider,
  Form,
  Input,
  Select,
  Button,
} from "antd";
import { addEvent, reset } from "../features/event/eventSlice";
import {
  getAllCategories,
  reset as resetCategories,
} from "../features/category/categorySlice";
import { openNotificationWithIcon } from "../utils/Notification";
import LayoutWrapper from "../components/LayoutWrapper";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

function NewEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const { categories, isError, isSuccess, message } = useSelector(
    (state) => state.category
  );

  const {
    isLoading,
    isError: isEventError,
    isSuccess: isEventSuccess,
    message: eventMessage,
  } = useSelector((state) => state.event);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || (user && user.role !== "ADMIN")) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon("error", message);
    }

    if (isSuccess && categories) {
      const { categories: list } = categories;
      setCategoryList(list);
    }

    dispatch(resetCategories());
  }, [categories, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    if (isEventError) {
      openNotificationWithIcon("error", eventMessage);
    }
    if (isEventSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [isEventError, isEventSuccess, eventMessage, dispatch]);

  const onFinish = (values) => {
    dispatch(addEvent(values));
  };

  const onFinishFailed = (errorInfo) => {
    openNotificationWithIcon("error", errorInfo);
  };

  return (
    <LayoutWrapper>
      <div style={{ paddingTop: 20 }}>
        <Row>
          <Col span={5}>
            <Menu
              style={{ width: "100%", marginTop: 40 }}
              mode="inline"
              defaultSelectedKeys={["4"]}
            >
              <Menu.Item key="1">
                <Link to="/">Events</Link>
              </Menu.Item>
              {user ? (
                user.user.role === "USER" ? (
                  <>
                    <Menu.Item key="2">
                      <Link to="/my-events">My events</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to="/recommendations">Recommended Events</Link>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Divider />
                    <Menu.Item key="4">
                      <Link to="/add-event">Add event</Link>
                    </Menu.Item>
                  </>
                )
              ) : null}
            </Menu>
          </Col>
          <Col span={19} style={{ paddingLeft: 25 }}>
            <h2>NEW EVENT</h2>
            <div style={{ width: "70%" }}>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input event title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input event description!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input event address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input event date!",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select category!",
                    },
                  ]}
                >
                  <Select style={{ width: 120 }}>
                    {categoryList.length &&
                      categoryList.map((list) => (
                        <Option key={list._id} value={list._id}>
                          {list.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    {isLoading ? <Spin /> : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </LayoutWrapper>
  );
}

export default NewEvent;
