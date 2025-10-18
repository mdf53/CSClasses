import { useMemo, useState } from "react";
import { defaultCourses } from "./data/Courses";
import CourseCard from "./components/CourseCard";

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
              <CourseCard key={"CS" + course.code} course={course}/>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
