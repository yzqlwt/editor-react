const { remote } = window.require('electron');
const { join } = window.require('path');
const fs = window.require('fs');

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

export const getResourcePath = function() {
  let shareObject = remote.getGlobal('shareObject');
  return shareObject.resourcePath;
};

export const getIconPath = function(name) {
  let path = getResourcePath();
  return join(path, 'assets', 'images', name);
};

export const getServerPath = function() {
  let path = getResourcePath();
  return join(path, 'assets', 'kernel', 'EasyStudio.exe');
};

export const getAddonPath = function() {
  let path = getResourcePath();
  return join(path, 'assets', 'Release', 'addon.node');
};

export const getConfigPath = function() {
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  return join(USER_HOME, 'AppData', 'Local', 'EasyStudio', 'config.json');
};

export const getTokenPath = function() {
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  return join(USER_HOME, 'AppData', 'Local', 'EasyStudio', 'token.json');
};

export const getImageCachePath = function(){
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  const path =  join(USER_HOME, 'AppData', 'Local', 'EasyStudio', 'tiny');
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  return path;
}

export const getCachePath = function() {
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  return join(USER_HOME, 'AppData', 'Local', 'EasyStudio');
};

export const getTpPath = function(){
  let path = getResourcePath();
  return join(path, 'assets', 'Release', "assets", "TexturePacker.exe");
}

export const getConfig = function() {
  const file = getConfigPath();
  if (fileExists(file)) {
    let content = fs.readFileSync(file);
    return JSON.parse(content == "" ? "{}" : content);
  }
  return {};
};

export const getCCSPath = function() {
  const config = getConfig();
  return config.CCSPath;
};

export const setCCSPath = function(value) {
  const file = getConfigPath();
  let config = {};
  if (fileExists(file)) {
    let content = fs.readFileSync(file);
    config = JSON.parse(content == "" ? "{}" : content);
  }
  config.CCSPath = value;
  fs.writeFileSync(file, JSON.stringify(config));
};

export const setToken = function(token) {
  const file = getTokenPath();
  if (!fs.existsSync(getCachePath())) {
    fs.mkdirSync(getCachePath());
  }
  fs.writeFileSync(file, token, { flag: 'w+' });
};

export const getToken = function() {
  const file = getTokenPath();
  if (fileExists(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
  return null;
};

export const getPathProperty = function(dataProperty){
  const property = find(get(dataProperty, 'response', []), (property) => property.name == 'path');
  if (property) {
    return property;
  }
  return {}
}

const init = function(){
  if (!fs.existsSync(getCachePath())) {
    fs.mkdirSync(getCachePath());
  }
  const flaText = join(getCachePath(), "fla.txt")
  if (fs.existsSync(flaText)){
    fs.unlinkSync(flaText);
  }
}
init()
