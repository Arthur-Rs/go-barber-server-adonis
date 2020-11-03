"use strict";

const Helpers = use("Helpers");

class StaticController {
  async show({ params, response }) {
    const { file } = params;

    response.download(Helpers.tmpPath(`uploads/${file}`));
  }
}

module.exports = StaticController;
