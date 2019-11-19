const configjson = require('./config.json') as IPortalConfig[];

interface IPortalConfig {
  env: string;
  uiHostname: string;
  apiServer: string;
}

const hostname = window && window.location && window.location.hostname;
let config = configjson.find(i => {
  return i.uiHostname === hostname;
}) || {
  env: 'error',
  apiServer: 'error',
  uiHostname: hostname
};

export { config };
