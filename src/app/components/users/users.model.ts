import { Workout } from '@/app/components/add-user/add-user.model';

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
  totalWorkouts: number;
  totalMinutes: number;
}
