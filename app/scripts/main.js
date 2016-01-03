'use strict';

page('/', index);
page('/:who/:repo/:branch', showTravisBranchStatus);
page('*', fallback);
page({ hashbang: true });

function index () {
  //TODO: default page
  document.querySelector('p').textContent = 'loading...';
}

function fallback () {
  //TODO: routing fallback
}

function getRequest (url) {
  var headers = {
    'Cache-Control': ''
  };
  return qwest.get(url, null, { headers: headers }).catch(errorHandler);
}

function getRepoId (owner, repo) {
  //TODO: validate owner and repo by some RegExp
  var endpoint = ['https://api.travis-ci.org/repos', owner, repo].join('/');
  return getRequest(endpoint).then(function (xhr) {
    return JSON.parse(xhr.response).id;
  });
}

function getBranchStatus (owner, repo, branch) {
  return getRepoId(owner, repo).then(function (id) {
    var endpoint = ['https://api.travis-ci.org/v3/repo', id, 'branch', branch].join('/');
    return getRequest(endpoint).then(function (xhr) {
      return JSON.parse(xhr.response);
    });
  });
}

function showTravisBranchStatus (ctx) {
  var params = ctx.params;
  getBranchStatus(params.who, params.repo, params.branch).then(function (wat) {
    //TODO: render page
    document.querySelector('p').textContent = JSON.stringify(wat);
  });
};

function errorHandler (error) {
  //TODO: errorHandler
}

