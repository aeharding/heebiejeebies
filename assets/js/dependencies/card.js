// editing a card frontend logic
var autoSizeText;

autoSizeText = function(className) {
  var el, elements, _i, _len, _results;
  elements = $('#' + className);
  if (elements.length < 0) {
    return;
  }
  _results = [];
  for (_i = 0, _len = elements.length; _i < _len; _i++) {
    el = elements[_i];
    $(el).css('font-size', '');
    _results.push((function(el) {
      var resizeText, _results1;
      resizeText = function() {
        var elNewFontSize;
        elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
        return $(el).css('font-size', elNewFontSize);
      };
      _results1 = [];
      while (el.scrollHeight - 7 > el.offsetHeight) {
        _results1.push(resizeText());
      }
       return _results1;
    })(el));
  }
  return _results;
};


$(function() {

  $("#text-top").keyup(function(){
      $("#card-top").text(
        $("#text-top")
          .val()
        );
      autoSizeText('card-top');
  });
  $("#text-bottom").keyup(function(){
      $("#card-bottom").text(
        $("#text-bottom")
          .val()
        );
      autoSizeText('card-bottom');
  });

  autoSizeText('card-top');
  autoSizeText('card-bottom');

  jQuery("abbr.timeago").timeago();

  // Card drop down
  if ($('#smiley-container').length) {
    var smileySelect = new Drop({
      target: $('#smiley-container')[0],
      content: $('#smiley-content').html(),
      position: 'bottom center',
      openOn: 'click',
      classes: 'drop-theme-arrows drop-theme-arrows-bounce smiley-menu'
    }).on('open', function() {
      $('.smiley-select').click(function(e) {
        $('#card-smiley').attr('src', this.src);
        $('#smiley-container').attr('src', this.src);
        $('#smiley-input').val($(this).attr('smiley-number'));
      });
    });
  }


});

function deleteCard(id) {
  swal({
    title: "Error!",
    text: "Here's my error message!",
    type: "error",
    confirmButtonText: "Cool"
  });
}