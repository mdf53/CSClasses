import { Semesters, Emphasis, Tag } from "../data/Courses";

type FilterProps = {
  filters: {
    semester: Semesters[];
    available: boolean | null;
    requiredForMajor: boolean | null;
    requiredForMinor: boolean | null;
    emphasis: Emphasis[];
    tag: Tag[];
  };
  onFilterChange: (
    key: "semester" | "available" | "requiredForMajor" | "requiredForMinor" | "emphasis" | "tag",
    value: boolean | Semesters[] | Emphasis[] | Tag[] | null
  ) => void;
};

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter-group">
        <h3>Semester</h3>
        <select
          multiple
          value={filters.semester.map(String)}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(o => Number(o.value) as Semesters);
            onFilterChange(
              "semester",
              selected
            )
          }}>
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
          multiple
          value={filters.emphasis.map(String)}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(o => Number(o.value) as Emphasis);
            onFilterChange(
              "emphasis",
              selected
            )
          }}>
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
        <h3>Tag</h3>
        <select
          multiple
          value={filters.tag.map(String)}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(o => Number(o.value) as Tag);
            onFilterChange(
              "tag",
              selected
            )
          }}>
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
    </div >
  );
};

export default Filter;
