// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};

function courseVerify(courseID) {
    if (CourseInfo.id !== courseID) { // if coursID(id) param doesnt match id:451 in CourseInfo, throw error
        throw new Error(`The course ID [${courseID}] you entered is invalid`); // throws error message if course ID is invalid
    }
}
try {
    courseVerify(451);//executed statement
    // courseVerify(900); exception is thrown here, commented out so it doesnt actually throw error, uncomment to get error
    console.log(`Welcome to course ${CourseInfo.id}, ${CourseInfo.name}`);
} catch (error) {
    console.error(error.message); // executes error msg if exception is thrown in try
}
courseVerify(451);

////////////////////////////////////////////////////

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
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

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
// Function to get learner IDs
function getIDs(learnerSubmissions) {
    // Initialize an empty array
    let learners = [];

    // Iterate over the LearnerSubmissions array
    learnerSubmissions.forEach((item) => {
        // adds learner_id to learners, push them into the empty array
        learners.push(item.learner_id);
    });

    // Map learners to an array of objects with id as a property
    learners = learners.map((item) => {
        return { id: item };
    });

    return learners; // Return the array of objects
};



// Function to generate a learner report
function learnerReport(learnerID, assignmentGroup, learnerSubmissions) {
    let totalScore = 0;
    let possiblePoints = 0;
    let assignmentScores = {};

    // Get the current date to compare against due_at: "3156-11-15",in assignment id:3 so its not included
    const currentDate = new Date();

    // Function to check if an assignment is late
    function isLate(assignment, submission) {
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submission.submitted_at);
        return submittedDate > dueDate; // checks learners submitted_at vs due_at, if submitted_at is greater than due_at, it is marked late
    }

    // Loop through each assignment
    for (let i = 0; i < assignmentGroup.assignments.length; i++) {
        const assignment = assignmentGroup.assignments[i];
        const dueDate = new Date(assignment.due_at);

        // Check if the assignment is due
        if (dueDate > currentDate) { // skipping assignment id:3 as its due in the future, way past the current date
            continue; 
        }

        // Get the submission for the current assignment and learner
        let found = false;
        for (let j = 0; j < learnerSubmissions.length; j++) {
            const submission = learnerSubmissions[j];
            if (submission.assignment_id === assignment.id && submission.learner_id === learnerID) {
                found = true;
                let score = submission.submission.score;
                const pointsPossible = assignment.points_possible;

                // Deduct 10% if the submission is late
                if (isLate(assignment, submission.submission)) {
                    score *= 0.9;
                }

                // Calculate and store assignment score
                assignmentScores[assignment.id] = parseFloat((score / pointsPossible).toFixed(3)); // parseFloat converts to a number instead of string, toFixed is rounding to 3 decimal points
                // Calculate total score and total points possible for assignment
                totalScore += score;
                possiblePoints += pointsPossible;

                break; // Stop searching once we find the submission
            }
        }
        if (!found) { // If not found, skip to the next assignment
            continue;
        }
    }

    // Calculate the weighted average
    let avg;

    if (possiblePoints !== 0) {
        avg = parseFloat((totalScore / possiblePoints).toFixed(2));// parseFloat converts to a number instead of string, toFixed is rounding to 2 decimal points, avg is rounded to 0.98 and 0.82
    } else {
        avg = 0; 
    }

    // Create the final report object
    const report = {
        id: learnerID,
        avg: avg, 
        ...assignmentScores // spread operator copies properties from object to new object (report)
    };

    return report;

};

// Putting all the data together
function getLearnerData(assignmentGroup, learnerSubmissions) {
    // Helper function to get learner IDs
    function getIDs(submissions) {
        let learners = []; // Initialize an empty array and loop through each submission
        for (let i = 0; i < submissions.length; i++) {
            const learnerID = submissions[i].learner_id;
            if (!learners.includes(learnerID)) {
                learners.push(learnerID);
            }
        }
        return learners;
    }

    const learnerIds = getIDs(learnerSubmissions);
    let reports = [];

    for (let i = 0; i < learnerIds.length; i++) {
        const learnerID = learnerIds[i];
        const report = learnerReport(learnerID, assignmentGroup, learnerSubmissions);
        reports.push(report);
    }

    return reports;
}

const reports = getLearnerData(AssignmentGroup, LearnerSubmissions);
console.log('The report for learners is as follows:', reports);


// [
//     {
//     id: 125,
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//         },
//     {
//      id: 132,
//      avg: 0.82, // (39 + 125) / (50 + 150)
//      1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//     }
// ];