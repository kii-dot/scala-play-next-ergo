/* eslint-disable no-undef */
function getSummary(cb) {
  return fetch("/ping", {
    accept: "application/json",
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getFeed(walletAddress, cb) {
  console.log(walletAddress)
  return fetch(`/feed/my/${walletAddress}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getFollowing(walletAddres, cb) {
  console.log(walletAddress)
  return fetch(`/profile/following/${walletAddress}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getSummary, getFeed, getFollowing };
export default Client;
