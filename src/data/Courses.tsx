export type Course = {
  code: string;
  title: string;
  description: string; 
  availability: Record<string, Semesters[]>; 
  requiredForMajor: boolean;
  lastUpdated: string;
  available: boolean;
};

export enum Semesters {
  "Winter",
  "Summer",
  "Spring",
  "Fall"
}

export enum Program {
  "Graduate",
  "Undergraduate"
}

//Idea for how we store courses. temp so I could make sure everything works
export const defaultCourses: Course[] = [
  {
    code: "110",
    title: "The Joy and Beauty of Computing",
    description: "There's no bugs, just happy little features",
    availability: {
      "2025-2026": [Semesters.Fall, Semesters.Winter, Semesters.Spring],
      "2026-2027": [Semesters.Fall, Semesters.Winter, Semesters.Spring]
    },
    requiredForMajor: true,
    lastUpdated: "June 25, 2024",
    available: true,
  },
 {
    code: "240",
    title: "Advanced Programming Concepts",
    description: "Chess n stuff",
    availability: {
      "2025-2026": [Semesters.Fall, Semesters.Winter, Semesters.Spring, Semesters.Summer],
      "2026-2027": [Semesters.Fall, Semesters.Winter]
    },
    requiredForMajor: true,
    lastUpdated: "June 25, 2024",
    available: false,
  },
  {
    code: "456",
    title: "Introduction to User Interface Software",
    description: "Will it exist by registration? We may never know",
    availability: {
      "2025-2026": [],
      "2026-2027": []
    },
    requiredForMajor: false,
    lastUpdated: "June 25, 2024",
    available: false,
  }
];