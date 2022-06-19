import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Row, Col, Menu, Divider } from "antd";
import { getMyEvents, reset } from "../features/event/eventSlice";
import { openNotificationWithIcon } from "../utils/Notification";
import LayoutWrapper from "../components/LayoutWrapper";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import { Link, useNavigate } from "react-router-dom";

function MyEvent() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const { myEvents, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.event
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getMyEvents());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon("error", message);
    }

    if (isSuccess && myEvents) {
      const { events } = myEvents;
      setEventList(events);
    }

    dispatch(reset());
  }, [myEvents, isError, isSuccess, message, dispatch]);

  const handleOpenModal = (event) => {
    setEvent(event);
    setOpenModal((prev) => !prev);
  };

  return (
    <LayoutWrapper>
      <div style={{ paddingTop: 20 }}>
        <Row>
          <Col span={5}>
            <Menu
              style={{ width: "100%", marginTop: 40 }}
              mode="inline"
              defaultSelectedKeys={["2"]}
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
                    <Menu.Item key="4">Add Event</Menu.Item>
                  </>
                )
              ) : null}
            </Menu>
          </Col>
          <Col span={19} style={{ paddingLeft: 10 }}>
            <h2>My EVENTS</h2>
            <div>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Row gutter={[16, 16]}>
                  {eventList && eventList.length ? (
                    eventList.map((event) => (
                      <EventCard
                        key={event._id}
                        id={event._id}
                        title={event.title}
                        description={event.description}
                        category={event.category.name}
                        date={event.date}
                        showModal={() => handleOpenModal(event)}
                      />
                    ))
                  ) : (
                    <h1 style={{ paddingLeft: 10 }}>No Event(s) Saved</h1>
                  )}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <EventModal
        visible={openModal}
        content={event}
        handleCancel={handleOpenModal}
      />
    </LayoutWrapper>
  );
}

export default MyEvent;
