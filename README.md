# TeamifiedLEPRSVPFE
<p>Teamified Local Event Planner &amp; RSVP Tracker Frontend</p>
<p>TeamifiedLEPRSVPBE Link : https://github.com/iamyeetz/TeamifiedLEPRSVPBE.git</p>

The application is built using <strong>Reactjs</strong> and <strong>TypeScript</strong> to promote type-safe development. Its structure and styling are designed with <strong>Tailwind CSS</strong>.
NOTE : Frontend is running in : <strong>http://localhost:5174/</strong>

<pre>
<h3>Instruction</h3>
1. Clone the code
2. If not on the project folder on terminal run :  <strong>cd TeamifiedLEPRSVPFE</strong>
3. On the root folder of TeamifiedLEPRSVPFE open terminal and run : <strong>npm install</strong>
4. After installing all libraries and initializing the project check and make sure API Project is running on https://localhost:7038/api 
    in order to call the enpoints properly, if you need to run it on other port just change it on 
    <strong>apiConfig.ts ➜ export const API_URL = "https://localhost:7038/api";</strong>
5.  run the command to run the frontend :  <strong>npm run dev</strong>
    make sure on terminal it will show   ➜  Local:   http://localhost:5174/

NOTE : if for some reason you changed vite.config.js  ➜  server: {port: 5174,} you also need to update the CORS setup on project.cs ➜ policy.WithOrigins("http://localhost:5174")
</pre>



<pre>
<strong>Available URLS--</strong>
<strong>Public Event Page</strong>                                        http://localhost:5174/
<strong>Login Page</strong>                                               http://localhost:5174/login
<strong>User Created Event Page (Should be logged in)</strong>            http://localhost:5174/events
<strong>Event Create / Update Page(Should be logged in)</strong>          http://localhost:5174/addUpdateEvent/:id?
<strong>Error Page</strong>                                               http://localhost:5174/error
</pre>

In this exam, I created seperate pages to handle each functionality. Also created reusable components that can be use in the application. Pages are wrapped in a context that lets me access the methods and states anywhere in the code to avoid prop drilling. TypeScript is used throughout the application to ensure type safety and catch potential errors during development. Also, any successful and failed operation toast message will be shown.


1. Upon starting the application, you will landed in the Public Event Page that let's you browse on the available listed events.
2. <strong>Public Event Page.</strong>

<pre>
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
</pre>
<div>
    <strong>If browsing anonymously</strong> 
    <ul>
    <li>Available events you can join will have a message of "Login to RSVP" to encourage you to "log in" in order to do a Reservation.</li>
    <li>Login button is available on top-right hand side of the application and will take you to login page</li>
    </ul>
</div>                                                
    <strong>If browsing with account</strong>
    <ul>
    <li>RSVP button is visible only for events with available slots.</li>
    <li>Once you click the RSVP button, a message saying “🎉 You’re in! Your reservation is confirmed.” will appear on the event card to notify you that your reservation has been successfully submitted.</li>
    <li>You will see on top-center part there's a "Welcome , [username]"</li>
    <li>The username is persisted throughout the entire application using a state variable in the UserContext. Even after a page refresh, it remains available because it is also stored in localStorage. It will only be cleared when the user logs out.</li>
    </ul>

    Events that are already full will be grayed out and will show "🚫 Event Full – RSVPs Closed" Message. 
    Events are filtered, Past events will not be shown.
   
3. <strong>Log in Page.</strong>

    No additional validations are performed here — simply enter your username and an API call will be made to the AuthController.

    Note: The AuthController only returns the submitted username to simulate an authentication API. In a real-world scenario, this would return a JWT token used to access [Authorize]-protected endpoints.
    
    Once you Logged in you will be redirected to User Created Event List Page

4. <strong>User Created Event List Page</strong>
    
    <ul>
    <li>On top Center, Message of "Logged in as : [username]" is visible and a [Log out] button is available beside it.
    <li>Add New Event button is available, Once clicked you will be redirected to Add/Update Event Page
    <li>View Public Events link is available and will redirect you to Public Event List Page
    </ul>

    <pre>NOTE: Events here are filtered by the logged in users, Past events will not be shown.
          Update button is visible and will take you to Add/Update Event Page populating the fields based on the clicked event card
          Delete button is visible that will hard delete an event.</pre>
    
5. <strong>Add/Edit Event Page</strong>

    Create Event / Update Event will be shown, depends what is the operation the user will do.
    On top Center, Message of "Logged in as : [username]" is available

<pre>
    <strong>Form Fields</strong> 
        Event Naame
        Event Date
        Event Time
        Location
        Description
        Max RSVPs
</pre>

    NOTE : Save button will be disabled until all fields are populated
           Date and time validation is implemented — users cannot select a past date. An error message will appear above the Save button if an invalid date is selected.
           
6. <strong>Error Page</strong>

    anonymous user will be redirected here if trying to access [User Created Event List Page] and [Public Event Page.]



Items that can be added if there's still time.

1. Pagination
2. Cancel Reservation
3. [Notification tab] keep you notify if events you signed is approaching
4. Modal for Event Creation Confirmation
4. Test
5. Responsive styling
