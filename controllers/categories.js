/*
Imports
*/
const { Categorie } = require('../models/index');

/* 
Controllers categories
*/
const getCategories = async (req, res) => {
  try {
    const categoriesList = await Categorie.findAll({ attributes: ['name'] });
    res.status(200).json({
      ok: true,
      data: categoriesList,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unknown error, contact admin',
      error,
    });
  }
};

const postCategorie = async (req, res) => {
  try {
    const newCategorie = { ...req.body };
    const categorie = await Categorie.create(newCategorie);
    res.status(200).json({
      ok: true,
      data: categorie,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unknown error, contact admin',
      error,
    });
  }
};

module.exports = {
  getCategories,
  postCategorie,
};
