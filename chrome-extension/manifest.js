import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

export const isFirefox = process.env.__FIREFOX__ === 'true';

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  host_permissions: ['<all_urls>'],
  permissions: ['storage', 'https://teams.microsoft.com/v2/*', 'https://teams.cloud.microsoft/*','alarms'],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module'
  },
  icons: {
    128: 'icon-128.png'
  },
  content_scripts: [
    {
      matches: ['https://teams.microsoft.com/v2/*'],
      js: ['content/index.iife.js']
    },
    {
      matches: ['https://teams.cloud.microsoft/*'],
      js: ['content/index.iife.js']
    }
  ],
  // devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*']
    }
  ]
};

export default manifest;
