/**
* Movie.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    movie_path: {
      type: 'string'
    },
    thumbnail_id: {
      type: 'integer'
    }
  }
};
