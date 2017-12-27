module.exports = {
  $spinner: { value: require('./utils/spinner').default, type: 'constant' },
  $superagent: { value: require('superagent'), type: 'constant' }
};
