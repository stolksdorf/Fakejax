console.log('test');


$.fakejax.add({
	url : '/test',
	type : 'GET',
	response : function(){
		console.log('sample1');
	}
});



$.fakejax.add({
	url : '/test/[id]',
	type : 'GET',
	response : function(url_data){
		console.log('sample2', url_data);
	}
});

$.fakejax.add({
	url : '/test/[id]/dfgdfgg/[post_id]/delete',
	type : 'GET',
	response : function(url_data){
		console.log('sample3', url_data);
	}
});



$(document).ready(function(){

/*
	$.fakejax.ajax({
		url : '/test/67',
		type:'GET',
		success : function(){
			console.log('ajax success');
		}
	});

	$.fakejax.ajax({
		url : '/test/56/dfgdfgg/AWESOME_POST/delete',
		type:'GET',
		success : function(){
			console.log('ajax success');
		}
	});
*/
	buildInterface();


});









var ingredients = {

	wmp : {
		name    : 'Whole Milk Powder',
		fat     : 0.266,
		protein : 0.266,
		carbs   : 0.4,
		kcal     : 5.33
	},
	oats : {
		name    : 'Oats',
		fat     : 0,
		protein : 0.125,
		carbs   : 0.725,
		kcal     : 4
	},
	wpi : {
		name    : 'Whey',
		fat     : 0,
		protein : 0.774,
		carbs   : 0.06,
		kcal     : 3.67
	},
	dex : {
		name    : 'Dextrose',
		fat     : 0,
		protein : 0,
		carbs   : 1,
		kcal     : 4
	},
	oil : {
		name    : 'Oil',
		fat     : 9/10,
		protein : 0,
		carbs   : 0,
		kcal     : 9

	}
};

var sliderString = '<div><input type="range" min=0 value=0 max=100 style="width:250px"></input><span class="value"></span></div>';

function buildInterface(){
	_.each(ingredients, function(ingredient){
		var sliderBox = $(sliderString).appendTo($('.sliders'));
		var sliderObj = sliderBox.find('input');
		var sliderVal = sliderBox.find('.value');

		sliderBox.prepend(ingredient.name);

		ingredient.slider = sliderObj;

		sliderObj.change(function(){
			update();
			sliderVal.html(sliderObj.val());
		});


	});


};

function update(){

	$('.fat').html(_.reduce(ingredients, function(result,ingredient){
		return result + ingredient.fat * ingredient.slider.val();
	}, 0));
	$('.carbs').html(_.reduce(ingredients, function(result,ingredient){
		return result + ingredient.carbs * ingredient.slider.val();
	}, 0));
	$('.protein').html(_.reduce(ingredients, function(result,ingredient){
		return result + ingredient.protein * ingredient.slider.val();
	}, 0));
	$('.kcal').html(_.reduce(ingredients, function(result,ingredient){
		return result + ingredient.kcal * ingredient.slider.val();
	}, 0));



};


















