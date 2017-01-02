App.DossierView = Backbone.View.extend({

    template: 'src/template/dossierTemplate.html',
    uriPartial: 'src/template/partial/',
    templateList: {
        'assure': 'assureTemplate.html',
        'vehicule': 'vehiculeTemplate.html'
    },
    templatesFilled: [],

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
        this.renderMain();
    },

    /**
     * Charge les dépendances du fichier JS
     */
    renderMain: function () {

        var uriPartial = 'src/template/partial/',
            that = this,
            templatelists = this.templateList,
            templateMain = this.template;

        this.loadTemplate(uriPartial + templatelists.assure)
            .then(function (result) {
                return that.fillTemplate(result, 'assure', uriPartial + templatelists.vehicule);
            })
            .then(function (result) {
                return that.fillTemplate(result, 'vehicule', templateMain);
            })
            .then(function (main) {
                var mainTemplateFunc = _.template(main);
                var html = mainTemplateFunc({
                    templateList: that.templatesFilled,
                    model: that.model.get('resultats')
                });
                that.$el.html(html);
                $('ul.tabs').tabs();
            });
    },

    /**
     * Rempli le template depuis les données chargées et télécharge l'url suivante
     *
     * @param result
     * @param index
     * @param next
     * @return {*}
     */
    fillTemplate: function (result, index, next) {

        this.templatesFilled.push({
            id: index,
            html: _.template(result)(this.model.get('resultats'))
        });

        if(typeof next === "undefined")
            return '';

        return this.loadTemplate(next);
    },

    /**
     * Chargement du template depuis son URI
     *
     * @param name
     * @return jqXHR
     */
    loadTemplate: function (name) {
        return $.get(name);
    }
});