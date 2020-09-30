$('.structure-filter-menu').each(function(){
	var $parentMenu = $(this);
	var $menuTrigger = $parentMenu.find('.menu-heading .trigger');
	var $menuBody = $parentMenu.find('.menu-body');

	$menuBody.hide();
	
	$menuTrigger.on('click',function(e){
		e.preventDefault();
		$menuBody.toggle();
	});
});