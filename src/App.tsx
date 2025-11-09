import { useMemo, useState } from "react";
import { defaultCourses, Semesters, Emphasis, Topic, Tag } from "./data/Courses";
import CourseCard from "./components/CourseCard";
import Filter from "./components/Filter";

const App = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    requiredForMajor: null as boolean | null,
    requiredForMinor: null as boolean | null,
    available: null as boolean | null,
    semester: null as Semesters | null,
    emphasis: null as Emphasis | null,
    topic: null as Topic | null,
    tag: null as Tag | null,
  });

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return defaultCourses.filter((course) => {
      // Text search filter
      const haystack = `${course.code} ${course.title} ${course.description}`.toLowerCase();
      if (normalizedQuery && !haystack.includes(normalizedQuery)) {
        return false;
      }

      // Semester filter
      if (filters.semester !== null) {
        const hasCurrentYear = Object.entries(course.availability).some(([year, semesters]) => {
          const currentYear = new Date().getFullYear();
          const [startYear] = year.split('-').map(Number);
          return startYear === currentYear && semesters.includes(filters.semester as Semesters);
        });
        if (!hasCurrentYear) {
          return false;
        }
      }

      // Emphasis filter
      if (filters.emphasis !== null) {
        if (filters.emphasis === Emphasis.Animation && course.requiredForAnimation) {
          return true;
        } else if (filters.emphasis === Emphasis.Bio && course.requiredForBio) {
          return true;
        } else if (filters.emphasis === Emphasis["Machine Learning"] && course.requiredForML) {
          return true;
        } else if (filters.emphasis === Emphasis["Software Engineering"] && course.requiredForSE) {
          return true;
        } else {
          return false;
        }
      }

      // Required for major filter
      if (filters.requiredForMajor !== null && course.requiredForMajor !== filters.requiredForMajor) {
        return false;
      }

      // Availability filter
      if (filters.available !== null && course.available !== filters.available) {
        return false;
      }

      return true;
    });
  }, [query, filters]);

  return (
    <>
      <header>
        <h1>BYU | Computer Science Courses</h1>
      </header>

      <div className="search-bar">
          <p>Explore the Computer Science courses available withing the upcoming year.</p>
          <input
            aria-label="Search courses"
            placeholder="Search by topic, code, or title"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-input"
          />
      </div>

      <div className="content">
        <aside className="sidebar">
          <Filter
            filters={filters}
            onFilterChange={(key, value) =>
              setFilters((prev) => ({ ...prev, [key]: value }))
            }
          />
        </aside>

        <main>
          {filteredCourses.length === 0 ? (
            <p className="empty">No courses match your search yet. Try another keyword.</p>
          ) : (
            <ul className="course-list">
              {filteredCourses.map((course) => (
                <CourseCard key={"CS" + course.code} course={course} />
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
