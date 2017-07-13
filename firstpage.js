var oDiv = $('.welcome');
var oP = $('.baitiao');
var backGround = $('.backGround');
var music = $('#audio')[0];
oDiv.timer = setInterval(function() { //字幕显示
	oP.animate({
		left: 800
	}, 2000,loading)
}, 16)
function loading() { //动画 及 动画完成之后3D图出现
	var winw = $(window).width() + 200;
	var winh = $(window).height() + 200;
	var loading = $("#loadingCover").find(".circle");
	var w = loading.width();
	var h = loading.height();
	var timer = null;
	$("#loadingCover").find("img").hide();
	timer = setInterval(function() {
		loading.css({
			"width": w += 20,
			"height": h += 20,
			marginTop: -(w / 2),
			marginLeft: -(h / 2)
		})
		if(w > winw && h >= winh) {
			clearInterval(timer);
			$("#loadingCover").fadeOut("slow");;
		}
	}, 16);
}