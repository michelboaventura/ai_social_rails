import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  dataUrl: function(){ return this.get('dataUrl'); }.property('dataUrl'),
  width:    function(){ return this.get('width'); }.property('width'),
  height:   function(){ return this.get('height'); }.property('height'),
  _id:      function(){ return this.get('_id'); }.property('_id'),
  style:    function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  count: 0,

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(data){

    // Initialize variables
    let component = this;

    let margin = {top: 100, left: 150, right: 20, bottom: 10};

    let colors = { scale: gViz.helpers.colors.linear([0, 1], ["red", "lightgray", "blue"]) };

    component._var = gViz.vis.matrix_chart()
      ._var(component._var)
      ._class("sentiment-analysis-chart")
      .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
      .margin(margin)
      .data(data)
      .colors(colors)
      .legend_units("continuous")
      .legend_title("Score de Sentimento")
      .legend_domain([0,1])
      .build();
  },

  didInsertElement: function(){
    let component = this;
    let dataUrl = component.get('dataUrl');

    // Fixes max width to prevent svg-overflow
    let container = $(".gViz-wrapper[data-id='"+component.get('_id')+"']");
    container.css("max-width", container.outerWidth());

    // Get data from API
    gViz.helpers.loading.show();
    $.get(dataUrl, function(data) {

      if (data.length === 0) {
        component.set("empty", true);
        if(data["msg"]) { component.set("msg", data["msg"]); }
      }

      else { component.draw(data[0]); }

    }, "json")
    // Hide loading div and render error
    .fail(function() {
      gViz.helpers.loading.hide();
      console.log("Error");
    })
    .done(function() {
      gViz.helpers.loading.hide();
      //console.log("complete");
    });
  },
});
