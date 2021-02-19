let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000'
    break;

  case 'wd54-client-deploy.herokuapp.com':
    APIURL = ''
}

export default APIURL;