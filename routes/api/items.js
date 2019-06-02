const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route GET api/api/items
// @desc  get all Items
// @acess Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc  Create A Post
// @acess Public
router.post('/', (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        note: req.body.note,
        tipo: req.body.tipo,
        todoList: req.body.todoList
    });

    newItem.save().then(item => res.json(item));
});

router.put('/:id', (req, res) => {
    
    const newItem = new Item({
        title: req.body.title,
        note: req.body.note,
        tipo: req.body.tipo,
        todoList: req.body.todoList
    });
    var query = {'_id':req.body._id};
    Item.findOneAndUpdate(query,{todoList: req.body.todoList}).then(item => res.json(item));
});

// @route DELETE api/items:id
// @desc  Delete A Post
// @acess Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ sucess: true })))
    .catch(err => res.status(404).json({ sucess: false }));
    
});


module.exports = router;