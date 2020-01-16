const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(_, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return response.status(200).json(dev);
    }

    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name, login, avatar_url, bio } = apiResponse.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      github_username,
      name: name || login,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    return response.status(201).json(dev);
  },

  async update(request, response) {
    try {
      const { username } = request.params;
      const {
        name,
        avatar_url,
        bio,
        techs,
        latitude,
        longitude
      } = request.body;

      let techsArray;
      if (techs) {
        techsArray = parseStringAsArray(techs);
      }

      let location;
      if (longitude && latitude) {
        location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        };
      }

      const conditions = { github_username: username };
      const update = {
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      };
      const options = {
        new: true,
        omitUndefined: true
      };

      const dev = await Dev.findOneAndUpdate(conditions, update, options);

      if (!dev) {
        return response.status(404).send();
      }

      return response.status(200).json(dev);
    } catch (error) {
      response.status(400).send(error);
    }
  },

  async destroy(request, response) {
    const { username } = request.params;

    const apiResponse = await Dev.deleteOne({ github_username: username });
    const statusCode = apiResponse.deletedCount ? 204 : 404;

    return response.status(statusCode).send();
  }
};
