const { getDefaultConfig } = require("expo/metro-config");
const path = require('path');

const config = getDefaultConfig(__dirname);

// Save the original resolver if it exists (though usually it's null in default config)
const { resolveRequest: originalResolveRequest } = config.resolver;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Fix for @clerk/shared/error resolution issue
  if (moduleName === '@clerk/shared/error') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/@clerk/shared/dist/runtime/error.js'),
      type: 'sourceFile',
    };
  }

  // Chain to the original resolver or the default standard context resolver
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
