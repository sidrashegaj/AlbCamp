export interface Campground {
  campgroundId : number;
  title: string;
  description: string;
  location: string;
  images: { url: string }[];
  price: number;  // Add price if missing
  author: {       // Ensure author is defined
    _id: string;
    username: string;
  };
  reviews: Review[];  // Add reviews if they exist
  geometry: {
    coordinates: number[]; // Array with [longitude, latitude]
  };
}

export interface Review {
  reviewId: number;
  campgroundId : number;
  rating: number;
  body: string;
  author: {
    _id: string;
    username: string;
  };
}
