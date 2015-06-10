$(function() {
  $('#settings-location').autocomplete({
    ajaxSettings: {
      url: '/user/cities',
      type: 'GET'
    },
    paramName: 'input',
    transformResult: function(data) {
      try {
        var result = JSON.parse(data);
      } catch(e) {
        return res.send(500);
      }

      var ret = {
        suggestions: []
      }

      for (var i = 0; i < result.predictions.length; i++) {
        var place = result.predictions[i];
        ret.suggestions.push({
          value: result.predictions[i].description.replace(', United States', '')
        })
      }
      return ret;
    }
  });
// ?input=madison&key=&sensor=false&types=(regions)
})