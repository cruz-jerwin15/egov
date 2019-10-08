const router = require('express').Router();
let Barangay = require('../models/barangay.model');

router.route('/').get((req,res) =>{
    Barangay.find()
        .then(barangay =>res.json(barangay))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Barangay.findById(req.params.id)
        .then(barangay =>res.json(barangay))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) =>{
    Barangay.findByIdAndDelete(req.params.id)
        .then(() => res.json('Barangay deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) =>{
    Barangay.findById(req.params.id)
        .then(barangay => {
            barangay.username = req.body.username;
            barangay.barangayname = req.body.barangayname;
            barangay.date = Date.parse(req.body.date);

            barangay.save()
                    .then(() => res.json('Barangay updated!'))
                    .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const barangayname = req.body.barangayname;
    const date = Date.parse(req.body.date);

    const newBarangay = new Barangay({
        username,
        barangayname,
        date,
    });

    newBarangay.save()
        .then(() => res.json('Barangay added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;