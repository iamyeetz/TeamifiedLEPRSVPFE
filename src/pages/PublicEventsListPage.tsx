import  { useContext } from "react";
import EventCard from "../components/EventCard";
import EventContext from "../context/EventContext";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
const PublicEventsListPage = () => {
  const { user, logout } = useContext(UserContext);
  const { events, processReservation } = useContext(EventContext);


  const handleRSVP = (id: number,user:string) => {
    processReservation(id,user);
  }

  return (
    <div className="bg-gray-200 h-auto max-w-7xl p-5 rounded-xl min-w-[300px] min-h-[600px]">
      <div className="flex items-baseline-last justify-between mx-2 my-5">
        <h2 className="text-2xl text-gray-700">Public Events</h2>
        {!user ? (
          <a href="/login">Log in</a>
        ) : (
          <>
            <span className="text-gray-700">
              Welcome,
              <strong>{user}</strong>
            </span>
            <div className="flex gap-3 font-semibold text-gray-600">
              <Link to="/events">
                <p className="hover:text-gray-900">My Events</p>
              </Link>
              <Link
                className="font-semibold text-red-500 text-[12px] mt-1 hover:text-red-700"
                onClick={() => logout()}
                to="/login"
              >
                [Log Out]
              </Link>
            </div>
          </>
        )}
      </div>
      {(events || []).length > 0 ? (
        <div className="mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(events || []).map((item) => (
            <EventCard event={item}  handleRSVP={handleRSVP} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-40">
          No public events are available at the moment. Please check back later.
        </p>
      )}

    </div>
  );
};

export default PublicEventsListPage;
