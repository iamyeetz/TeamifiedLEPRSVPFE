export interface EventBaseClass{
  eventId: number | null;
  eventName: string;
  location: string;
  description: string;
  maxReservationNumber: number;
  createdBy: string;
}

export interface Event extends EventBaseClass {
  eventCompleteDate: string;
  eventTime: string;
  currentReservations: number;
  reservations:string[] | null;
}

export interface EventFormData extends EventBaseClass {
  eventDate: string;
  date: string;
  time: string;
}

export interface EventPayload extends EventBaseClass {
  eventDate: string;
}


export interface ProcessReservationPayload {
  eventId : number,
  username  : string,
}


export interface EventContextType {
  events: Event[] | null;
  userCreatedEvents: Event[] | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  saveEvent: (event: EventFormData) => Promise<void>;
  deleteEvent: (id: number,username : string) => Promise<void>;
  processReservation: (id: number,username:string) => Promise<void>;
  getEventsByUser: (name: string) => Promise<void>;
  getEventById: (id: number) => Promise<Event | undefined>;
  getEvents: (page : number) => Promise<void>
}


export interface EventCardProps {
  event: Event;
  handleDelete?: (id: number) => void;
  handleRSVP?: (id:number,user : string) => void;
}


