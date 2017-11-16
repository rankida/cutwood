'user strict';

const echo = (cutWood) => {
  return cutWood.write();
};

exports.load = (profileName) => {
  if (!profileName) {
    return echo;
  }

  if (profileName.toLowerCase() === 'server') {
    return (cutWood) => {
      return cutWood
        .evict(/^{"event":"ops"/)
        .colour(/error/, 'red')
        .write();
    };
  }

  return echo;
};
