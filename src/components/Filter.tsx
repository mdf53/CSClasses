import { Semesters, Emphasis, Topic, Tag } from "../data/Courses";

type FilterProps = {
  filters: {
    semester: Semesters | null;
    available: boolean | null;
    requiredForMajor: boolean | null;
    requiredForMinor: boolean | null;
    Emphasis: Emphasis | null;
    topic: Topic | null;
    tag: Tag | null;
  };
  onFilterChange: (
    key: "semester" | "available" | "requiredForMajor" | "requiredForMinor" | "Emphasis" | "topic" | "tag",
    value: boolean | Semesters | Emphasis | Topic | Tag | null
  ) => void;
};

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter-group">
        <h3>Semester</h3>
        <select
          value={filters.semester?.toString() || ""}
          onChange={(e) =>
            onFilterChange(
              "semester",
              e.target.value ? Number(e.target.value) as Semesters : null
            )
          }>
          <option value="">Any Semester</option>
          {Object.keys(Semesters)
            .filter((key) => !isNaN(Number(key)))
            .map((semester) => (
              <option key={semester} value={semester}>
                {Semesters[Number(semester)]}
              </option>
            ))}
        </select>
      </div>

      <div className="filter-group">
        <h3>Emphasis</h3>
        <select
          value={filters.Emphasis?.toString() || ""}
          onChange={(e) =>
            onFilterChange(
              "Emphasis",
              e.target.value ? Number(e.target.value) as Emphasis : null
            )
          }>
          <option value="">Any Emphasis</option>
          {Object.keys(Emphasis)
            .filter((key) => !isNaN(Number(key)))
            .map((emphasis) => (
              <option key={emphasis} value={emphasis}>
                {Emphasis[Number(emphasis)]}
              </option>
            ))}
        </select>
      </div>

      <div className="filter-group">
        <h3>Course Status</h3>
        <label>
          <input
            type="checkbox"
            checked={filters.requiredForMajor === true}
            onChange={(e) =>
              onFilterChange("requiredForMajor", e.target.checked ? true : null)
            }
          />
          Required for Major
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.requiredForMinor === true}
            onChange={(e) =>
              onFilterChange("requiredForMinor", e.target.checked ? true : null)
            }
          />
          Required for Minor
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.available === true}
            onChange={(e) =>
              onFilterChange("available", e.target.checked ? true : null)
            }
          />
          Currently Available
        </label>
      </div>

      <div className="filter-group">
        <h3>Topic</h3>
        <select
          value={filters.topic?.toString() || ""}
          onChange={(e) =>
            onFilterChange(
              "topic",
              e.target.value ? Number(e.target.value) as Topic : null
            )
          }>
          <option value="">Any Topic</option>
          {Object.keys(Topic)
            .filter((key) => !isNaN(Number(key)))
            .map((topic) => (
              <option key={topic} value={topic}>
                {Topic[Number(topic)]}
              </option>
            ))}
        </select>
      </div>

      <div className="filter-group">
        <h3>Tag</h3>
        <select
          value={filters.tag?.toString() || ""}
          onChange={(e) =>
            onFilterChange(
              "tag",
              e.target.value ? Number(e.target.value) as Tag : null
            )
          }>
          <option value="">Any Tag</option>
          {Object.keys(Tag)
            .filter((key) => !isNaN(Number(key)))
            .map((tag) => (
              <option key={tag} value={tag}>
                {Tag[Number(tag)]}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
