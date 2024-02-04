const Tour = require('./../models/tourModel');

// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`);
//     const id = parseInt(req.params.id);
//     const tour = tours.find(el => el.id === id)
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }
//     next();
// }

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({
            status: 'success',
            data: {
                tours: tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    // const tour = tours.find(el => el.id === id)
    // return res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: tour
    //     }
    // })
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

    // const newID = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({ id: newID }, req.body);
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours), err => {
    //         res.status(201).json({
    //             status: 'success',
    //             data: {
    //                 tour: newTour
    //             }
    //         })
    //     })
}

exports.updateTour = (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req, res) => {
    return res.status(204).json({
        status: 'success',
        data: null
    })
}