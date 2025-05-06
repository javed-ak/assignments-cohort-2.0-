const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.create({
        username,
        password
    })
    res.json({
        message: "Admin created successfully"
    })
    
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        username,
        password
    })
    if(admin) {
        const token = jwt.sign({username}, SECRET_KEY)
        res.json({
            token: 'Bearer ' + token
        })
    } else {
        res.status(403).json({
            msg: "Username or Password are wrong!"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgLink = req.body.imgLink;

    const courses = await Course.create({
        title,
        description,
        price,
        imgLink
    })
    
    res.json({
        message: "Course created successfully", CourseId: courses._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();

    res.json({
        courses
    })
});

module.exports = router;