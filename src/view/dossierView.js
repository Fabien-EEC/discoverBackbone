App.DossierView = Backbone.View.extend({

    templateList: [
        'assureTemplate.html',
        'vehiculeTemplate.html'
    ],

    initialize: function () {
        var that = this;
        this.model = new App.DossierModel({ id : 441331880});
        this.model.fetch({
            success: function () {
                that.render();
            }
        });
    },
    render: function () {

        var that = this,
            t = null,
            html = '',
            templatesLoaded = [],
            uri = 'src/template/partial/' ;

        this.loadTemplate('src/template/dossierTemplate.html', function (dossierTemplate) {

            for(var path in that.templateList)
            {
                that.loadTemplate( uri + that.templateList[path], function(template){
                    templatesLoaded.push(template);
                    console.log('ici');
                }, that.model.get('resultats'));
            }
            t = _.template(dossierTemplate);
            html = t({
                model : that.model.get('resultats'),
                templateList : templatesLoaded
            });
            that.$el.html(html);
            $('ul.tabs').tabs();
        });
    },
    // formatMember: function (membres) {
    //     var templatesName = {};
    //     if(membres != null && membres.length) {
    //         for(var m in membres) {
    //             if(m != null && membres[m] != null && membres[m].hasOwnProperty('qualite')) {
    //                 templatesName[membres[m].qualite] = {
    //                     data: membres[m].entite,
    //                     templatePath: 'src/template/partial/' + membres[m].qualite.toLowerCase() + 'Template.html'
    //                 };
    //             }
    //         }
    //     }
    //
    //     console.log(templatesName);
    // },

    /**
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