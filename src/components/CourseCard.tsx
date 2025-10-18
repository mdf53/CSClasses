import { Course, Semesters } from "../data/Courses";

interface Props {
    course: Course
}

const CourseCard = (props: Props) => {
    const semesterImages: Record<Semesters, string> = {
        [Semesters.Winter]: "/images/winter.svg",
        [Semesters.Summer]: "/images/summer.svg",
        [Semesters.Spring]: "/images/spring.svg",
        [Semesters.Fall]: "/images/fall.svg",
    };

    const semesterOrder = [
        Semesters.Fall,
        Semesters.Winter,
        Semesters.Spring,
        Semesters.Summer,
    ];


    return (
        <div>
            <li className="course-card">
                <details>
                    <summary>
                        <h3 className="card-title">CS {props.course.code}: {props.course.title}</h3>
                        <div className="semester-icons">
                            {props.course.availability["2026-2027"].map((semester, i) => (
                                <img
                                    key={i}
                                    src={semesterImages[semester]}
                                    alt={Semesters[semester]}
                                    title={Semesters[semester]}
                                    style={{ width: "24px", height: "24px", marginRight: "6px" }}
                                />
                            ))}
                        </div>
                        <div className="note">{props.course.requiredForMajor && <p className="required"><em>Required</em></p>}</div>
                    </summary>
                    <p className="update"><em>Last updated: {props.course.lastUpdated}</em></p>
                    <p>{props.course.description}</p>
                    <h3>Availability</h3>
                    <table>
                    <thead>
                        <tr>
                        {Object.keys(props.course.availability).map((year) => (
                            <th key={year} colSpan={semesterOrder.length}>{year}</th>
                        ))}
                        </tr>
                        <tr>
                        {Object.keys(props.course.availability).flatMap((year) =>
                            semesterOrder.map((sem) => (
                            <th key={`${year}-${sem}`}>{Semesters[sem]}</th>
                            ))
                        )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {Object.entries(props.course.availability).flatMap(([year, semesters]) =>
                            semesterOrder.map((sem) => (
                            <td key={`${year}-${sem}`} style={{ textAlign: "center" }}>
                                {semesters.includes(sem) ? (
                                <img
                                    src="/images/checkmark.svg"
                                    alt="Available"
                                    style={{ width: "20px", height: "20px" }}
                                />
                                ) : (
                                ""
                                )}
                            </td>
                            ))
                        )}
                        </tr>
                    </tbody>
                    </table>
                </details>
            </li>
        </div>
    );
}

export default CourseCard;