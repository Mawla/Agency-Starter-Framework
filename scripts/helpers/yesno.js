module.exports.yesno = (str) => {
  str = str.toLowerCase();
  if (str === 'yes' || str === 'y' || str === 'true') return true;
  return false;
};
