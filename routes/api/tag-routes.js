const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // include its associated Product data
  try {
    const tagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        { model: Product, 
          through: ProductTag, 
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        }
      ]
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ["id", "tag_name"],
      include: [
        { 
          model: Product, 
          through: ProductTag, 
          attributes: ["id", "product_name", "price", "stock", "category_id"], 
        }
      ],
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if (req.body) {
      const newTag = await Tag.create({
        tag_name: req.body.tag_name,
      });

      res.status(200).json(newTag);
    }
    else {
      res.status(404).json({ message: "Error! Tag can't be created." });
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if(req.body && req.params.id) {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      })

      if (tagData === 0) {
        res.status(400).json({ message: "Error! No data found."});
      }
    }
    res.json(200).json(tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(400).json({ message: "No tag found with this id!" });
      return;
    }
    
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
