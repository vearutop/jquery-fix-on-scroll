;(function($) {
    $.fn.fixOnScroll = function(options) {
        var b = $(this),

            o = $.extend({
                boxTop: 0,
                boxHeight: 0,
                blockHeight: b.height(),
                viewPortHeight: $(window).height()
            }, options),

            status = 'top'; // bottom, f-top, f-bottom


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

        function option(key) {
            return typeof o[key] == 'function' ? o[key]() : o[key];
        }

        function scrollEvent() {
            var blockHeight = option('blockHeight'),
                scrollTop = ($("html").scrollTop() > 0) ? $("html").scrollTop() : $("body").scrollTop(),
                viewPort = {top: scrollTop, height: option('viewPortHeight')},
                box = {top: option('boxTop'), height: option('boxHeight')};

            viewPort.bottom = viewPort.top + viewPort.height;
            box.bottom = box.top + box.height;
            box.bottomPadded = box.bottom - blockHeight;
            box.topPadded = box.top + blockHeight;

            if (box.height <= blockHeight) {
                return;
            }

            //console.log(box, box.bottomPadded, box.topPadded, viewPort, status);

            if (viewPort.height > b.height()) {
                if (viewPort.top < box.top) {
                    setTop();
                    return;
                }

                if (viewPort.top > box.bottomPadded) {
                    setBottom(box.height - blockHeight);
                    return;
                }
                setFixedShort();
            }


            else {
                if (viewPort.bottom < box.topPadded) {
                    setTop();
                    return;
                }
                if (viewPort.bottom > box.bottom) {
                    setBottom(box.height - blockHeight);
                    return;
                }
                setFixedLong();
            }
        }

        $(window).scroll(scrollEvent).resize(scrollEvent);
        return this;
    };
}(jQuery));