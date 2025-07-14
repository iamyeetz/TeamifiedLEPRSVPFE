// import React, { useContext } from "react";
// import EventContext from "../context/EventContext";
// const PageNavigation = ({ isFromPublic }) => {
//   const { getEvents, getEventsByUser, setCurrentPage } =
//     useContext(EventContext);
//   const spanClass = "hover:cursor-pointer hover:text-gray-700";

//   const handlePrevClick = () => {
//     setCurrentPage((prev) => {
//       const newPage = prev - 1;
//       getEvents(newPage);
//       return newPage;
//     });
//   };
//   const handleNextClick = () => {
//     setCurrentPage((prev) => {
//       const newPage = prev + 1;
//       getEvents(newPage);
//       return newPage;
//     });

//   };

//   return (
//     <div className="text-gray-500 flex items-center justify-center gap-5 mt-5 font-semibold">
//       <span onClick={handlePrevClick} className={`${spanClass}`}>
//         PREV
//       </span>
//       <span onClick={handleNextClick} className={`${spanClass}`}>
//         NEXT
//       </span>
//     </div>
//   );
// };

// export default PageNavigation;

//NOTE : SUPPOSED TO IMPLEMENT SIMPLE PAGINATION BUT ALREADY LACKS TIME.