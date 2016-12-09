App.DossierView = Backbone.View.extend({

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

        var that = this,
            t = null,
            html = '',
            templatesLoaded = [],
            uri = 'src/template/partial/' ;

        this.loadTemplate('src/template/dossierTemplate.html', function (dossierTemplate)
        {
            // Affectation du template
            t = _.template(dossierTemplate);

            for(var id in that.templateList)
            {
                that.loadTemplate( uri + that.templateList[id], function(template)
                {
                    templatesLoaded.push({
                        id: id,
                        html: template
                    });
                    console.log(templatesLoaded);
                }, that.model.get('resultats'));
            }

            html = t({
                model : that.model.get('resultats'),
                templateList : templatesLoaded
            });
            that.$el.html(html);
            $('ul.tabs').tabs();
        });
    },

    /**
     * Permet de load un fichier de template avec injection de contenu ou non.
     *
     * @param name
     * @param callback
     * @param inject
     */
    loadTemplate: function (name, callback, inject) {
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
        var that = this;
    }
});