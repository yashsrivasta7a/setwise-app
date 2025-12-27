const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Save the original resolver if it exists (though usually it's null in default config)
const { resolveRequest: originalResolveRequest } = config.resolver;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Chain to the original resolver or the default standard context resolver
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
