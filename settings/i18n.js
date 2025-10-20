'use strict'


module.exports.configure = async (server) => {

    console.log('settings:i18n:configure:REGISTERING HAPI - SWAGGER')

    await server.register({
         plugin: require('hapi-i18n'),
        options: {
          locales: ['de', 'en', 'fr'],
          directory: './locales',
          defaultLocale: 'en'
        }
      }, (err) => {
         console.log(err);
      })
    return true;
}





