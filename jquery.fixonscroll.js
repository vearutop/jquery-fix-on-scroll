;(function($) {
    $.fn.fixOnScroll = function(options) {
        var b = $(this),
            o = {},

            sBoxTop = 'boxTop',
            sBoxHeight = 'boxHeight',
            sBlockHeight = 'blockHeight',
            sViewPortHeight = 'viewPortHeight',

            status = 'top'; // bottom, f-top, f-bottom

        o[sBoxTop] = options[sBoxTop] || b.offset().top;
        o[sBoxHeight] = options[sBoxHeight] || b.parent().height();
        o[sBlockHeight] = options[sBlockHeight] || b.height() + parseInt(b.css('marginTop')) + parseInt(b.css('marginBottom'));
        o[sViewPortHeight] = options[sViewPortHeight] || function(){return $(window).height();};



        function setFixedShort() {
            /**
             * top -> f-top
             * f-top -> bottom
             *
             * bottom -> f-bottom
             * f-bottom -> top
             */
            if ('top' == status && 'f-top' != status) {
                b.css({position: 'fixed', top: 0, bottom: 'auto'});
                status = 'f-top';
            }
            else if ('bottom'== status && 'f-bottom' != status) {
                b.css({position: 'fixed', top: 'auto', bottom: 0});
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
                b.css({position: 'fixed', top: 'auto', bottom: 0});
                status = 'f-bottom';
            }
            else if ('bottom'== status && 'f-top' != status) {
                b.css({position: 'fixed', top: 0, bottom: 'auto'});
                status = 'f-top';
            }
        }

        function setTop() {
            if ('top' != status) {
                b.css({position: 'relative', top: 'auto', bottom: 'auto'});
                status = 'top';
            }
        }

        function setBottom(top) {
            if ('bottom' != status) {
                b.css({position: 'relative', top: top + 'px', bottom: 'auto'});
                status = 'top';
            }
        }

        function option(key, static) {
            return !static && typeof o[key] == 'function' ? o[key]() : o[key];
        }

        function scrollEvent() {
            var oBlockHeight = option(sBlockHeight),
                oViewPortHeight = option(sViewPortHeight),
                oBoxTop = option(sBoxTop),
                oBoxHeight = option(sBoxHeight),
                viewPortTop = ($("html").scrollTop() > 0) ? $("html").scrollTop() : $("body").scrollTop(),
                viewPortBottom = viewPortTop + oViewPortHeight,
                boxBottom = oBoxTop + oBoxHeight,
                boxBottomPadded = boxBottom - oBlockHeight,
                boxTopPadded = oBoxTop + oBlockHeight;


            if (oBoxHeight <= oBlockHeight) {
                return;
            }

            if (oViewPortHeight > b.height()) {
                if (viewPortTop < oBoxTop) {
                    setTop();
                    return;
                }

                if (viewPortTop > boxBottomPadded) {
                    setBottom(oBoxHeight - oBlockHeight);
                    return;
                }
                setFixedShort();
            }


            else {
                if (viewPortBottom < boxTopPadded) {
                    setTop();
                    return;
                }
                if (viewPortBottom > boxBottom) {
                    setBottom(oBoxHeight - oBlockHeight);
                    return;
                }
                setFixedLong();
            }
        }

        if (option(sBoxHeight) > option(sBlockHeight)) {
            $(window).scroll(scrollEvent).resize(scrollEvent);
        }

        return this;
    };
}(jQuery));