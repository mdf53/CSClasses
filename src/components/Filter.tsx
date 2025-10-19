import { Semesters } from "../data/Courses";

type FilterProps = {
    filters: {
        requiredForMajor: boolean | null;
        available: boolean | null;
        semester: Semesters | null;
    };
    onFilterChange: (
        key: "requiredForMajor" | "available" | "semester",
        value: boolean | Semesters | null
    ) => void;
};

const Filter = ({ filters, onFilterChange }: FilterProps) => {
    return (
        <div className="filters">
            <h2>Filters</h2>

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
                        checked={filters.available === true}
                        onChange={(e) =>
                            onFilterChange("available", e.target.checked ? true : null)
                        }
                    />
                    Currently Available
                </label>
            </div>

            <div className="filter-group">
                <h3>Semester</h3>
                <select
                    value={filters.semester?.toString() || ""}
                    onChange={(e) =>
                        onFilterChange(
                            "semester",
                            e.target.value ? Number(e.target.value) as Semesters : null
                        )
                    }
                >
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
        </div>
    );
};

export default Filter;
