import express from "express";
import EventController from "../controllers/event.controller";
import { isLoggedIn, isAdmin } from "../middlewares/authenticate";
import { addEventValidator } from "../middlewares/events.middleware";

const eventRouter = express.Router();

eventRouter.post(
  "/events",
  isLoggedIn,
  isAdmin,
  addEventValidator,
  EventController.addEventHandler
);
eventRouter.get("/events", EventController.getAllEventsHandler);
eventRouter.get(
  "/events/recommendations",
  isLoggedIn,
  EventController.getRecommendedEventsHandler
);
eventRouter.get("/events/:id", EventController.getEventHandler);
eventRouter.delete(
  "/events/:id",
  isLoggedIn,
  isAdmin,
  EventController.deleteEventHandler
);
eventRouter.patch(
  "/events/:id",
  isLoggedIn,
  isAdmin,
  EventController.updateEventHandler
);
eventRouter.patch("/save-event", isLoggedIn, EventController.saveEventHandler);
eventRouter.get("/my-events", isLoggedIn, EventController.getUserEventsHandler);

export default eventRouter;
