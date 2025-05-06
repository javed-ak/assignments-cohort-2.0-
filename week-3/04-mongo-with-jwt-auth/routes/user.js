const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const SECRET_KEY = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.create({
        username,
        password
    })
    
    res.json({
        message: 'User created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })

    if(user) {
        const token = jwt.sign({username}, SECRET_KEY);
        res.json({
            token: 'Bearer ' + token
        })
    } else {
        res.status(403).json({
            message: "Username or Password are wrong"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    const purchasedCourse = User.updateOne({
        username
    }, {
        "$push" : {
            purchasedCourse: courseId
        }
    })

    res.json({
        message: "Purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const user = await User.findOne({
        username
    })
    console.log(user)
    const purchasedCourses = await Course.find({
        _id: {
            '$in': user.purchasedCourse
        }
    })

    res.json({
        purchasedCourses
    })
});

module.exports = router