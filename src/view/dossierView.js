App.DossierView = Backbone.View.extend({
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
        var that = this;
        $.ajax({
            url: 'src/template/dossierTemplate.html'
        }).done(function(template){
            that.formatMember(that.model.get('resultats').membres);
            that.$el.html(_.template(template)(that.model.get('resultats')));
            $('ul.tabs').tabs();

            return that;
        });
    },
    formatMember: function (membres) {
        var templatesName = [];
        if(membres != null && membres.length) {

            for(var m in membres) {
                if(m != null && membres[m] != null && membres[m].hasOwnProperty('qualite')) {
                    templatesName[membres[m].qualite] = membres[m].entite;
                }
            }
        }
    }
});