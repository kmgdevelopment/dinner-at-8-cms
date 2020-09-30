// -------------------------------------
// DropKick
// https://goo.gl/UrhpVJ
// -------------------------------------
// $('select').dropkick();

// -------------------------------------
// jQuery Validate
// https://goo.gl/JCzwRb
// -------------------------------------
/*
$('form').each(function(){
  $(this).validate({
    // place the error at the end of the entire fieldgroup, not just after the input
    errorPlacement: function(error, element) {
      var $fieldgroup = element.parent('.fieldgroup');
      $fieldgroup.append(error);
    },
    focusInvalid: false, // prevent losing focus if hidden select is invalid
    ignore: ':hidden:not(select)' // validate dropkick selects
  });

  // update when dropkick dropdown is updated
  $(this).find('select').dropkick().change(function(){
    $(this).valid();
  });
});
*/