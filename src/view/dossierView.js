App.DossierView = Backbone.View.extend({
    template: 'src/template/dossierTemplate.html',
    templateList: {
        'assure': 'assureTemplate.html',
        'vehicule': 'vehiculeTemplate.html'
    },

    initialize: function () {
        var that = this;
        this.model = new App.DossierModel({ id : 441331880});
        this.model.fetch({
            success: function () {
                that.render();
            }
        });
    },

    /**
     * Rendu de la page d'un dossier.
     */
    render: function () {
        var datas = this.loadSecondaryTemplate();
    },

    loadSecondaryTemplate: function () {

        var that = this,
            uri = 'src/template/partial/',
            templatesLoaded = [];

        _.chain(this.templateList)
            .map(function (tmpLoaded, index) {
                return {
                    id: index,
                    promise: that.loadTemplate2(uri + tmpLoaded)
                }
            })
            .map(function (datas) {
                datas.promise.then(function (value) {
                    return {
                        id: datas.id,
                        html: value(that.model.get('resultats'))
                    }
                });
            });
    },

    /**
     *
     * @param mainTemplate
     */
    renderMain: function (mainTemplate) {

        var t = null,
            that = this,
            html = '',
            templatesLoaded = [],
            uri = 'src/template/partial/';

        // Affectation du template
        t = _.template(mainTemplate);

        _.each(this.templateList, function (value, index)
        {
            that.loadTemplate( uri + value, function(template)
            {
                templatesLoaded.push({
                    id: index,
                    html: template
                });
            }, that.model.get('resultats'));
        });


        html = t({
            model : this.model.get('resultats'),
            templateList : templatesLoaded
        });

        this.$el.html(html);
        $('ul.tabs').tabs();
    },

    /**
     * Permet de load un fichier de template avec injection de contenu ou non.
     *
     * @param name
     * @param callback
     * @param inject
     */
    loadTemplate: function (name, callback, inject) {

        var that = this;
        $.ajax({
            url: name,
            async: false
        }).done(function(template){
            if(typeof inject !== 'undefined' && inject != null)
            {
                var datas = _.template(template)(inject);
                callback(datas);
            }
            else
                callback(template);

            return that;
        });

    },

    loadTemplate2: function (name) {
        return $.get(name);

        // $.ajax({
        //     url: name
        // }).done(function(template){
        //     if(typeof inject !== 'undefined' && inject != null)
        //         return  _.template(template)(inject);
        //     else
        //         return template;
        //
        // });
    }
});