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
            that.$el.html(_.template(template)(that.model.get('resultats')));
            $('ul.tabs').tabs();
        });

        return this;
    }
});