// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./UnitSet.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// const UnitSet = () => {
//   const [openUnit, setOpenUnit] = useState(null);
//   const [quizStatus, setQuizStatus] = useState({});
//   const userName = localStorage.getItem("userName");
//   const navigate = useNavigate();

//   const lessons = {
//     1: [
//       { id: "101", key: "alpha", title: "Alphabet", path: "/units/lesson1" },
//       {
//         id: "102",
//         key: "finger",
//         title: "Finger Spelling",
//         path: "/units/lesson2",
//       },
//       {
//         id: "103",
//         key: "greetings",
//         title: "Greetings",
//         path: "/units/lesson3",
//       },
//     ],
//     2: [
//       { id: "201", key: "grammar", title: "Grammar", path: "/units/lesson4" },
//       {
//         id: "202",
//         key: "nounAdj",
//         title: "Nouns and Adjectives",
//         path: "/units/lesson5/N_A",
//       },
//       {
//         id: "203",
//         key: "verbColors",
//         title: "Verbs and Colors",
//         path: "/units/lesson6",
//       },
//     ],
//     3: [
//       { id: "301", key: "numbers", title: "Numbers", path: "/units/lesson7" },
//     ],
//     4: [
//       {
//         id: "401",
//         key: "finalExam",
//         title: "Final Exam",
//         path: "/units/Final",
//       },
//     ],
//   };

//   useEffect(() => {
//     const fetchQuizStatuses = async () => {
//       try {
//         const promises = Object.values(lessons)
//           .flat()
//           .map(({ id, key }) =>
//             axios
//               .get(
//                 "https://signwithme-92dm.onrender.com/api/lessons/get-lesson",
//                 {
//                   params: { lessonId: id, userName },
//                 }
//               )
//               .then((response) => {
//                 if (response.data.lesson?.quiz_complete) {
//                   setQuizStatus((prev) => ({ ...prev, [key]: true }));
//                 }
//               })
//           );
//         await Promise.all(promises);
//       } catch (error) {
//         console.error("Error fetching quiz statuses:", error);
//       }
//     };

//     if (userName) fetchQuizStatuses();
//   }, [userName]);

//   const toggleUnit = (unit) => {
//     setOpenUnit(openUnit === unit ? null : unit);
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   const getProgress = (key) => (quizStatus[key] ? 100 : 0);

