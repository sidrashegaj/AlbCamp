import { Review } from "./review.model";

export interface Campground {
  name: any;
  campgroundId : number;
  title: string;
  description: string;
  location: string;
  images: { url: string, filename: string }[]; 
  price: number;  
  author: {       
    _id: number;
    username: string;
  };
  reviews?: Review[];  
  geometry: {
    coordinates: number[]; 
  };
}
