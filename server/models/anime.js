const baseModel = require('./base.js');

class animeModel extends baseModel {
  getName() {
    return 'anime';
  }
  getSchema() {
    return {
      title: {
        type: String,
        required: true
      },
      start_year: {
        type: String
      },
      end_year: {
        type: String
      },
      tag: {
        type: Array,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      stars: {
        type: Array,
        required: true
      },
      imgUrl: {
        type: String
      },
    }
  }
  list (query) {
    let params = {}
    let {title, desc, stars, start_year, end_year, tag, rate } = query
    if (title) {
      params.title = {
        $regex: '.*' + title +'.*',
        $options: 'i'
      }
    }
    if (desc) {
      params.desc = {
        $regex: '.*' + desc +'.*',
        $options: 'i'
      }
    }
    if (stars) {
      params.stars = {
        $elemMatch: {
          $regex: '.*' + stars +'.*',
          $options: 'i'
        }
      }
    }
    if (start_year) {
      params.start_year = {
        $gte: start_year
      }
    }
    if (end_year) {
      params.end_year = {
        $lte: end_year,
        // $exists: true,
        $ne: ""
      }
    }
    if (tag) {
      params.tag = {
        $all: tag
      }
    }
    let addition = {}
    if (rate) {
      addition.rate = rate
    }
    return this.model
      .find({ $query: params, addition })
      .sort(addition)
  }
}
module.exports = animeModel
