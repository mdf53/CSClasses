import { useMemo, useState } from "react";
import { defaultCourses, Semesters, Emphasis, Tag } from "./data/Courses";
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

      // Required for minor filter
      if (filters.requiredForMinor !== null && course.requiredForMinor !== filters.requiredForMinor) {
        return false;
      }

      // Availability filter
      if (filters.available !== null && course.available !== filters.available) {
        return false;
      }

      // Topic filter
      // if (filters.topic !== null && !course.topics.includes(filters.topic)) {
      //   return false;
      // }

      // Tag filter
      if (filters.tag !== null) {
        if (filters.tag === Tag.Algorithms && !course.tags.includes("algorithms")) {
          return false;
        } else if (filters.tag === Tag.Animation && !course.tags.includes("animation")) {
          return false;
        } else if (filters.tag === Tag["Programming Languages"] && !course.tags.includes("programming languages")) {
          return false;
        } else if (filters.tag === Tag["Data Structures"] && !course.tags.includes("data structures")) {
          return false;
        } else if (filters.tag === Tag["Software Engineering"] && !course.tags.includes("software engineering")) {
          return false;
        } else if (filters.tag === Tag["Machine Learning"] && !course.tags.includes("machine learning")) {
          return false;
        }

        // for (const t of Object.values(Tag) as Tag[]) {
        //   if (t === filters.tag) {
        //     if (!course.tags.includes(String(t))) {
        //       return false;
        //     }
        //     break;
        //   }
        // }
      }

      return true;
    });
  }, [query, filters]);

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
    </div>
  );
};

export default App;
