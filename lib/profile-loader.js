'user strict';

exports.load = (profileName) => {
  if (!profileName) {
    return (cutWood) => {
      return cutWood.write();
    };
  }

  if (profileName.toLowerCase() == "noops") {
    return (cutWood) => {
      return cutWood
        .evict(/^{"event":"ops"/)
        .write();
    };
  }
}
