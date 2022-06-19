import axios from "axios";

const EVENTS_URL = `${process.env.REACT_APP_API_URL}/events`;
const GET_MY_EVENTS_URL = `${process.env.REACT_APP_API_URL}/my-events`;
const SAVE_EVENTS_URL = `${process.env.REACT_APP_API_URL}/save-event`;
const RECOMMENDED_EVENTS_URL = `${process.env.REACT_APP_API_URL}/events/recommendations`;

const getAllEvents = async (query) => {
  const { page, perPage } = query;
  const response = await axios.get(
    `${EVENTS_URL}?page=${page}&perPage=${perPage}`
  );
  return response.data.data;
};

const getMyEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(GET_MY_EVENTS_URL, config);
  return response.data.data;
};

const addEvent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(EVENTS_URL, data, config);
  return response.data.data;
};

const updateEvent = async (eventId, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${EVENTS_URL}/${eventId}`, data, config);
  return response.data.data;
};

const removeEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${EVENTS_URL}/${eventId}`, config);
  return response.data.data;
};

const saveEvent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(SAVE_EVENTS_URL, data, config);
  return response.data;
};

const getRecommendations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(RECOMMENDED_EVENTS_URL, config);
  return response.data.data;
};

const eventServices = {
  getAllEvents,
  getMyEvents,
  addEvent,
  updateEvent,
  removeEvent,
  saveEvent,
  getRecommendations,
};

export default eventServices;
