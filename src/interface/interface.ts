export interface Bar {
    name: string;
    lat: number;
    lng: number;
    drinks: {
      [key: string]: number;
    };
    open_hours: string | {
      Monday?: string;
      Tuesday?: string;
      Wednesday?: string;
      Thursday?: string;
      Friday?: string;
      Saturday?: string;
      Sunday?: string;
    };
    ad?: {
      offer: string;
      timeRange: string;
    };
  }

export interface Ad {
    name: string;
    lat: number;
    lng: number;
    offer: string;
    timeRange: string;
  }