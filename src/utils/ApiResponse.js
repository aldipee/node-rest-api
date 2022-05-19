function buildResponse({ message, data, error_code = null }) {
  // eslint-disable-next-line camelcase
  if (error_code) {
    return {
      success: false,
      message,
      error_code,
      data: null,
    };
  }
  return {
    success: true,
    message,
    data,
  };
}

module.exports = {
  buildResponse,
};
