
module.exports = {
  default: 'echo',
  profiles: {
    server: (cutWood) => {
      return cutWood
        .evict(/^{"event":"ops"/)
        .colour(/error/, 'red')
        .write();
    }
  }
};
