export const workoutOptions = [
  { value: 'Yoga', viewValue: 'Yoga' },
  { value: 'Cycling', viewValue: 'Cycling' },
  { value: 'Swimming', viewValue: 'Swimming' },
  { value: 'Running', viewValue: 'Running' },
  { value: 'Weightlifting', viewValue: 'Weightlifting' },
];

export interface Workout {
  type: string | null;
  minutes: number;
}
