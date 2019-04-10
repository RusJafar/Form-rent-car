(function($) {
  'use strict';

  var $filters = $('.toggle [data-filter]'), 
      $boxes = $('.boxes [data-style]');
  
  $filters.click(function(e) {
    e.preventDefault();
    var $this = $(this),
        $filterStyle = $this.attr('data-filter'),
        $selected = $('[data-style = "' + $filterStyle + '"]');
    
    $filters.removeClass('selected');
    $this.addClass('selected');
    
    if ($filterStyle == 'all') {
      $boxes.fadeOut().promise().done(function() {
        $(this).fadeIn();
      });
    } else {
      $boxes.fadeOut().promise().done(function() {
        $(this).filter($selected).fadeIn();
      });
    };
  });
})(jQuery);