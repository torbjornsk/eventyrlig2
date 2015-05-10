var EventyrView = function() {

  this.render = function() {
    this.el.html(EventyrView.template());
    return this;
  };

  this.initialize = function() {
    // Define a div wrapper for the view. The div wrapper is used to attach events.
    this.el = $('<div/>');
  };

  this.initialize();

};
EventyrView.template = Handlebars.compile($("#eventyr-tpl").html());
