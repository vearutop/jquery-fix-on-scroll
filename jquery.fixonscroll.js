/**
 *
 */
;(function($) {
    $.fn.fixOnScroll = function(options) {
        this.each(function(){
            var b = $(this),
                o = {},

                sBoxTop = 'boxTop',
                sBoxHeight = 'boxHeight',
                sBlockHeight = 'blockHeight',
                sViewPortHeight = 'viewPortHeight',
                sFixedBottom = 'fixedBottom',
                sFixedTop = 'fixedTop',
                sForceBind = 'forceBind',

                status = 'top'; // bottom, f-top, f-bottom

            function option(key) {
                return typeof o[key] == 'function' ? o[key]() : o[key];
            }

            o[sBoxTop] = options[sBoxTop] || b.offset().top;
            o[sBoxHeight] = options[sBoxHeight] || b.parent().height();
            o[sBlockHeight] = options[sBlockHeight] || b.height() + (parseInt(b.css('marginTop')) || 0) + (parseInt(b.css('marginBottom')) || 0);
            o[sViewPortHeight] = options[sViewPortHeight] || function(){return $(window).height();};
            o[sFixedTop] = options[sFixedTop] || b.offset().top - option(sBoxTop);
            o[sFixedBottom] = options[sFixedBottom] || 0;
            o[sForceBind] = options[sForceBind] || 0;


            function setFixedShort() {
                /**
                 * top -> f-top
                 * f-top -> bottom
                 *
                 * bottom -> f-bottom
                 * f-bottom -> top
                 */
                if ('top' == status && 'f-top' != status) {
                    b.css({position: 'fixed', 'margin-top': 0, top: option(sFixedTop), bottom: 'auto'});
                    status = 'f-top';
                }
                else if ('bottom'== status && 'f-bottom' != status) {
                    b.css({position: 'fixed', 'margin-top': 0, top: 'auto', bottom: option(sFixedBottom)});
                    status = 'f-bottom';
                }
            }


            function setFixedLong() {
                /**
                 * top -> f-bottom
                 * f-bottom -> bottom
                 *
                 * bottom -> f-top
                 * f-top -> top
                 */

                if ('top' == status && 'f-bottom' != status) {
                    b.css({position: 'fixed', 'margin-top': 0, top: 'auto', bottom: option(sFixedBottom)});
                    status = 'f-bottom';
                }
                else if ('bottom'== status && 'f-top' != status) {
                    b.css({position: 'fixed', 'margin-top': 0, top: option(sFixedTop), bottom: 'auto'});
                    status = 'f-top';
                }
            }

            function setTop() {
                if ('top' != status) {
                    b.css({position: 'static', 'margin-top': 0, bottom: 'auto'});
                    status = 'top';
                }
            }

            function setBottom(top) {
                if ('bottom' != status) {
                    b.css({position: 'static', 'margin-top': top + 'px', bottom: 'auto'});
                    status = 'top';
                }
            }

            function scrollEvent() {
                var oBlockHeight = option(sBlockHeight),
                    oViewPortHeight = option(sViewPortHeight),
                    oBoxTop = option(sBoxTop),
                    oBoxHeight = option(sBoxHeight),
                    oFixedTop = option(sFixedTop),
                    oFixedBottom = option(sFixedBottom),
                    viewPortTop = ($("html").scrollTop() > 0) ? $("html").scrollTop() : $("body").scrollTop(),
                    viewPortBottom = viewPortTop + oViewPortHeight - oFixedTop - oFixedBottom,
                    boxBottom = oBoxTop + oBoxHeight,
                    boxBottomPadded = boxBottom - oBlockHeight,
                    boxTopPadded = oBoxTop + oBlockHeight;


                if (oBoxHeight <= oBlockHeight + oFixedTop + oFixedBottom) {
                    return;
                }

                if (oViewPortHeight > oBlockHeight) {
                    if (viewPortTop < oBoxTop) {
                        setTop();
                        return;
                    }

                    if (viewPortTop > boxBottomPadded - oFixedTop - oFixedBottom) {
                        setBottom(oBoxHeight - oBlockHeight - oFixedTop - oFixedBottom);
                        return;
                    }
                    setFixedShort();
                }


                else {
                    if (viewPortBottom < boxTopPadded) {
                        setTop();
                        return;
                    }
                    if (viewPortBottom > boxBottom - oFixedTop - oFixedBottom) {
                        setBottom(oBoxHeight - oBlockHeight - oFixedTop - oFixedBottom);
                        return;
                    }
                    setFixedLong();
                }
            }

            if (option(sForceBind) || option(sBoxHeight) > option(sBlockHeight)) {
                $(window).scroll(scrollEvent).resize(scrollEvent);
            }

        });

        return this;
    };
}(jQuery));