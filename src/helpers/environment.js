let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001'
    break;

  case 'wd54-client-deploy.herokuapp.com':
    APIURL = 'https://dlg-blue-deploy-server.herokuapp.com'
}

export default APIURL;