import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const { Header, Content } = Layout;

const LayoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="title-logo">
            <Link to="/">TechEventsUK</Link>
          </div>

          {user ? (
            <Button key="1" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <ul className="nav">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </Header>
      <Content style={{ padding: "0 60px", margin: 64 }}>{children}</Content>
    </Layout>
  );
};

export default LayoutWrapper;
