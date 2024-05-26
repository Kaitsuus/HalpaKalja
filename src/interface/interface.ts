interface DailyDetails {
  hours: string;
  offer: string;
}

export interface Bar {
  id: string;
  name: string;
  lat: number;
  lng: number;
  drinks: {
    [key: string]: number;
  };
  open_hours: {
    Monday?: DailyDetails;
    Tuesday?: DailyDetails;
    Wednesday?: DailyDetails;
    Thursday?: DailyDetails;
    Friday?: DailyDetails;
    Saturday?: DailyDetails;
    Sunday?: DailyDetails;
  };
  verified: boolean | null;
}

export interface Ad {
  name: string;
  lat: number;
  lng: number;
  offer: string;
  timeRange: string;
}

// Example usage:
const barExample: Bar = {
  id: "12312309434-3423423",
  name: "Bar Helsinki",
  lat: 60.1695,
  lng: 24.9354,
  drinks: {
    Beer: 5.5,
    Wine: 7.0,
    Cocktail: 10.0
  },
  open_hours: {
    Monday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Tuesday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Wednesday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Thursday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Friday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Saturday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    },
    Sunday: {
      hours: "10:00-22:00",
      offer: "Alwayssomething"
    }
  },
  verified: true
};
