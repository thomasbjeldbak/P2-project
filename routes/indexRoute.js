/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable node/no-path-concat */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Connection URI
const uri =
    "mongodb+srv://test:test@cluster0.uwjpd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// Render the landing page.
router.get("/", function (request, response) {
    response.render("pages/index");
});

// Render the contact us page.
router.get("/contact", function (request, response) {
    response.render("pages/contact");
});

// Render the guide page.
router.get("/guide", function (request, response) {
    return response.render("pages/guide.ejs");
});

// Render the results page.
router.post(
    "/results",
    [
        check("firstName", "Enter first name").isString().notEmpty(),
        check("lastName", "Enter last name").isString().notEmpty(),
        check("gender", "Choose a gender").equals("1", "2"),
        check("email", "Email is not valid").isEmail().normalizeEmail(),
        check("age", "Choose an age").isIn(["1", "2", "3"]).exists().isString(),
        check("major", "Choose a major")
            .isString()
            .notEmpty()
            .isLength({ max: 3 }),
        check("semester", "Choose a semester between 1-10")
            .isIn(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
            .exists()
            .isString(),
        check("roommateLanguage", "Choose a nationality")
            .isString()
            .notEmpty()
            .isLength({ max: 2 }),
        check(
            "planVisitorsRoommate",
            "Choose how often you prefer your roommate to have visitors over"
        )
            .isIn(["1", "2", "3", "4", "5"])
            .exists()
            .isString(),
        check(
            "planVisitors",
            "Choose how often you prefer to have visitors over"
        )
            .isIn(["1", "2", "3", "4", "5"])
            .exists()
            .isString(),
        check("preferStudy", "Choose how you prefer to study")
            .exists()
            .isString()
            .isIn(["1", "2", "3", "4", "5"]),
        check("bedtime", "Choose when you typically go to bed")
            .isIn(["1", "2", "3"])
            .exists()
            .isString(),
        check(
            "roommateGender",
            "Choose which gender you prefer your roommate to be"
        )
            .isIn(["1", "2", "3"])
            .exists()
            .isString(),
        check(
            "preferInternational",
            "Choose if you prefer your roommate to be the same nationality as you"
        )
            .isIn(["Yes", "No"])
            .exists()
            .isString(),
        check(
            "preferredAgeRange",
            "Choose which age range you prefer your roommate to be"
        )
            .isIn(["1", "2", "3", "4"])
            .exists()
            .isString(),
        check("btnradio4", "Choose if you are a smoker")
            .isIn(["smokerYes", "smokerNo"])
            .exists()
            .isString(),
        check(
            "roommateMajor",
            "Choose if you prefer your roommate to have the same major as you"
        )
            .isIn(["Yes", "No"])
            .exists()
            .isString(),
        check(
            "roommateSemester",
            "Choose if you prefer your roommate to be on the same semester as you"
        )
            .isIn(["Yes", "No"])
            .exists()
            .isString(),
        check("budget", "Choose your maximum budget")
            .isIn(["1", "2", "3", "4", "5"])
            .exists()
            .isString(),
        check(
            "btnradio7",
            "Choose if you require the dorm and room to be handicap friendly"
        )
            .isIn(["handicapFriendlyYes", "handicapFriendlyNo"])
            .exists()
            .isString(),
        check(
            "aalborgSection",
            "Choose which section of Aalborg you with to live in"
        )
            .isIn([
                "sectionAalborgC",
                "sectionAalborgSW",
                "sectionAalborgSE",
                "secionAalborgE",
            ])
            .exists()
            .isString(),
        check("Q1", "#1 question is not valid")
            .isIn([
                "planVisitorsRoommate",
                "preferStudy",
                "bedtime",
                "roommateGender",
                "roommateLanguage",
                "preferredAgeRange",
                "btnradio4",
                "roommateMajor",
                "roommateSemester",
            ])
            .exists()
            .isString(),
        check("Q2", "#2 question is not valid")
            .isIn([
                "planVisitorsRoommate",
                "preferStudy",
                "bedtime",
                "roommateGender",
                "roommateLanguage",
                "preferredAgeRange",
                "btnradio4",
                "roommateMajor",
                "roommateSemester",
            ])
            .exists()
            .isString(),
        check("Q3", "#3 question is not valid")
            .isIn([
                "planVisitorsRoommate",
                "preferStudy",
                "bedtime",
                "roommateGender",
                "roommateLanguage",
                "preferredAgeRange",
                "btnradio4",
                "roommateMajor",
                "roommateSemester",
            ])
            .exists()
            .isString(),
        check("Q4", "#4 question is not valid")
            .isIn([
                "planVisitorsRoommate",
                "preferStudy",
                "bedtime",
                "roommateGender",
                "roommateLanguage",
                "preferredAgeRange",
                "btnradio4",
                "roommateMajor",
                "roommateSemester",
            ])
            .exists()
            .isString(),
        check("Q5", "#5 question is not valid")
            .isIn([
                "planVisitorsRoommate",
                "preferStudy",
                "bedtime",
                "roommateGender",
                "roommateLanguage",
                "preferredAgeRange",
                "btnradio4",
                "roommateMajor",
                "roommateSemester",
            ])
            .exists()
            .isString(),
    ],
    async function (request, response) {
        const errors = validationResult(request);
        const db = client.db("myFirstDatabase");
        let alert = await error(errors);

        if (errors.isEmpty()) {
            await client.connect();
            await db.collection("residents").insertOne(request.body);
            console.log("Inserted applicant");
            let resident = await db.collection("residents").find({}).toArray();
            let weight = await weighting(request);
            fitness = compatibility(request, resident, weight);
            client.close();
        } else {
            fitness = [];
        }

        response.render("pages/results", {
            applicant_name: request.body.firstName,
            resident: fitness,
            alert,
        });
    }
);

function error(errors) {
    let alert = [];
    if (!errors.isEmpty()) {
        alert = errors.array();
        console.log(alert);
    }
    return alert;
}

// Calculate the compatibility from the X_x's.
function x1(q9x, q10y) {
    let delta, x1;

    /* To make sure that we get a postive delta */
    if (q9x > q10y) {
        delta = q9x - q10y;
    } else {
        delta = q10y - q9x;
    }

    switch (delta) {
        case 0:
            x1 = 1;
            break;
        case 1:
            x1 = 0.5;
            break;
        case 2:
            x1 = 0;
            break;
        case 3:
            x1 = -0.5;
            break;
        case 4:
            x1 = -1;
            break;
    }

    return x1;
}

function x2(q9y, q10x) {
    let delta, x2;

    /* To make sure that we get a postive delta */
    if (q9y > q10x) {
        delta = q9y - q10x;
    } else {
        delta = q10x - q9y;
    }

    switch (delta) {
        case 0:
            x2 = 1;
            break;
        case 1:
            x2 = 0.5;
            break;
        case 2:
            x2 = 0;
            break;
        case 3:
            x2 = -0.5;
            break;
        case 4:
            x2 = -1;
            break;
    }

    return x2;
}

function x3(q11x, q11y) {
    let delta, x3;

    /* To make sure that we get a postive delta */
    if (q11x > q11y) {
        delta = q11x - q11y;
    } else {
        delta = q11y - q11x;
    }

    switch (delta) {
        case 0:
            x3 = 1;
            break;
        case 1:
            x3 = 0.5;
            break;
        case 2:
            x3 = 0;
            break;
        case 3:
            x3 = -0.5;
            break;
        case 4:
            x3 = -1;
            break;
    }

    return x3;
}

function x4(q12x, q12y) {
    let delta, x4;

    /* To make sure that we get a postive delta */
    if (q12x > q12y) {
        delta = q12x - q12y;
    } else {
        delta = q12y - q12x;
    }

    switch (delta) {
        case 0:
            x4 = 1;
            break;
        case 1:
            x4 = 0;
            break;
        case 2:
            x4 = -1;
            break;
    }

    return x4;
}

function x5(q13x, q3y) {
    let delta, x5;

    /* To make sure that we get a postive delta */
    if (q13x > q3y) {
        delta = q13x - q3y;
    } else {
        delta = q3y - q13x;
    }

    if (q13x === 3 || delta === 0) {
        x5 = 1;
    } else {
        x5 = -1;
    }

    return x5;
}

function x6(q13y, q3x) {
    let delta, x6;

    /* To make sure that we get a postive delta */
    if (q13y > q3x) {
        delta = q13y - q3x;
    } else {
        delta = q3x - q13y;
    }

    if (q13y === 3 || delta === 0) {
        x6 = 1;
    } else {
        x6 = -1;
    }

    return x6;
}

function x7(q14x, q8x, q8y) {
    let x7;

    if (q14x === "Yes") {
        if (q8x === q8y) {
            x7 = 1;
        } else {
            x7 = 0;
        }
    } else {
        x7 = 0;
    }

    return x7;
}

function x8(q14y, q8y, q8x) {
    let x8;

    if (q14y === "Yes") {
        if (q8y === q8x) {
            x8 = 1;
        } else {
            x8 = 0;
        }
    } else {
        x8 = 0;
    }

    return x8;
}

function x9(q15x, q5y) {
    let delta, x9;

    /* To make sure that we get a postive delta */
    if (q15x > q5y) {
        delta = q15x - q5y;
    } else {
        delta = q5y - q15x;
    }

    if (q15x === 4 || delta === 0) {
        x9 = 1;
    } else if (delta === 1) {
        x9 = 0;
    } else {
        x9 = -1;
    }

    return x9;
}

function x10(q15y, q5x) {
    let delta, x10;

    /* To make sure that we get a postive delta */
    if (q15y > q5x) {
        delta = q15y - q5x;
    } else {
        delta = q5x - q15y;
    }

    if (q15y === 4 || delta === 0) {
        x10 = 1;
    } else if (delta === 1) {
        x10 = 0;
    } else {
        x10 = -1;
    }

    return x10;
}

function x11(q16x, q16y) {
    let x11;

    if (q16x === "smokerYes" || q16x === "smokerNo") {
        if (q16x === q16y) {
            x11 = 1;
        } else {
            x11 = -1;
        }
    }

    return x11;
}

function x12(q17x, q6x, q6y) {
    let x12;

    if (q17x === "Yes") {
        if (q6x === q6y) {
            x12 = 1;
        } else {
            x12 = 0;
        }
    } else {
        x12 = 0;
    }

    return x12;
}

function x13(q17y, q6y, q6x) {
    let x13;

    if (q17y === "Yes") {
        if (q6y === q6x) {
            x13 = 1;
        } else {
            x13 = 0;
        }
    } else {
        x13 = 0;
    }

    return x13;
}

function x14(q18x, q7x, q7y) {
    let x14;

    if (q18x === "Yes") {
        if (q7x === q7y) {
            x14 = 1;
        } else {
            x14 = 0;
        }
    } else {
        x14 = 0;
    }

    return x14;
}

function x15(q18y, q7y, q7x) {
    let x15;

    if (q18y === "Yes") {
        if (q7y === q7x) {
            x15 = 1;
        } else {
            x15 = 0;
        }
    } else {
        x15 = 0;
    }

    return x15;
}

function weighting(request) {
    let weight = [];
    const x = [
        "planVisitorsRoommate",
        "preferStudy",
        "bedtime",
        "roommateGender",
        "roommateLanguage",
        "preferredAgeRange",
        "btnradio4",
        "roommateMajor",
        "roommateSemester",
    ];
    let answerID = [
        request.body.Q1,
        request.body.Q2,
        request.body.Q3,
        request.body.Q4,
        request.body.Q5,
    ];

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 5; j++) {
            if (answerID[j] === x[i]) {
                weight[i] = 0.1;
                break;
            } else {
                weight[i] = 0.05;
            }
        }
    }

    return weight;
}

