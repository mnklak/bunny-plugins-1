const { findModuleByProps } = require("replugged");

module.exports = {
  start() {
    const UserProfile = findModuleByProps("getUserProfile");

    if (!UserProfile) return;

    const originalGetUserProfile = UserProfile.getUserProfile;

    UserProfile.getUserProfile = async (...args) => {
      const profile = await originalGetUserProfile(...args);

      const currentUserId = replugged.plugins.getExports("dev.replugged.core").getCurrentUser().id;
      const targetUserId = args[0];

      if (targetUserId === currentUserId) {
        profile.banner = "https://cdn.discordapp.com/banners/123456789012345678/yourbannerimage.png?size=512";
        profile.premiumType = 2; // Simula Nitro
      }

      return profile;
    };
  },

  stop() {
    const UserProfile = findModuleByProps("getUserProfile");
    if (UserProfile && UserProfile.getUserProfile.__original) {
      UserProfile.getUserProfile = UserProfile.getUserProfile.__original;
    }
  }
};
