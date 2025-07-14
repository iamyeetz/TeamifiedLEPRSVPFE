import React, { useContext, useEffect } from "react";
import { EventCardProps } from "../models/Event";
import UserContext from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
const EventCard = ({ event, handleDelete, handleRSVP }: EventCardProps) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isEventListPage = location.pathname === "/events";
  const navigate = useNavigate();

  // to ensure proper formatting of cards, any long data will be cut and will be available for tooltip display
  const handleLongText = (text: string, allowedchar: number) => {
    const shortened =
      text.length > allowedchar ? text.substring(0, allowedchar) + ".." : text;
    return shortened;
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    if (event.eventId) {
      handleDelete?.(event.eventId);
    }
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    navigate(`/addUpdateEvent/${event.eventId}`);
  };

  const handleClickRSVP = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/error");
      return;
    }
    if (event.eventId) {
      handleRSVP?.(event.eventId, user);
    }
  };

  // validations for conditional rendering of elements
  const hasLoginUser = user ? true : false;
  const isEventFull = event.currentReservations === event.maxReservationNumber;
  const hasUserReserved = event.reservations?.includes(user);
  const isOnUserCreatedEventListPage = isEventListPage;
  const canRSVP = !isOnUserCreatedEventListPage && !isEventFull;
  const isAnonymousTryingToRSVP = !hasLoginUser && canRSVP;
  const isLoggedInCanRSVP = hasLoginUser && canRSVP;
  const isUserReservedOutsideUserCreatedEventListPage =
    hasUserReserved && !isOnUserCreatedEventListPage;

  return (
    <div
      className={`shadow-xl ${
        event.currentReservations === event.maxReservationNumber &&
        !isEventListPage
          ? " bg-gray-200"
          : " bg-white hover:border-gray-700"
      } text-gray-800 px-5 pt-5 rounded-md w-50 sm:w-60 border-1 border-gray-300 `}
    >
      <div className="relative group inline-block h-15">
        <h3 className="text-lg font-semibold mb-2">
          {handleLongText(event.eventName, 30)}
        </h3>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 mt-2 w-auto max-w-[300px] break-words py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {event.eventName}
        </div>
      </div>

      <div className="flex flex-col items-start h-50 max-h-60 gap-2">
        <p className="text-sm mb-1">
          <span className="font-medium">Date:</span> {event.eventCompleteDate}
        </p>
        <p className="text-sm mb-1">
          <span className="font-medium">Time:</span> {event.eventTime}
        </p>
        <div className="relative group inline-block">
          <p className="text-sm mb-3">
            <span className="font-medium">Location:</span>{" "}
            {handleLongText(event.location, 14)}
          </p>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 mt-2 w-auto max-w-[300px] break-words px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {event.location}
          </div>
        </div>
        <div className="relative group inline-block">
          <p className="text-sm mb-3">
            <span className="font-medium">Description:</span>{" "}
            {handleLongText(event.description, 14)}
          </p>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 mt-2 w-auto max-w-[300px] break-words px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {event.description}
          </div>
        </div>
        <p className="text-sm font-semibold mx-5 self-center">
          RSVPs: {event.currentReservations}/{event.maxReservationNumber}
        </p>
        {!isEventListPage && (
          <p className="text-sm font-semibold self-center">
            Created By: {event.createdBy}
          </p>
        )}
      </div>

      <div>
        {user && isEventListPage && (
          <div className="flex justify-around">
            <button
              onClick={handleClickEdit}
              className="border-2 border-gray-300 rounded-md py-1 px-3"
            >
              Update
            </button>
            <button
              onClick={handleClickDelete}
              className="border-2 border-gray-300 rounded-md py-1 px-3"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="m-4">
        {isEventFull && !hasUserReserved && !isOnUserCreatedEventListPage ? (
          <strong>🚫 Event Full – RSVPs Closed</strong>
        ) : (
          <></>
        )}
        {hasLoginUser && isUserReservedOutsideUserCreatedEventListPage ? (
          <strong>🎉 You’re in! Your reservation is confirmed.</strong>
        ) : (
          <></>
        )}
        {isAnonymousTryingToRSVP && (
          <span className="text-red-500 font-semibold text-sm">
            Login to RSVP
          </span>
        )}
        {isLoggedInCanRSVP && !hasUserReserved && (
          <button
            onClick={handleClickRSVP}
            className="h-12 w-30 rounded-2xl border-2 border-gray-300 text-sm font-semibold"
          >
            RSVP
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
