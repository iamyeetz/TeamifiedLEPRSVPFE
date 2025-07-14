import {
  Event,
  EventContextType,
  EventFormData,
  EventPayload,
  ProcessReservationPayload,
} from "../models/Event";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { showError, showSuccess } from "../utils/ToastHelper";
const API_URL = "https://localhost:7038/api";

const EventContext = createContext<EventContextType>({} as EventContextType);
export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[] | null>([]);
  const [userCreatedEvents, setUserCreatedEvents] = useState<Event[] | null>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const saveEvent = async (eventForm: EventFormData) => {
    //Formatting date and time that will be passed in BE
    let eventDateFormatted = new Date(eventForm.date);
    const [hours, minutes] = eventForm.time.split(":").map(Number);
    eventDateFormatted.setHours(hours);
    eventDateFormatted.setMinutes(minutes);

    //Creating payload object since EventFormData has properties that BE Dto doenst need
    const payload: EventPayload = {
      eventId: eventForm.eventId ?? null,
      createdBy: eventForm.createdBy,
      eventDate: eventDateFormatted.toString(),
      description: eventForm.description,
      eventName: eventForm.eventName,
      location: eventForm.location,
      maxReservationNumber: eventForm.maxReservationNumber,
    };

    //Checking if its Create or Update
    if (eventForm.eventId != null) {
      try {
        await axios.put(`${API_URL}/event/UpdateEvent`, payload);
        showSuccess("Event updated successfully.");
        await getEvents(currentPage);
        await getEventsByUser(eventForm.createdBy);
      } catch {
        showError();
      }
    } else {
      try {
        await axios.post(`${API_URL}/event/AddEvent`, payload);
        showSuccess("Event created successfully.");
        await getEvents(currentPage);
        await getEventsByUser(eventForm.createdBy);
      } catch {
        showError();
      }
    }
  };

  const deleteEvent: (id: number, user: string) => Promise<void> = async (
    id,
    user
  ) => {
    try {
      await axios.delete(`${API_URL}/event/DeleteEvent/${id}`);
      showSuccess("Event deleted successfully.");
      await getEvents(currentPage);
      await getEventsByUser(user);
    } catch {
      showError();
    }
  };

  const processReservation: (
    id: number,
    user: string
  ) => Promise<void> = async (id, user) => {
    const payload: ProcessReservationPayload = {
      eventId: id,
      username: user,
    };
    try {
      await axios.patch(`${API_URL}/event/ProcessReservation`, payload);
      showSuccess("Successfully processed your reservation.");
      await getEvents(currentPage);
      await getEventsByUser(user);
    } catch {
      showError();
    }
  };
  const getEvents = async (page: number) => {
    try {
      const response = await axios.get(`${API_URL}/event/getEvents`, {
        params: {
          size: pageSize,
          page: page,
        },
      });
      setEvents(response.data);
    } catch {
      showError();
    }
  };
  const getEventsByUser = async (user: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/event/GetEventsByUserAsync/${user}`,
        {
          params: {
            size: pageSize,
            page: currentPage,
          },
        }
      );
      setUserCreatedEvents(response.data);
    } catch {
      showError();
    }
  };
  useEffect(() => {
    getEvents(currentPage);
  }, []);

  const getEventById = async (id: number): Promise<Event | undefined> => {
    try {
      const result = await axios.get(
        `${API_URL}/event/GetEventsByIdAsync/${id}`
      );
      return result.data;
    } catch {
      showError();
    }
  };
  return (
    <EventContext.Provider
      value={{
        events,
        userCreatedEvents,
        setCurrentPage,
        saveEvent,
        deleteEvent,
        processReservation,
        getEventsByUser,
        getEventById,
        getEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
