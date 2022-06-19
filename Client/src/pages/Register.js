import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { register, reset } from "../features/auth/authSlice";
import { openNotificationWithIcon } from "../utils/Notification";
import LayoutWrapper from "../components/LayoutWrapper";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon("error", message);
    }

    if (isSuccess || user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      openNotificationWithIcon("error", "passwords dont match");
    } else {
      dispatch(
        register({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    openNotificationWithIcon("error", errorInfo);
  };

  return (
    <LayoutWrapper>
      <div className="wrapper">
        <h2 style={{ textAlign: "center", paddingBottom: 10 }}>Register</h2>
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
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {isLoading ? <Spin /> : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutWrapper>
  );
}

export default Register;
