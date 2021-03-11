const router = require('express').Router();
const { create, getById, updateById, deleteById, getAllTrips } = require('../models/trips');

// /trips
router.get('/', async (req, res) => {
    // getAll()
    //     .then((rows) => {
    //         res.json(rows);
    //     })
    //     .catch((err) => console.log(err));

    try {
        const rows = await getAllTrips();
        res.render('trips/list', {
            arrUsers: rows
        });
    } catch (err) {
        console.log(err);
    }
});

// /trips/new
router.get('/new', (req, res) => {
    // Renderizar una vista (formulario.pug) que reprensente cada uno de los campos necesarios para crear un trip
    res.render('trips/form');
});

// /trips/create
router.post('/create', async (req, res) => {
    console.log(req.body);
    const result = await create(req.body);
    console.log(result);
    res.redirect('/trips');
});

// /trips/edit/
router.get('/edit/:idTrip', async (req, res) => {
    const user = await getById(req.params.idUser);
    res.render('users/formularioEdit', { user });
});

// /trips/update
router.post('/update', async (req, res) => {
    const result = await updateById(req.body);
    res.redirect('/users');
});

router.get('/delete/:idTrip', async (req, res) => {
    await deleteById(req.params.idUser);
    res.redirect('/users');
});

module.exports = router;    