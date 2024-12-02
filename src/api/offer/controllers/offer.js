"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["offers"] }
      );
      //console.log(user);
      for (let i = 0; i < user.offers.length; i++) {
        //console.log(user.offers[i]);
        const offer = user.offers[i];
        await strapi.entityService.delete("api::offer.offer", offer.id);
      }
      return { message: "All offers deleted" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));
