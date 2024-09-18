export interface Review {
    reviewId: number;
    body: string;
    rating: number;  // Rating field
    timestamp: Date;
    userId: number;
    author: {
        _id: string;  
      username: string;
    };
    campgroundId: number;
  }