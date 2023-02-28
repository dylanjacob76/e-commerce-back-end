const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Product }
      ]
    });

    return res.json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product },
      ],
    });

    if (!tags) return res.json({ message: 'No tag found with that id!' });
    
    return res.json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create(req.body);
    return res.json(tags);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });

    return res.json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tags) return res.status(404).json({ message: 'No tag found with that id!' });

    return res.json(tags);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
