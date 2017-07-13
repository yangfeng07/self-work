move();
setInterval(move, 1000)
//          时间图可拖拽
function move() {
	var str = "";
	var oBody = document.body;
	var aImg = $('.time img');
	var myTime = new Date();
	var hours = myTime.getHours();
	var minutes = myTime.getMinutes();
	var seconds = myTime.getSeconds();
	var len = aImg.length;
	str = zero(hours) + "" + zero(minutes) + zero(seconds);
	for(var i = 0; i < len; i++) {
		aImg[i].src = 'img0/' + str.charAt(i) + '.JPG'
	}

	function zero(a) {
		return a < 10 ? '0' + a : a;
	}
}
//时间图拖拽效果
var oTime = $('.time');
oTime.on('mousedown', function() {
	var patch1 = event.clientX - parseInt($(this).css("left"));
	var patch2 = event.clientY - parseInt($(this).css("top"));
	$(document).mousemove(function(ev) {
		var ox = ev.clientX;
		var oy = ev.clientY;
		var t = oy - patch2;
		var l = ox - patch1;
		var w = $(window).width() - oTime.width();
		var h = $(window).height() - oTime.height();
		if(t < 0) {
			t = 0;
		} else if(t > h) {
			t = h;
		}
		if(l < 0) {
			l = 0;
		} else if(l > w) {
			l = w;
		}
		oTime.css({ top: t, left: l })
	})
	return false;
});
$(document).mouseup(function() {
	$(this).off("mousemove");
});
var round = $('#round'); 
var divs = $('#round div');
var time1 = null;
var len = divs.length;
var onoff = true;
var num = 0;
var detail = $('.detail');

round.css('transform', 'rotateY(' + 360 + 'deg)')
timerBBBBB();


//3D图自动旋转
function timerBBBBB() {
	clearInterval(time1);
	time1 = setInterval(function() {
		if(onoff) {
			round.css('transform', 'rotateY(' + 0 + 'deg)')
		} else {
			round.css('transform', 'rotateY(' + 360 + 'deg)')
		}
		onoff = !onoff;
	}, 3000);
}
//3D图移入 移出 点击效果
round.on('mouseover', function() {
	for(var i = 0; i < len; i++) {
		divs.eq(i).removeClass('meet' + (i + 1)).addClass('part' + (i + 1));
	}
	clearInterval(time1);
}).on('mouseout', function() {
	for(var i = 0; i < divs.length; i++) {
		divs.eq(i).removeClass('part' + (i + 1)).addClass('meet' + (i + 1))
	}
	timerBBBBB();
})
divs.on('mouseover', function() {
	divs.css('opacity', .7).eq($(this).index()).css('opacity', 1);
}).on('click', function() {
	var n = (5 - $(this).index()) * 60
	$(this).timer = setTimeout(function() {
		round.css('transform', 'rotateY(' + n + 'deg)');
	}, 200)
}).on('dblclick', function() {
	backGround.hide()
	$('.detail').eq($(this).index()).show()		
}).eq(0).on('dblclick', function() {
	first();
})
twice();
third();
fourth();
fifth();

//返回按钮点击回到3D旋转
var oReturn=$('.return')
oReturn.on('click',function(){
	detail.hide();
	backGround.show();
});

//第一个效果 自我介绍
function first() {	
	var mian = $('.mian');
	var detailD = $('.detail .zhuan');
	mian.timer = setInterval(function() {
		mian.css('transform', 'rotateY(' + 0 + 'deg)')
		detailD.css('transform', 'rotateY(' + 0 + 'deg)')
	}, 16)
}

//第二个效果  小游戏
function twice() {
	var box1 = $('#box1')
	var btn1 = $('#box1 #btn');
	var aP = $('#box1 p');
	var div = $('#box1 #div');
	var oSpan = $('#box1 span');
	var m = 0;
	var n = 0;
	var on = true;
	var t = 5000;
	var T = parseInt(box1.css('top'));
	btn1.on('click', click)

function fall(time) {
	var random = Math.round(Math.random() * 400)-20;
	div.css('left', random);
	div.show();
	div.animate({
		top: 350
	}, t, function() {
		n++;
		oSpan.eq(1).html(n);
		shake(box1[0], 'top', 100, 20);
		div.css('top', 0);
		if(n < 4) {
			fall();
		} else {
			clearInterval(box1[0].shake);
			alert('游戏失败');
			n = 0;
			oSpan.eq(1).html(n);
			div.hide();
			btn1.removeAttr('disabled');
			m = 0;
			t = 5000;
			oSpan.eq(0).html(m);
			btn1.css('top', 320);
			aP.css('left', 10);
		}
	})
}

function click() {
	console.log(T)
	btn1.attr('disabled', 'disabled')
	aP.animate({
		left: -80
	}, 1000)
	btn1.animate({
		top: 410
	}, 1000, function() {
		fall();
		div.on('mousedown', down)
	})
}

function down() {
	if(on) {
		m++;
		oSpan.eq(0).html(m);
		t = t - 300;
		on = false;
		div.stop();
		shake(this, 'left', div.position().left, 20, function() {
			on = true;
			div.css('top', 0);
			if(m < 15) {
				fall();
			} else {
				alert('游戏通过');
				m = 0;
				oSpan.eq(0).html(m);
				n = 0;
				oSpan.eq(1).html(n);
				btn1.css('top', 320);
				aP.css('left', 10);
				div.hide();
				btn1.removeAttr('disabled');
					t = 5000;
				}
			})
		}
	}
}

