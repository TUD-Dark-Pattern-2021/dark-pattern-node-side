const baseController = require('./base.js');
const commons = require('../utils/commons');
const animeModel = require('../models/anime.js');

class animeController extends baseController {
  constructor(req, res) {
    super(req, res);
  }
  async list (req, res) {
    const {query} = req
    const animeInst = commons.getInst(animeModel)
    let result = await animeInst.list(query)
    res.send(commons.resReturn(result))
  }
}

module.exports = animeController;
