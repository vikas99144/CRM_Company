'use strict'


module.exports.configure = async (server) => {
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





