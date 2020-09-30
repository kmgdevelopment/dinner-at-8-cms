// -----------------------------
// ICONS
// Add an svg element before or after the target element
// -----------------------------
var svgPath       = '/assets/img/ui/svg-defs.svg';
var svgPathGlobal = '/assets/img/ui/svg-defs-global.svg';

function svgIcon(selector, id, pos) {
  // focusable keeps IE from tabbing into the sub elements
  // instead of just moving from one input to the next
  if( $(selector).length ) {
    if( pos === undefined || pos == 'before' ) {
      $(selector).prepend('<svg focusable="false"><use xlink:href="' + svgPath + '#icon-' + id + '"></use></svg>');
    }
    if( pos == 'after' ) {
      $(selector).append('<svg focusable="false"><use xlink:href="' + svgPath + '#icon-' + id + '"></use></svg>');
    }
  }
}