//第三个效果 放大镜
function third(){
	const box2=$('#box2')
	      divz=$('#box2 section'),
		  cImg=$('#box2 img'),
		  smallD=$('#box2 .smallD');
	divz.eq(0).on('mouseover',function(){
		smallD.show();
		divz.eq(2).show();				
	})
	divz.eq(0).on('mouseout',function(ev){
		smallD.hide();
		divz.eq(2).hide();
	})
	var w=smallD.outerWidth()/2+200;
	var h=smallD.outerHeight()/2+200;
	divz.eq(0).on('mousemove',function(ev){
		smallD.css({left:ev.clientX-w,top:ev.clientY-h})
		var l1=divz.eq(0).outerWidth()-smallD.outerWidth()
		var t1=divz.eq(0).outerHeight()-smallD.outerHeight()
		var l2=parseInt(smallD.css('left'));
		var t2=parseInt(smallD.css('top'));
		if(l2<=0){
			smallD.css('left',0)
		}else if(l2>=l1){
			smallD.css('left',l1);
		}
		if(t2<=0){
			smallD.css('top',0)
		}else if(t2>=t1){
			smallD.css('top',t1);
		}
		var l=-4*parseInt(smallD.css('left'))
		var t=-4*parseInt(smallD.css('top'))
		cImg.eq(1).css({left:l,top:t})
		return false;
	})
}

//第四个效果 轮播图
function fourth(){
	const box3=$('#box3'),
		  lbt=$('#box3 .lbt'),
		  btn3=$('#box3 button'),
		  oLi3=$('#box3 li');	
	let n=0;
	box3.timer=setInterval(move,1000);
	box3.hover(function () {  
        clearInterval(box3.timer);  
    }, function () {  
        box3.timer=setInterval(move,1000);
    });
    btn3.eq(1).on('click',move);
    btn3.eq(0).on('click',function(){
    	n--;
    	lbt.animate({
    		left:'+=400px'
    	},500,function(){
    		oLi3.removeClass('red');
			if(n==-1){
				n=3;
				lbt.css('left','-1600px')
			};
			oLi3.eq(n).addClass('red')
    	})
    })
    oLi3.on('click',function(){
    	n=$(this).index();           		  				
    	oLi3.removeClass('red').eq($(this).index()).addClass('red');
    	lbt.animate({
    		left:(-$(this).index()-1)*400
    	})
    })
	function move(){
		n++;				
		lbt.animate({
			left:'-=400px'
		},500,function(){					
			oLi3.removeClass('red');
			if(n==4){ 
				n=0;
				lbt.css('left','-400px')
			};
			oLi3.eq(n).addClass('red')
		});				
	}
}

//第五个效果 文字搬运
function fifth(){
	var oText = $('#box4 textarea'),
		divR = $('#box4 #divR'),
		btn = $('#box4 button'),
		n = 0,
		oP = $('#box4 p'),
		oUl = $('#box4 ul'),
		aLi = $('#box4 li');
	btn.on('click',function(){
		var val = oText.val();
		var len = val.length;
		if(btn.timer){
			return     //定时器存在中断下面代码
		}
		if(len){
			opacity(oUl[0],.1,1);
			btn.timer = setInterval(function () {
				n ++ ;
				oText.val(val.substr(n));
				divR.html(val.substr(0,n));
				oP.html(n+"/"+len);
				aLi.css('background','').eq([(n-1)%8]).css('background','yellow');
				if(n===len){
					n = 0;
					opacity(oUl[0],.1,0);
					clearInterval(btn.timer);
					btn.timer = null;
				};
			},100)
		}
	})
}
