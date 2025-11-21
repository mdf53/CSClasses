import { Course, Semesters } from "../data/Courses";

interface Props {
    course: Course
}

const CourseCard = (props: Props) => {
    const semesterImages: Record<Semesters, string> = {
        [Semesters.Winter]: "https://img.icons8.com/?size=100&id=Mvbzy3ZDRcVj&format=png&color=000000",
        [Semesters.Spring]: "https://img.icons8.com/?size=100&id=19656&format=png&color=000000",
        [Semesters.Summer]: "https://img.icons8.com/?size=100&id=18529&format=png&color=000000",
        [Semesters.Fall]: "https://img.icons8.com/?size=100&id=FGCOVaBqa8FY&format=png&color=000000",
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
                        <div className="note">{props.course.requiredForMajor && <div className="required">*</div>}</div>
                    </summary>
                    <p className="update"><em>Last updated: {props.course.lastUpdated}</em></p>
                    <p>{props.course.description}</p>
                    <div>
                        <h3>Prerequisites</h3>
                        <p>{props.course.prerequisites}</p>
                    </div>
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
                                                    src="data:image/png;base64,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"
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
                    <div>
                       {props.course.tags?.length > 0 && (
                            <div className="pill-container">
                            {props.course.tags.map((t) => (
                                <span key={t} className="pill pill-tag">
                                {t}
                                </span>
                            ))}
                            </div>
                        )}
                    </div>
                </details>
            </li>
        </div>
    );
}

export default CourseCard;
