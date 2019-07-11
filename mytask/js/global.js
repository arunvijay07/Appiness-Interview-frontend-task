// Header Menu
$('.navbar-header .navbar-toggle').click(function(){
	$('.tabbable').toggleClass('run');
	if ($('.tabbable').hasClass('run')){
		$('body,html').css({"position": "fixed"});

		$('.tabbable').animate({
			right: "0",
		}, 500);
	}else{
		$('body,html').css({"position": "inherit"});
		$('.tabbable').animate({
			right: "-1500px",
		}, 800);
	}
});

// Header Menu on hover
$(document).on('mouseenter', '.tabbable [data-toggle="tab"]',  function (e) {
	$(this).tab('show');
});

(function ($) {
    $(function () {
        $(document).off('click.bs.tab.data-api', '[data-hover="pill"]');
        $(document).on('mouseenter.bs.tab.data-api', '[data-toggle="pill"], [data-hover="pill"]', function () {
            $(this).tab('show');
        });
    });
})(jQuery);

// Responsive Global Functions on dom ready
if($(window).width() < 992 ){
	myFunc();
}
if($(window).width() > 992 ){
	myFuncx();
}

// Responsive Global Functions on window resize
$( window ).resize(function() { 
	if($(window).width() < 992 ){
		myFunc();
	}
	if($(window).width() > 992 ){
		myFuncx();
	}
});

// Collapse Sitemap
$('.sitemap h3').on('click', function () {
	$(this).toggleClass('act');
});

$( ".tooltipCustom" ).click(function() 
			{
				// problem: $( ".icon_holder" ) selects multiple elements!!!
				$( ".tooltipshow" ).toggleClass('show'); 

				setTimeout(function()
				{
					$( ".tooltipshow" ).removeClass('show');

				}, 10000);
});

// Responsive
function myFunc(){
		$( "#eq01 .nav" ).appendTo( $( "#eq1" ) );
		$( "#eq02 .nav" ).appendTo( $( "#eq2" ) );
		$( "#eq03 .nav" ).appendTo( $( "#eq3" ) );
		$( "#eq04 .nav" ).appendTo( $( "#eq4" ) );
		$( "#eq05 .nav" ).appendTo( $( "#eq5" ) );
		$(".mNav .nav-tabs>li>a").attr("data-toggle","tab");
		
		$('.mNav .nav-tabs>li>a').addClass('Open');
		
		$('.mNav .nav-tabs>li').removeClass('active');
		
		$(".mNav .nav-tabs li").on('click', function() {
			var theThis = $(this);
			theThis.toggleClass('active').siblings().removeClass('active');
		});
		
		$('.nav-tabs').on('show.bs.tab', 'a', function(event) {
			event.preventDefault();
		});
		$('.nav-tabs').on('hide.bs.tab', 'a', function(event) {
			event.preventDefault();
		});
	}

// Desktop
function myFuncx(){
		$( "#eq1 .nav" ).appendTo( $( "#eq01" ) );
		$( "#eq2 .nav" ).appendTo( $( "#eq02" ) );
		$( "#eq3 .nav" ).appendTo( $( "#eq03" ) );
		$( "#eq4 .nav" ).appendTo( $( "#eq04" ) );
		$( "#eq5 .nav" ).appendTo( $( "#eq05" ) );
		$(".mNav .nav-tabs>li>a").removeAttr("data-toggle","tab");
		
		$('.mNav .nav-tabs>li>a').removeClass('Open');
	}
	
// Searchbox
if (typeof jQuery === "undefined") { throw new Error("jQuery required"); }

+function ($) {
  'use strict';

  // SEARCHBAR CLASS DEFINITION
  // =========================

  var backdrop = '.searchbar-backdrop';
  var toggle   = '[data-toggle="searchbar"]';
  var Searchbar = function (element) {
    $(element).on('click.mr.searchbar', this.toggle);
  };

  Searchbar.VERSION = '1.0.0';

  Searchbar.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open') || (typeof isXS == 'function' && isXS());

    if (!isActive) {
        
      clearMenus();
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="searchbar-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }
      
      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.mr.searchbar', relatedTarget));

      if (e.isDefaultPrevented()) return;
      e.preventDefault();

      $parent.find('input').trigger('focus');
      
      $parent
        .toggleClass('open')
        .trigger('shown.mr.searchbar', relatedTarget);

        return false;
    }
  };

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove();
    $(toggle).each(function () {
      var $parent = getParent($(this));
      var relatedTarget = { relatedTarget: this };
      if (!$parent.hasClass('open')) return;
      $parent.trigger(e = $.Event('hide.mr.searchbar', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $parent.removeClass('open').trigger('hidden.mr.searchbar', relatedTarget);
    });
  }

  function getParent($this) {
    var selector = $this.attr('data-target');
    
    if (!selector) {
      return $this.parents('form');
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }


  // SEARCHBAR PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('mr.searchbar');

      if (!data) $this.data('mr.searchbar', (data = new Searchbar(this)));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.searchbar;

  $.fn.searchbar             = Plugin;
  $.fn.searchbar.Constructor = Searchbar;


  // SEARCHBAR NO CONFLICT
  // ====================

  $.fn.searchbar.noConflict = function () {
    $.fn.searchbar = old;
    return this;
  };


  // APPLY TO STANDARD SEARCHBAR ELEMENTS
  // ===================================

  $(document)
    .on('click.mr.searchbar.data-api', clearMenus)
    .on('click.mr.searchbar.data-api', '.searchbar', function (e) { e.stopPropagation(); })
    //.on('focus.mr.searchbar.data-api', toggle, Searchbar.prototype.toggle) // this causes the focus event to trigger twice
    .on('click.mr.searchbar.data-api', toggle, Searchbar.prototype.toggle);


}(jQuery);