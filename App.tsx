import { useMemo, useState } from "react";

type Course = {
  code: string;
  title: string;
  description: string;
};

//Idea for how we store courses. temp so I could make sure everything works
const defaultCourses: Course[] = [
  {
    code: "CS101",
    title: "Intro to Programming",
    description: "Learn the building blocks of programming with JavaScript and TypeScript."
  },
  {
    code: "CS245",
    title: "Data Structures",
    description: "Implement fundamental data structures and reason about their performance."
  },
  {
    code: "CS356",
    title: "Advanced Human Computer Interaction",
    description: "Cool Advanced HCI Stuff."
  }
];

const App = () => {
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return defaultCourses;
    }

    return defaultCourses.filter((course) => {
      const haystack = `${course.code} ${course.title} ${course.description}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <div className="app">
      <header className="hero">
        <h1>CS Classes</h1>
        <p>Explore the Computer Science courses available this term.</p>
        <input
          aria-label="Search courses"
          placeholder="Search by topic, code, or title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>

      <main>
        {filteredCourses.length === 0 ? (
          <p className="empty">No courses match your search yet. Try another keyword.</p>
        ) : (
          <ul className="course-list">
            {filteredCourses.map((course) => (
              <li key={course.code} className="course-card">
                <h2>{course.code}</h2>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
