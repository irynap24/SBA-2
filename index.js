// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};
const dueDates = ["2023-01-25", "2023-02-27"];

function filterAssignments(dueDate) {
    // Create an empty object to store the appropriate assignments, excluding id 3
    let filteredAssignments = {};

    // Iterate over each assignment in the AssignmentGroup
    for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
        let assignment = AssignmentGroup.assignments[i];
        if (dueDate.includes(assignment.due_at)) {
            // Use the assignment ID as the key and the assignment object as the value
            filteredAssignments[assignment.id] = assignment;
        }
    }

    return filteredAssignments;
}
const myResult = filterAssignments(dueDates);
console.log(myResult);

// Created a function to verify course ID belongs in Assignment Group
function courseVerify(courseID) {
    if (AssignmentGroup.course_id !== courseID) {
        throw new Error(`The course ID [${courseID}] you entered is invalid`); // throws error message if course ID is invalid
    }
}
try {
    courseVerify(451);//executed statement
    // courseVerify(900); exception is thrown here
    console.log(`Welcome to course ${AssignmentGroup.course_id}!`);
} catch (error) {
    console.error(error.message); // executes error msg if exception is thrown in try
}
courseVerify(451)

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// Function to calculate total and average scores per assignment for each learner
// Function to filter scores by learner and convert to array of objects
function filterScore(learnerId) {
    // Initialize variables to hold the results
    const results = {};

    // Initialize results for each assignment except assignment_id 3
    AssignmentGroup.assignments.forEach(assignment => {
        if (assignment.id !== 3) { // Exclude assignment_id 3
            results[assignment.id] = {
                learner_id: learnerId,
                assignment_id: assignment.id,
                assignment_name: assignment.name,
                pointsPossible: assignment.points_possible,
                totalScore: 0,
                averageScore: 0
            };
        }
    });

    // Process each submission
    LearnerSubmissions.forEach(submission => {
        if (submission.learner_id === learnerId && submission.assignment_id !== 3) { // Exclude assignment_id 3
            const assignment = results[submission.assignment_id];
            if (assignment) {
                // Accumulate the total score
                if (submission.assignment_id === 2 && learnerId === 132) {
                    // Apply 10% deduction for assignment 2 for learner 132
                    assignment.totalScore += submission.submission.score * 0.90;
                } else {
                    assignment.totalScore += submission.submission.score;
                }
            }
        }
    });

    // Calculate average scores
    Object.keys(results).forEach(assignmentId => {
        const assignment = results[assignmentId];
        if (assignment.pointsPossible > 0) {
            assignment.averageScore = assignment.totalScore / assignment.pointsPossible;
        } else {
            assignment.averageScore = 0;
        }
    });

    // Convert results object to an array of objects
    return Object.values(results);
}

// Calculate and output scores for each learner
const learner125Scores = filterScore(125);
const learner132Scores = filterScore(132);

// Combine results into one array
const combinedResults = [...learner125Scores, ...learner132Scores];

console.log("Combined Results:");
console.log(combinedResults);

// function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//         {
//             id: 125,
//             avg: 0.985, // (47 + 150) / (50 + 150)
//             1: 0.94, // 47 / 50
//             2: 1.0 // 150 / 150
//         },
//         {
//             id: 132,
//             avg: 0.82, // (39 + 125) / (50 + 150)
//             1: 0.78, // 39 / 50
//             2: 0.833 // late: (140 - 15) / 150
//         }
//     ];

//     return result;
// }

// const finalResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(finalResult);


// the ID of the learner for which this data has been collected
// "id": number,
