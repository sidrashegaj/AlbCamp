import { Review } from "./review.model";

export interface Campground {
  name: any;
  campgroundId : number;
  title: string;
  description: string;
  location: string;
  images: { url: string, filename: string }[];  // Ensure both 'url' and 'filename'
  price: number;  // Add price if missing
  author: {       // Ensure author is defined
    _id: number;
    username: string;
  };
  reviews?: Review[];  // Add reviews if they exist
  geometry: {
    coordinates: number[]; // Array with [longitude, latitude]
  };
}
