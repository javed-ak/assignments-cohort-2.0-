const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    })
    .then(() => {
        res.json({
            message: 'Admin created successfully'
        })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgLink = req.body.imgLink;

    Course.create({
        title,
        description,
        price,
        imgLink
    })
    .then((response) => {
        res.json({
            message: 'Course created successfully', courseId: response._id
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find()
    .then((response) => {
        res.json({
            courses: response
        })
    })
});

module.exports = router;