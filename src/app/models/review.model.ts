import { Campground } from './campground.model';
import { User } from './users.model';

export interface Review {
  reviewId: number;        
  text: string;             
  timestamp: Date;          
  userId: number;           
  user?: User;              
  campgroundId: number;     
  campground?: Campground;  
  rating: number;           
}
