
export enum WorkshopStatus {
  UPCOMING = 'upcoming',
  PAST = 'past'
}

export interface WorkshopCategory {
  name: string;
  color: string; // Tailwind class
  glow: string; // Custom glow class
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface AgeGroupSchedule {
  ageLabel: string;
  items: ScheduleItem[];
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  date: string;
  status: WorkshopStatus;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  categories: WorkshopCategory[];
  location: string;
  pricing: {
    label: string;
    amount: string;
    onDayAmount: string;
  }[];
  features: string[];
  schedules: AgeGroupSchedule[];
  registrationLink: string;
}
