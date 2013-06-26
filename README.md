jquery-fixOnScroll
==================

jQuery plugin for fixing elements in bounds on scroll over

Demo: http://vearutop.github.io/jquery-fixOnScroll/demo.html

## $(element).fixOnScroll(options) ##
__options__
An object of properties:
* _boxTop_ - box top bound in pixels, default _$(element).offset().top_;
* _boxHeight_ - distance between top and bottom bounds, default _$(element).parent().height()_;
* _blockHeight_ - height of element, default _$(element).height() + parseInt($(element).css('marginTop')) + parseInt($(element).css('marginBottom'))_;
* _viewPortHeight_ - height of visible part of th box, default _function(){return $(window).height();}_;
* _fixedTop_ - top position of element in fixed mode, default _($(element).offset().top - __boxTop__)_ which is usually 0;
* _fixedBottom_ - bottom position of element in fixed mode, default 0;

Each property can be either scalar or function. Empty properties are replaced with default values.

