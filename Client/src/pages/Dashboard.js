import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Pagination, Row, Col, Menu, Divider } from "antd";
import {
  getAllEvents,
  removeEvent,
  saveEvent,
  reset,
} from "../features/event/eventSlice";
import { openNotificationWithIcon } from "../utils/Notification";
import LayoutWrapper from "../components/LayoutWrapper";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import { Link } from "react-router-dom";

function Dashboard() {
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    perPage: 10,
    totalCount: 1,
    totalPages: 1,
  });

  const dispatch = useDispatch();

  const { events, isLoading, isSaving, isError, isSuccess, message } =
    useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllEvents(pageDetails));
  }, [dispatch, isSaving, pageDetails.page, pageDetails.perPage]);

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon("error", message);
    }

    if (!isError && message) {
      openNotificationWithIcon("info", message);
    }

    if (isSuccess && events) {
      const { events: list, pageDetails } = events;
      setEventList(list);
      setPageDetails(pageDetails);
    }

    dispatch(reset());
  }, [events, isError, isSuccess, isSaving, message, dispatch]);

  const handleChange = (page) => {
    setPageDetails((prev) => ({ ...prev, page, perPage: pageDetails.perPage }));
  };

  const handleOpenModal = (event) => {
    setEvent(event);
    setOpenModal((prev) => !prev);
  };

  const handleDelete = (eventId) => {
    dispatch(removeEvent(eventId));
  };

  const onSaveEvent = (event) => {
    dispatch(saveEvent({ event }));
  };

  return (
    <LayoutWrapper>
      <div style={{ paddingTop: 20 }}>
        <Row>
          <Col span={5}>
            <Menu
              style={{ width: "100%", marginTop: 40 }}
              mode="inline"
              defaultSelectedKeys={["1"]}
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
          <Col span={19} style={{ paddingLeft: 10 }}>
            <h2>EVENTS</h2>
            <div>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Row gutter={[16, 16]}>
                  {eventList && eventList.length
                    ? eventList.map((event) => (
                        <EventCard
                          key={event._id}
                          id={event._id}
                          title={event.title}
                          description={event.description}
                          category={event.category.name}
                          date={event.date}
                          user={user ? user.user : {}}
                          showModal={() => handleOpenModal(event)}
                          handleDelete={() => handleDelete(event._id)}
                          handleSave={() => onSaveEvent(event._id)}
                          loading={isSaving}
                        />
                      ))
                    : null}
                  {pageDetails.totalPages > 1 ? (
                    <Pagination
                      defaultCurrent={pageDetails.page}
                      total={pageDetails.totalCount}
                      showTotal={() => `${pageDetails.totalCount} Events`}
                      onChange={handleChange}
                      defaultPageSize={pageDetails.perPage}
                    />
                  ) : null}
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

export default Dashboard;
