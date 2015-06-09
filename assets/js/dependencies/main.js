$(function() {
  // Masthead drop down
  var smileySelect = new Drop({
    target: $('#nav-expand')[0],
    content: $('#nav-items').html(),
    position: 'bottom right',
    openOn: 'click',
    classes: 'drop-theme-basic nav-drop-down'
  });
});
