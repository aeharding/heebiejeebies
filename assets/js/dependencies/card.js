// editing a card frontend logic
var autoSizeText;
autoSizeText = function(className) {
  var el, elements, _i, _len, _results;
  elements = $('.' + className);
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
  $("abbr.timeago").timeago();

  $("#text-top").keyup(function(){
      $(".card-top").html(
        nl2br(escapeHtml($("#text-top").val()), false)
      );
      autoSizeText('card-top');
  });
  $("#text-bottom").keyup(function(){
      $(".card-bottom").html(
        nl2br(escapeHtml($("#text-bottom").val()), false)
      );
      autoSizeText('card-bottom');
  });

  $("#attribution-checkbox").click(function (){
    if($('#attribution-checkbox')[0].checked) {
      $(".card-author").css('visibility', 'visible');
    } else {
      $(".card-author").css('visibility', 'hidden');
    }
  });

  autoSizeText('card-top');
  autoSizeText('card-bottom');
  autoSizeText('card-author');

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
        $('#smiley-container img').attr('src', this.src);
        $('#smiley-input').val($(this).attr('smiley-number'));
      });
    });
  }

  if (/^((?!chrome).)*safari/i.test(navigator.userAgent)) {
    // is safari... not chrome
    $('html').addClass('safari');
  }
});

// HTML escape
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

// Convert our newlines to <br>s
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}