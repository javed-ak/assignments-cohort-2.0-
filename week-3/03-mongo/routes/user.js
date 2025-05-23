const { Router, response } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    .then(() => {
        res.json({
            message: 'User created successfully'
        })
    })
});

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find()
    .then((courses) => {
        res.json({
            courses
        })
    })

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username
    }, {
        "$push" : {
            purchasedCourses: courseId
        }
    })
    .then(() => {
        res.json({
            message: "Purchased Successfully"
        })
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({
        username: req.headers.username
    })
    .then((user) => {
        Course.find({
            _id: {
                '$in' : user.purchasedCourses
            }
        })
        .then((purchasedCourses) => {
            res.json({
                purchasedCourses
            })
        })
    })
});

module.exports = router