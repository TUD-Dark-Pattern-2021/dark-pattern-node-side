const baseModel = require('./base.js');
class userModel extends baseModel {

  getName() {
    return 'dp';
  }
  getSchema() {
    return {
      url: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      country_rank: {
        type: Number,
        required: true
      },
      deceptive:{
        type: Boolean,
        required: true
      },
      dp:{
        type: Boolean,
        required: true
      },
      global_rank:{
        type: Number,
        required: true
      },
      page_views_per_million:{
        type: Number,
        required: true
      },
      page_views_per_user:{
        type: Number,
        required: true
      },
      reach_per_million:{
        type: Number,
        required: true
      },

      // favorites: [
      //   commons.getInst(animeModel).getSchema()
      // ],
      // passsalt: String,
      // add_time: Number,
      // up_time: Number,

    }
  }
  checkRepeat(email) {
    return this.model.countDocuments({
      email: email
    });
  }
  checkUserRepeat(username) {
    return this.model.countDocuments({
      username
    });
  }
  save(data) {
    let dp = new this.model(data);
    return dp.save();
  }
  findById(id) {
    return this.model.findOne({
      _id: id
    });
  }
  findByUsername(username){
    return this.model.findOne({username: username});
  }
  findByEmail(email) {
    return this.model.findOne({email: email});
  }
  findByToken(resetPasswordToken){
    return this.model.findOne({resetPasswordToken: resetPasswordToken});
  }

  update(id, data) {
    return this.model.update(
      {
        _id: id
      },
      data
    );
  }
  updatePassword(token, data){
    return this.model.update(
      {
        resetPasswordToken: token
      },
      data
    );
  }
  addToFavorite(id, data) {
    console.log(id, data, 'data')
    return this.model.update(
      {
        _id: id
      },
      { "$push":
          { "favorites": data }
      }
    );
  }
  delFavorite (uid, id) {
    return this.model.update(
      {
        _id: uid
      },
      { "$pull":
          { "favorites": {
              _id: id
            }
          }
      }
    );
  }
  updateToken(email,data){
    return this.model.update(
      {
        email: email
      },
      data
    );
  }
  del (_id) {
    return this.model.deleteOne({
      _id
    })
  }
}

module.exports = userModel;
