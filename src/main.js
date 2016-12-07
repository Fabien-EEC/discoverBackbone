var _sync = Backbone.sync,
    login = 'thierno',
    password = 'expertise';

Backbone.sync = function(method, model, options) {

    if( model && (method === 'create' || method === 'update' || method === 'patch') ) {
        options.contentType = 'application/json';
        options.data = JSON.stringify(options.attrs || model.toJSON());
    }

    if(options.data == null)
        options.data = {};

    _.extend( options.data, {
        'token': App.token,
        'login': login
    });

    return _sync.call( this, method, model, options );
};

// Connexion
$.ajax({
    url: 'http://localhost/api/user/login',
    dataType: 'json',
    data: {
        'login': login,
        'password': password
    }
})
.done(function (data) {
    if(data.response === 'OK')
    {
        App.token = data.token;
        App.view = new App.MainView({el: $('#body')});
    }
    else
        console.log('Connexion en erreur');
});