//   return (
//     <div className="unitset-container">
//       <h1 style={{ fontSize: "50px" }}>Units Dashboard</h1>
//       <div className="unitset-list">
//         {Object.entries(lessons).map(([unitNumber, unitLessons]) => (
//           <div style={{ fontSize: "25px" }} key={`unit-${unitNumber}`}>
//             <button
//               onClick={() => toggleUnit(unitNumber)}
//               className="unit-button"
//             >
//               {`Unit ${unitNumber}: ${
//                 unitNumber === "1"
//                   ? "Basics"
//                   : unitNumber === "2"
//                   ? "Intermediate"
//                   : unitNumber === "3"
//                   ? "Advanced"
//                   : "Final Examination"
//               }`}
//               {unitLessons.every(({ key }) => quizStatus[key]) && (
//                 <span>🏆</span>
//               )}
//             </button>
//             {openUnit === unitNumber && (
//               <div className="lesson-dropdown">
//                 {unitLessons.map(({ id, key, title, path }) => (
//                   <div className="lesson-container" key={`lesson-${id}`}>
//                     <h3>
//                       {title} {quizStatus[key] && <span>🏆</span>}
//                     </h3>
//                     <button
//                       onClick={() => handleNavigate(path)}
//                       className="lesson-button"
//                     >
//                       Go to Lesson
//                     </button>
//                     <div className="progress-container">
//                       <CircularProgressbar
//                         value={getProgress(key)}
//                         text={`${getProgress(key)}%`}
//                         styles={{
//                           path: {
//                             stroke: quizStatus[key] ? "green" : "red",
//                           },
//                           text: {
//                             fill: quizStatus[key] ? "green" : "red",
//                           },
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UnitSet;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UnitSet.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UnitSet = () => {
  const [openUnit, setOpenUnit] = useState(null);
  const [quizStatus, setQuizStatus] = useState({});
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const lessons = {
    1: [
      { id: "101", key: "alpha", title: "Alphabet", path: "/units/lesson1" },
      {
        id: "102",
        key: "finger",
        title: "Finger Spelling",
        path: "/units/lesson2",
      },
      {
        id: "103",
        key: "greetings",
        title: "Greetings",
        path: "/units/lesson3",
      },
    ],
    2: [
      { id: "201", key: "grammar", title: "Grammar", path: "/units/lesson4" },
      {
        id: "202",
        key: "nounAdj",
        title: "Nouns and Adjectives",
        path: "/units/lesson5/N_A",
      },
      {
        id: "203",
        key: "verbColors",
        title: "Verbs and Colors",
        path: "/units/lesson6",
      },
    ],
    3: [
      { id: "301", key: "numbers", title: "Numbers", path: "/units/lesson7" },
    ],
    4: [
      {
        id: "401",
        key: "finalExam",
        title: "Final Exam",
        path: "/units/Final",
      },
    ],
  };

  useEffect(() => {
    const fetchQuizStatuses = async () => {
      try {
        const promises = Object.values(lessons)
          .flat()
          .map(({ id, key }) =>
            axios
              .get(
                "https://signwithme-92dm.onrender.com/api/lessons/get-lesson",
                {
                  params: { lessonId: id, userName },
                }
              )
              .then((response) => {
                if (response.data.lesson?.quiz_complete) {
                  setQuizStatus((prev) => ({ ...prev, [key]: true }));
                }
              })
          );
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching quiz statuses:", error);
      }
    };

    if (userName) fetchQuizStatuses();
  }, [userName]);

  const toggleUnit = (unit) => {
    setOpenUnit(openUnit === unit ? null : unit);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getProgress = (key) => (quizStatus[key] ? 100 : 0);

  const calculateOverallProgress = () => {
    const totalLessons = Object.values(lessons).flat().length;
    const completedLessons = Object.keys(quizStatus).filter(
      (key) => quizStatus[key]
    ).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <div className="unitset-container">
      {/* User Dashboard */}
      <div className="user-dashboard">
        <h2>Welcome, {userName}!</h2>
        <div className="dashboard-stats">
          <div className="progress-overview">
            <h3>Overall Progress</h3>
            <CircularProgressbar
              value={calculateOverallProgress()}
              text={`${calculateOverallProgress()}%`}
              styles={{
                path: {
                  stroke: calculateOverallProgress() === 100 ? "green" : "blue",
                },
                text: {
                  fill: calculateOverallProgress() === 100 ? "green" : "blue",
                },
              }}
            />
          </div>
        </div>
      </div>

      <h1 style={{ fontSize: "50px" }}>Units Dashboard</h1>
      <div className="unitset-list">
        {Object.entries(lessons).map(([unitNumber, unitLessons]) => (
          <div style={{ fontSize: "25px" }} key={`unit-${unitNumber}`}>
            <button
              onClick={() => toggleUnit(unitNumber)}
              className="unit-button"
            >
              {`Unit ${unitNumber}: ${
                unitNumber === "1"
                  ? "Basics"
                  : unitNumber === "2"
                  ? "Intermediate"
                  : unitNumber === "3"
                  ? "Advanced"
                  : "Final Examination"
              }`}
              {unitLessons.every(({ key }) => quizStatus[key]) && (
                <span>🏆</span>
              )}
            </button>
            {openUnit === unitNumber && (
              <div className="lesson-dropdown">
                {unitLessons.map(({ id, key, title, path }) => (
                  <div className="lesson-container" key={`lesson-${id}`}>
                    <h3>
                      {title} {quizStatus[key] && <span>🏆</span>}
                    </h3>
                    <button
                      onClick={() => handleNavigate(path)}
                      className="lesson-button"
                    >
                      Go to Lesson
                    </button>
                    <div className="progress-container">
                      <CircularProgressbar
                        value={getProgress(key)}
                        text={`${getProgress(key)}%`}
                        styles={{
                          path: {
                            stroke: quizStatus[key] ? "green" : "red",
                          },
                          text: {
                            fill: quizStatus[key] ? "green" : "red",
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitSet;

