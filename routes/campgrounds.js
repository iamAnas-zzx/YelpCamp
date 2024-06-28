const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campground = require('../controllers/campgrounds');
const multer  = require('multer');
// express will look automatically for js file
const { storage } = require('../cloudinary');
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campground.index))
    //first validate than upload
    .post(isLoggedIn, upload.array('image') , (req, res , next) => {
        console.log(req.files); // Check the files received
        next();
    }, validateCampground, catchAsync(campground.createCampground));
    // .post( upload.array('image') , (req,res)=>{
    //     console.log( req.body);
    //     console.log( req.files);
    //     res.send("It worked")
    // })
router.get('/new', isLoggedIn, campground.newCampground);

router.route('/:id')
    .get(catchAsync(campground.searchCampground))
    .put(isLoggedIn, isAuthor, upload.array('image') , catchAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.editCampground));

module.exports = router;