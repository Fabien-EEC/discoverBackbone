App.MainView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(new App.DossierView({ el: this.$el}));
        return this;
    }
});