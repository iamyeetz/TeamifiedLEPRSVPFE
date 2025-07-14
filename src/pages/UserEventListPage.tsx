import React, { useContext, useEffect } from "react";
import EventCard from "../components/EventCard";
import EventContext from "../context/EventContext";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const UserEventListPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const { userCreatedEvents, getEventsByUser, deleteEvent } =
    useContext(EventContext);

  const handleDelete = async (id: number) => {
    if (!user) {
      return;
    }
    await deleteEvent(id, user);
  };

  useEffect(() => {
    //redirect to error page if anonymous user accessed this page
    if (!user) {
      navigate("/error");
      return;
    }
    getEventsByUser(user);
  }, []);

  return (
    <div className="bg-gray-200 min-w-[300px] min-h-[600px] max-w-7xl p-5 rounded-xl">
      <div className="flex flex-col gap-3 text-gray-700 items-center">
        <h2 className="text-2xl text-gray-700">Event Planner</h2>
        <div className="flex gap-3 items-center justify-center">
          <div>
            <span>Logged in as : </span>
            <strong>{user}</strong>
          </div>
          <Link
            className="font-semibold text-red-500 text-[12px] mt-1 hover:text-red-700"
            onClick={() => logout()}
            to="/login"
          >
            [Log Out]
          </Link>
        </div>
        <div>
          <Link className="bg-gray-100 w-30 p-2 text-xs font-semibold text-gray-600 rounded-xl border-2 border-gray-300 hover:border-black" to="/addUpdateEvent">
              Add New Event
          </Link>
          <Link className="w-30 p-2 text-xs font-semibold text-gray-600  hover:text-gray-900" to="/">
              View Public Events
          </Link>
        </div>
      </div>
      {(userCreatedEvents || []).length > 0 ? (
        <div className="mx-5 grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {(userCreatedEvents || []).map((item) => (
            <EventCard event={item} handleDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-40">
          Looks empty here... Let’s plan your first event! 🎉
        </p>
      )}
    </div>
  );
};

export default UserEventListPage;
