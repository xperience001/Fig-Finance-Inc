import { successResponse } from "../helpers/responseUtil";
import {
  addEvent,
  getAllEvents,
  getEvent,
  removeEvent,
  updateEvent,
  getUserRecommendedEvents,
  saveEvent,
  getUsersEvents,
} from "../services/event.services";

class EventController {
  static async addEventHandler(req, res, next) {
    try {
      const response = await addEvent(req.body);
      return successResponse(res, 201, "event added", response);
    } catch (error) {
      next(error);
    }
  }

  static async getAllEventsHandler(req, res, next) {
    try {
      const { events, pageDetails } = await getAllEvents(req.query);
      return successResponse(res, 200, "Events retrieved", {
        events,
        pageDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEventHandler(req, res, next) {
    try {
      const { id } = req.params;
      const event = await getEvent(id, res);
      return successResponse(res, 200, "Event retrieved", event);
    } catch (error) {
      next(error);
    }
  }

  static async deleteEventHandler(req, res, next) {
    try {
      const { id } = req.params;
      await removeEvent(id, res);
      return successResponse(res, 200, id);
    } catch (error) {
      next(error);
    }
  }

  static async updateEventHandler(req, res, next) {
    try {
      const { id } = req.params;
      const response = await updateEvent(req.body, id, res);
      return successResponse(res, 200, "Event updated", response);
    } catch (error) {
      next(error);
    }
  }

  static async getRecommendedEventsHandler(req, res, next) {
    try {
      const { events, pageDetails } = await getUserRecommendedEvents(
        req.userId,
        req.query
      );
      return successResponse(res, 200, "recommendations retrieved", {
        events,
        pageDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  static async saveEventHandler(req, res, next) {
    try {
      const { event } = req.body;
      const response = await saveEvent(req.userId, event, res);
      return successResponse(res, 200, "successful", response);
    } catch (e) {
      next(e);
    }
  }

  static async getUserEventsHandler(req, res, next) {
    try {
      const response = await getUsersEvents(req.userId, req.query);
      return successResponse(res, 200, "successful", response);
    } catch (e) {
      next(e);
    }
  }
}

export default EventController;
