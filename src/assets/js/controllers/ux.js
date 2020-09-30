// -------------------------------------
// SVG4Everybody
// https://goo.gl/AAk6wS
// -------------------------------------
svg4everybody();

// -------------------------------------
// Outdated Browser
// https://goo.gl/dPTzmM
// -------------------------------------
$(document).ready(function() {
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'borderImage',
        languagePath: '/outdatedbrowser/lang/en.html'
    });
});

// -------------------------------------
// ReStable
// https://goo.gl/Rt8boi
// -------------------------------------
$(document).ready(function () {
    $.ReStable();
});

// -------------------------------------
// Format <pre> tags for use with Prism
// https://goo.gl/UdPghX
// -------------------------------------
$('pre[class*="language-"]').each(function(){
    $(this).html('<code class="' + $(this).attr('class') + '">' +  $(this).html() + '</code>');
});

// ----------------------------------------
// Remote Links
// Open all outbound links & PDFs in a new tab
// ----------------------------------------
$('a').each(function(){
    var link = $(this);
    // selectors to skip
    var exceptedLinks = [
      'a.notremote',
      'a[data-modal]'
    ];
    var isExcepted = false;

    // check link against list of excepted selectors
    $.each(exceptedLinks, function(index, value){
        if( link.is(value) ) {
            isExcepted = true;
            return false;
        }
    });

    if(!isExcepted) {
        var hostRegex     = new RegExp('/' + window.location.host + '/'),
            protocolRegex = new RegExp(/^http/),
            pdfRegex      = new RegExp(/.pdf$/);

          // is the link an anchor or JS?
          if(protocolRegex.test(this.href)){
            // is the link remote or for a PDF file?
            if( !hostRegex.test(this.href) || pdfRegex.test(this.href) ) {
                $(this).click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(this.href, '_blank');
                });
            }
        }
    }
});

// ----------------------------------------
// Responsive Media
// Convert iframe embeds to responsive
// ----------------------------------------
$('iframe').each(function(){
    // get the aspect ratio of the original iframe
    // and convert it to a percentage
    var iframePadding = ( $(this).height() / $(this).width() ) * 100;

    // create some new elements
    var $wrapper = $('<div class="media-wrapper"></div>');
    var $fauxHeight = $('<div class="media-faux-height"></div>');

    // the wrapper holds the iframe 
    // and the faux height element
    $wrapper.css({
        'position' : 'relative',
        'width'    : '100%'
    });

    // the faux-height element gets our aspect-ratio padding
    $fauxHeight.css({
        'padding-bottom' : iframePadding + '%',
        'width'          : '100%'
    });

    // the iframe is positioned absoltely so its 
    // height doesn't add to the faux height
    $(this).css({
        'position' : 'absolute',
        'top'      : '0',
        'left'     : '0'
    });

    // wrap the iframe in the wrapper element 
    // and add the faux height element next to it
    $(this).wrap($wrapper).after($fauxHeight);

    // update iframe width and height 
    // attributes so they fill the container
    $(this).attr('width', '100%').attr('height', '100%');
});

// ----------------------------------------
// Wakelock
// Prevent device from sleeping when toggled
// https://github.com/richtr/NoSleep.js
// ----------------------------------------
$('.ux-wakelock').each(function(){
    var $toggle = $(this).find("input[type='checkbox']#wakelock");
    var noSleep = new NoSleep();

    $toggle.on('change', function(){
        if( $(this).is(':checked') ) {
            noSleep.enable();
            console.info('NoSleep is Enabled');
        }
        else {
            noSleep.disable();
            console.info('NoSleep is Disabled');
        }
    });
});