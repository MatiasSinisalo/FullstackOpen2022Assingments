const getToken = (request, response, next) => {
  const auth = request.get("authorization");

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    request.token = auth.substring(7);

    next();
  } else {
    request.token = null;
    next();
  }
};

module.exports = getToken;
