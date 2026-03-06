export type Event = {
  id: number;
  title: string;
  description: string;
  full_date: string;
  date: string;
  day: string;
  time: string;
  location: string;
  price: string;
  image_url: string;
  category: {
    id: number;
    name: string;
  };
};
