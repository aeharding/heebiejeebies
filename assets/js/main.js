$(function() {
  // Masthead mobile drop down
  var smileySelect = new Drop({
    target: $('#nav-expand')[0],
    content: $('#nav-items-mobile').html(),
    position: 'bottom right',
    openOn: 'click',
    classes: 'drop-theme-basic nav-drop-down'
  });

  // Masthead user drop down
  var userSelect = new Drop({
    target: $('#user-expand')[0],
    content: $('#user-items').html(),
    position: 'bottom center',
    openOn: 'click',
    classes: 'user-drop-down'
  });
});