// Calculated the compatibility between the resident and the applicant.
function compatibility(request, resident, weight) {
    let fitness = [];
    for (let i = 0; i < resident.length; i++) {
        let array = [];
        let sum = 0;

        let X1 = x1(
            request.body.planVisitorsRoommate,
            resident[i].planVisitors
        );
        let X2 = x2(
            resident[i].planVisitorsRoommate,
            request.body.planVisitors
        );
        let X3 = x3(request.body.preferStudy, resident[i].preferStudy);
        let X4 = x4(request.body.bedtime, resident[i].bedtime);
        let X5 = x5(request.body.roommateGender, resident[i].gender);
        let X6 = x6(resident[i].roommateGender, request.body.gender);
        let X7 = x7(
            request.body.preferInternational,
            request.body.roommateLanguage,
            resident[i].roommateLanguage
        );
        let X8 = x8(
            resident[i].preferInternational,
            resident[i].roommateLanguage,
            request.body.roommateLanguage
        );
        let X9 = x9(request.body.preferredAgeRange, resident[i].age);
        let X10 = x10(resident[i].preferredAgeRange, request.body.age);
        let X11 = x11(request.body.btnradio4, resident[i].btnradio4);
        let X12 = x12(
            request.body.roommateMajor,
            request.body.major,
            resident[i].major
        );
        let X13 = x13(
            resident[i].roommateMajor,
            resident[i].major,
            request.body.major
        );
        let X14 = x14(
            request.body.roommateSemester,
            request.body.semester,
            resident[i].semester
        );
        let X15 = x15(
            resident[i].roommateSemester,
            resident[i].semester,
            request.body.semester
        );

        if (
            resident[i].btnradio7 === "handicapFriendlyNo" &&
            request.body.btnradio7 === "handicapFriendlyYes"
        ) {
            console.log("Handicap");
            break;
        } else if (
            parseInt(resident[i].budget) > parseInt(request.body.budget)
        ) {
            console.log("Budget");
            break;
        } else if (request.body.aalborgSection !== resident[i].aalborgSection) {
            console.log("Section");
            break;
        } else {
            array[0] = X1;
            array[1] = X2;
            array[2] = X3;
            array[3] = X4;
            array[4] = X5;
            array[5] = X6;
            array[6] = X7;
            array[7] = X8;
            array[8] = X9;
            array[9] = X10;
            array[10] = X11;
            array[11] = X12;
            array[12] = X13;
            array[13] = X14;
            array[14] = X15;
            console.log("X'er");
        }

        for (let j = 0; j < 15; j++) {
            sum += array[j] * weight[j];
        }

        let fit = {
            fitness: Math.round(sum * 100),
            email: resident[i].email,
            name: resident[i].firstName + " " + resident[i].lastName,
            aalborgSection: resident[i].aalborgSection,
            budget: resident[i].budget,
            handicapFriendly: resident[i].btnradio7,
        };
        fitness.push(fit);
    }

    fitness.sort((a, b) => (a.fitness < b.fitness ? 1 : -1));

    return fitness;
}

// Exporting the routes to the app.js file.
module.exports = router;
