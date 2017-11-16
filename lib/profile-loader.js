'user strict';

const profiles = {
  echo: (cutwood) => cutwood.write()
};

exports.load = (newProfiles) => {
  Object.assign(profiles, (newProfiles || {}).profiles);
};

exports.get = (profileName) => {
  if (!profileName) {
    return profiles.echo;
  }

  if (typeof profileName === 'function') {
    return profileName;
  }

  return profiles[profileName] || profiles.echo;
};
