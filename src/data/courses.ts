export type Lesson = {
  id: string;
  title: string;
  durationMin: number;
  locked?: boolean;
  videoUrl?: string;
};

export type Unit = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  thumbnail: string;
  units: Unit[];
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Modern React Native',
    instructor: 'Jane Doe',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80',
    units: [
      {
        id: 'u1',
        title: 'Getting Started',
        lessons: [
          { id: 'l1', title: 'Setup & Tooling', durationMin: 10, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: 'l2', title: 'Project Structure', durationMin: 12, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Data Structures & Algorithms',
    instructor: 'John Smith',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&q=80',
    units: [
      {
        id: 'u1',
        title: 'Arrays & Strings',
        lessons: [
          { id: 'l1', title: 'Arrays 101', durationMin: 14, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l2', title: 'Strings 101', durationMin: 15, locked: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'UI/UX for Developers',
    instructor: 'Ava Turner',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    units: [
      { id: 'u1', title: 'Principles', lessons: [{ id: 'l1', title: 'Color & Typography', durationMin: 18, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }] },
    ],
  },
];


