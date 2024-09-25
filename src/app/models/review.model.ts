import { Campground } from './campground.model';
import { User } from './users.model';

export interface Review {
  reviewId: number;         // Review ID matches backend
  text: string;             // Review text
  timestamp: Date;          // Timestamp for when the review was created
  userId: number;           // Foreign key to the user who posted the review
  user?: User;              // Optional: User object if you need to display user details
  campgroundId: number;     // Foreign key to the reviewed campground
  campground?: Campground;  // Optional: Campground object if needed
  rating: number;           // Rating (between 1 and 5)
}
