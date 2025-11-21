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
    semester: [] as Semesters[],
    emphasis: [] as Emphasis[],
    tag: [] as Tag[],
  });

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return defaultCourses.filter((course) => {
      // Text search filter (also looks through tags)
      const tagText = course.tags.join(" ");
      const haystack = `${course.code} ${course.title} ${course.description} ${tagText}`.toLowerCase();
      if (normalizedQuery && !haystack.includes(normalizedQuery)) {
        return false;
      }

      // Semester filter
      {
        const semesterFilter = filters.semester;
        if (semesterFilter !== null) {
          const hasCurrentYear = Object.entries(course.availability).some(
            ([year, semesters]) => {
              const currentYear = new Date().getFullYear();
              const [startYear] = year.split("-").map(Number);
              return (
                startYear === currentYear &&
                semesters.some(semester => semesterFilter.includes(semester))
              );
            }
          );
          if (!hasCurrentYear) {
            return false;
          }
        }
      }

      // Emphasis filter
      if (filters.emphasis !== null && filters.emphasis.length > 0) {
        const matchesEmphasis =
          (filters.emphasis.includes(Emphasis.Animation) && course.requiredForAnimation) ||
          (filters.emphasis.includes(Emphasis.Bio) && course.requiredForBio) ||
          (filters.emphasis.includes(Emphasis["Machine Learning"]) && course.requiredForML) ||
          (filters.emphasis.includes(Emphasis["Software Engineering"]) && course.requiredForSE);
        if (!matchesEmphasis) {
          return false;
        }
      }

      // Required for major filter
      if (
        filters.requiredForMajor !== null &&
        course.requiredForMajor !== filters.requiredForMajor
      ) {
        return false;
      }

      // Required for minor filter
      if (
        filters.requiredForMinor !== null &&
        course.requiredForMinor !== filters.requiredForMinor
      ) {
        return false;
      }

      // Availability filter
      if (
        filters.available !== null &&
        course.available !== filters.available
      ) {
        return false;
      }

      // Topic filter
      // if (filters.topic !== null && !course.topics.includes(filters.topic)) {
      //   return false;
      // }

      const tagMap: Record<Tag, string> = {
        [Tag.Algorithms]: "algorithms",
        [Tag.Animation]: "animation",
        [Tag["Programming Languages"]]: "programming languages",
        [Tag["Data Structures"]]: "data structures",
        [Tag["Software Engineering"]]: "software engineering",
        [Tag["Machine Learning"]]: "machine learning",
        [Tag["HCI"]]: "HCI",
      }

      // Tag filter
      if (filters.tag !== null && filters.tag.length > 0) {
        const matchesTag = filters.tag.some((t) => course.tags.includes(tagMap[t]));
        if (!matchesTag) {
          return false;
        }
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
        <p>
          Explore the Computer Science courses available withing the upcoming
          year.
        </p>
        <input
          aria-label="Search courses"
          placeholder="Search by tag, topic, code, or title"
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
            <p className="empty">
              No courses match your search yet. Try another keyword.
            </p>
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
