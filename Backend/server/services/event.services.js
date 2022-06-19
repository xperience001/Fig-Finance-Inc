import Event from "../model/event.model";
import User from "../model/user.model";

export async function addEvent(data) {
  try {
    return await Event.create(data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllEvents(query) {
  try {
    const { perPage, page, search, isVirtual } = query;
    const limit = parseInt(perPage, 10) || 15;
    const currentPage = parseInt(page, 10) || 1;
    let params = {};

    if (search && isVirtual) {
      params = {
        $and: [{ isVirtual }, { title: { $regex: ".*" + search + ".*" } }],
      };
    } else if (search) {
      params = { title: { $regex: ".*" + search + ".*" } };
    } else if (isVirtual) {
      params = { isVirtual: isVirtual };
    }

    const count = await Event.countDocuments(params);
    const events = await Event.find(params)
      .select("-createdAt -updatedAt -__v")
      .populate("category", { name: 1, _id: 0 })
      .limit(limit)
      .skip(limit * (currentPage - 1))
      .sort({ createdAt: -1 });

    return {
      events,
      pageDetails: {
        perPage: limit,
        page: currentPage,
        totalPages: Math.ceil(count / limit),
        totalCount: count,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getEvent(id, res) {
  try {
    const event = await Event.findById(id)
      .select("-createdAt -updatedAt")
      .populate("category", "name");
    if (!event) {
      res.status(400);
      throw new Error("event not found");
    }

    return {
      _id: event._id,
      title: event.title,
      description: event.description,
      isVirtual: event.isVirtual,
      address: event.address,
      date: event.date,
      category: event.category.name,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeEvent(id, res) {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      res.status(400);
      throw new Error("event not found");
    }
    return event;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateEvent(body, id, res) {
  try {
    const { title, description, isVirtual, address, date, category } = body;
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        isVirtual,
        address,
        date,
        category,
      },
      { new: true }
    );

    if (!event) {
      res.status(400);
      throw new Error("event not found");
    }

    return event;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveEvent(userId, eventId, res) {
  try {
    const event = await Event.findById(eventId).select("_id");
    if (!event) {
      res.status(400);
      throw new Error("event not found");
    }

    const user = await User.findById(userId);
    let userEvents = [];

    if (user.events.includes(eventId)) {
      userEvents = user.events.filter(
        (userEventId) => userEventId.toString() !== eventId
      );
    } else {
      userEvents = [...user.events, eventId];
    }

    return await user.updateOne({ events: userEvents });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserRecommendedEvents(userId, query) {
  try {
    const userEvents = await User.findById(userId)
      .populate({
        path: "events",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .select({
        events: 1,
        _id: 0,
      });

    const eventIds = [];
    const eventCategoryIds = [];

    userEvents.events.forEach((events) => {
      eventIds.push(events.id);
      eventCategoryIds.push(events.category.id);
    });

    const { perPage, page } = query;
    const limit = parseInt(perPage, 10) || 15;
    const currentPage = parseInt(page, 10) || 1;

    const params = {
      _id: { $nin: eventIds },
      category: { $in: eventCategoryIds },
    };

    const count = await Event.countDocuments(params);
    const events = await Event.find(params)
      .select("-createdAt -updatedAt -__v")
      .populate("category", { name: 1, _id: 0 })
      .limit(limit)
      .skip(limit * (currentPage - 1));

    return {
      events,
      pageDetails: {
        perPage: limit,
        page: currentPage,
        totalPages: Math.ceil(count / limit),
        totalCount: count,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUsersEvents(userId, query) {
  try {
    const userEvents = await User.findById(userId)
      .populate({
        path: "events",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .select({
        events: 1,
        _id: 0,
      });

    return userEvents;
  } catch (error) {
    throw new Error(error);
  }
}
