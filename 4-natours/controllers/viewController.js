const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {

    //1) Get tour data from collection
    const tours = await Tour.find();

    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
})

exports.getTour = catchAsync(async (req, res) => {
    const slug = req.params.slug;
    const tour = await Tour.findOne({ slug: slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    res.status(200).render('tour', {
        title: 'The Forest Hiker',
        tour
    });
})