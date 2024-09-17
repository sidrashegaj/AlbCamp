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
}

export interface Review {
  campgroundId : number;
  rating: number;
  body: string;
  author: {
    _id: string;
    username: string;
  };
}
