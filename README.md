# TeamifiedLEPRSVPFE
Teamified Local Event Planner &amp; RSVP Tracker Frontend


The application is built using Reactjs and TypeScript to promote type-safe development. Its structure and styling are designed with Tailwind CSS.

NOTE : Frontend is running in : http://localhost:5174/

Available URLS--
Public Event Page                                        http://localhost:5174/
Login Page                                               http://localhost:5174/login
User Created Event Page (Should be logged in)            http://localhost:5174/events
Event Create / Update Page(Should be logged in)          http://localhost:5174/addUpdateEvent/:id?
Error Page                                               http://localhost:5174/error




In this exam, I created seperate pages to handle each functionality. Also created reusable components that can be use in the application. Pages are wrapped in a context that lets me access the methods and states anywhere in the code to avoid prop drilling. TypeScript is used throughout the application to ensure type safety and catch potential errors during development. Also, any successful and failed operation toast message will be shown.


1. Upon starting the application, you will landed in the Public Event Page that let's you browse on the available listed events.
2. Public Event Page.

    Event card information : 
        - Event Name
        - Date
        - Time
        - Location
        - Description
        - Current Reservation / Max Reservation
        - Name of event creator
        - Delete/Update buttons (Should be logged in and in User Created Event Page)
        - RSPV Button (Should be logged in and event is still not full)
        - Info (Reservation Info , Event Status , Anonymous message) 

    If browsing anonymously : Available events you can join will have a message of "Login to RSVP" to encourage you to "log in" in order to do a Reservation.
                              Login button is available on top-right hand side of the application and will take you to login page
                                                     
    If browsing with account: RSVP button is visible only for events with available slots.
                              Once you click the RSVP button, a message saying “🎉 You’re in! Your reservation is confirmed.” will appear on the event card to notify you that your reservation has been successfully submitted.
                              You will see on top-center part there's a "Welcome , [username]"
                              The username is persisted throughout the entire application using a state variable in the UserContext. Even after a page refresh, it remains available because it is also stored in localStorage. It will only be cleared when the user logs out.

    Events that are already full will be grayed out and will show "🚫 Event Full – RSVPs Closed" Message. 
    Events are filtered, Past events will not be shown.
     
3. Log in Page.

    No additional validations are performed here — simply enter your username and an API call will be made to the AuthController.

        Note: The AuthController only returns the submitted username to simulate an authentication API. In a real-world scenario, this would return a JWT token used to access [Authorize]-protected endpoints.
    
    Once you Logged in you will be redirected to User Created Event List Page

4. User Created Event List Page
    
    On top Center, Message of "Logged in as : [username]" is visible and a [Log out] button is available beside it.
    Add New Event button is available, Once clicked you will be redirected to Add/Update Event Page
    View Public Events link is available and will redirect you to Public Event List Page

    NOTE: Events here are filtered by the logged in users, Past events will not be shown.
          Update button is visible and will take you to Add/Update Event Page populating the fields based on the clicked event card
          Delete button is visible that will hard delete an event.
    
5. Add/Edit Event Page

    Create Event / Update Event will be shown, depends what is the operation the user will do.
    On top Center, Message of "Logged in as : [username]" is available

    Form Fields 
        Event Naame
        Event Date
        Event Time
        Location
        Description
        Max RSVPs

    NOTE : Save button will be disabled until all fields are populated
           Date and time validation is implemented — users cannot select a past date. An error message will appear above the Save button if an invalid date is selected.
           
6. Error Page

    anonymous user will be redirected here if trying to access [User Created Event List Page] and [Public Event Page.]



Items that can be added if there's still time.

1. Pagination
2. Cancel Reservation
3. [Notification tab] keep you notify if events you signed is approaching
4. Test
5. Responsive styling