import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { EventFormData, Event } from "../models/Event";
import EventContext from "../context/EventContext";

const AddEditEventPage = () => {
  const { user } = useContext(UserContext);
  const { saveEvent, getEventById } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();

  //states
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<EventFormData>({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxReservationNumber: 0,
    createdBy: user ?? "",
    eventDate: "",
    eventId: null,
  });

  //form completion validation
  const isFormIncomplete =
    !formData.eventName ||
    !formData.date ||
    !formData.time ||
    !formData.location ||
    !formData.description ||
    !formData.maxReservationNumber;

  useEffect(() => {
    if (!user) {
      navigate("/error");
      return;
    }

    const getEventInfo = async () => {
      if (id != null) {
        const eventInfo: Event | undefined = await getEventById(+id);

        if (eventInfo) {
          setFormData({
            ...formData,
            eventName: eventInfo.eventName,
            location: eventInfo.location,
            description: eventInfo.description,
            maxReservationNumber: eventInfo.maxReservationNumber,
            date: eventInfo.eventCompleteDate,
            time: eventInfo.eventTime,
            eventId: +id,
          });
        }
      }
    };

    getEventInfo();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isValidInput = validateInput(name, value);
    if (isValidInput) {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "maxReservationNumber" ? +value : value,
      }));
    }
  };

  const validateInput = (field: string, value: any) => {
    let error: string = "";
    if (field == "date") {
      error = "Date cannot be in the past.";
      const input = new Date(value).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      if (input >= today) {
        removeError(error);
        error = "";
      }
    }
    if (field == "time") {
      error = "Time cannot be in the past.";
      const [hours, minutes] = value.split(":").map(Number);
      const input = new Date();
      input.setHours(hours);
      input.setMinutes(minutes);
      input.setSeconds(0);
      input.setMilliseconds(0);
      const today = new Date();
      if (input >= today) {
        removeError(error);
        error = "";
      }
    }

    if (!errors.includes(error)) {
      addError(error);
    }
    return error == "" ? true : false;
  };

  const addError = (msg: string) => {
    setErrors((prev) => (prev.includes(msg) ? prev : [...prev, msg]));
  };

  const removeError = (msg: string) => {
    setErrors((prev) => prev.filter((e) => e !== msg));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveEvent(formData);
    navigate("/events");
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <div className="max-w-md mx-auto border border-gray-300 rounded-lg p-6 bg-white shadow">
      <h1 className="text-center text-xl font-semibold mb-2">Event Planner</h1>
      <h2 className="text-center text-lg font-bold mb-1">
        {id == null ? "Create Event" : "Edit Events"}
      </h2>
      <p className="text-sm text-center mb-4">
        <span>Logged in as : </span>
        <strong>{user}</strong>
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        />

        <div className="space-y-1">
          <label className="text-sm">Date</label>
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              type="date"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-1/2"
              name="date"
              value={formData.date}
            />
            <input
              onChange={handleChange}
              type="time"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-1/2"
              name="time"
              value={formData.time}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={formData.location}
        />

        <textarea
          placeholder="Description"
          name="description"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          rows={3}
          value={formData.description}
        />

        <div>
          <label className="text-sm block mb-1">Max RSVPs:</label>
          <input
            type="number"
            name="maxReservationNumber"
            onChange={handleChange}
            min={0}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={formData.maxReservationNumber}
          />
        </div>
        <div className="text-red-500 font-semibold text-[12px]">
          {errors.map((x) => (
            <p>{x}</p>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className={`bg-blue-600 text-white font-semibold px-4 py-2 rounded ${
              isFormIncomplete
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={handleSave}
            disabled={isFormIncomplete}
          >
            Save Event
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="border border-gray-400 px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditEventPage;
