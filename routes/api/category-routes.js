const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    })
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // include its associated Products
  try {
    const catergoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catergoryData) {
      res.status(404)._construct({ message: 'No category found with that ID!'});
    }
    res.status(200).json(catergoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    if (req.body) {
      const newCategory = await Category.create(req.body);
      
      res.status(200).json(newCategory);
    }
    else {
      res.status(400).json({ message: "Error! Can't create new category."})
    }
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    if(req.body && req.params.id) {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      })

      if (categoryData === 0) {
        res.status(400).json({ message: "Error! No data."});
      }
    }
    res.json(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: req.params.id,
    })

    if (!categoryData) {
      res.status(400).json({ message: "Error, no category found with this ID!"});
    }
    res.json(200).json(categoryData);
    
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
