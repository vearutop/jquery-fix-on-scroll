jquery-fixOnScroll
==================

jQuery plugin for fixing elements in bounds on scroll over

Demo: http://vearutop.github.io/jquery-fixOnScroll/demo.html

## $(element).fixOnScroll(options) ##
__options__
An object of properties:
* _boxTop_ - box top bound in pixels, default b.offset().top;
* _boxHeight_ - distance between top and bottom bounds, default b.parent().height();
* _blockHeight_ - height of element, default b.height() + parseInt(b.css('marginTop')) + parseInt(b.css('marginBottom'))
* _viewPortHeight_ - height of visible part of th box, default function(){return $(window).height();};

Each property can be either scalar or function. Empty properties are replaced with default values.
