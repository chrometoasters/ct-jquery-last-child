// http://markdalgleish.com/2011/03/self-executing-anonymous-functions/

( function($) {

    var $container = $('.polyfill'); // this must be present in the page, wrapping the .polyfill--contents you wish to polyfill
    var $contents = $('.polyfill--contents');
    var parent_selector = '[class^="l-"], [class*=" l-"]';
    var child_selector = '.colgroup, .col, [class^="lc-"], [class*=" lc-"]';
    var polyfill_class = 'last-child';

    if ( ! $container.length || ! $contents.length ) {
        return;
    }

    // detach container from DOM for heavy manipulation of contents
    // http://flippinawesome.org/2013/11/25/writing-better-jquery-code/
    $contents.detach();

    // LAST-CHILD
    // http://jsfiddle.net/dotherightthing/yLUMf/

    // as layout containers may use several classes,
    // we check for both a selector starting with 'l-'
    // and a selector containing 'l-'
    var $layouts = $contents.find( parent_selector );

    // Use setTimeout to avoid script timeouts / crashes
    $layouts.each( function(i, item) {

        setTimeout( function() {

            // .grid > .colgroup:last-child
            // .grid > .col:last-child
            var $c = $(item).children( child_selector );
            $c.last().addClass( polyfill_class );

            // .grid > .colgroup > .col:last-child
            // .grid > .col > .col:last-child
            $c.each( function( y, ytem ) {
                var $gc = $(ytem).children( child_selector );
                $gc.last().addClass( polyfill_class );
            });

        }, 5);
    });

    // reattach container to DOM
    $container.append( $contents );

})(jQuery);