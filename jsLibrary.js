////通过id和tagName获取元素
//function $(name,tag){
//	if(name.charAt(0) === '#'){
//		name = name.slice(1)
//		return document.getElementById(name);
//	}else{
//		tag = tag || document ; 
//		return tag.getElementsByTagName(name);
//	}
//}
//
//
//获取样式的函数
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}


//domove函数
function domove(obj,attr,step,target,endFn){
	clearInterval(obj.timer)
	var begin = parseInt(getStyle(obj,attr));
	if(begin>target&&step>0||begin<target&&step<0){
		step = -step;
	}
	obj.timer = setInterval(function(){
		var now = parseInt(getStyle(obj,attr))+step;
		if(now>target&&step>0||now<target&&step<0){
			now = target ;
		}
		obj.style[attr] = now + 'px';
		if(now === target){
			clearInterval(obj.timer);
			endFn && endFn();
		}
	},30)
}



//shake抖动函数
function shake(obj,attr,start,step,endFn){
	var arr = [] ;
	for(var i = step ;i > 0 ;i -=2 ){
		arr.push(i,-i);
	}
	arr.push(0);
	var n = 0 ;
	clearInterval(obj.shake);	
	obj.shake = setInterval(function(){
		obj.style[attr] = start + arr[n] + 'px';
		n++;
		if(n === arr.length){
			clearInterval(obj.shake);
			endFn && endFn();
		}
	},30)
}


//透明度函数
function opacity(obj,step,target,endFn){
	var start = parseFloat(getStyle(obj,'opacity')) ;
	if(start>target&&step>0||start<target&&step<0){
		step = -step ;
	}
	obj.opa = setInterval(function(){
		var now = parseFloat(getStyle(obj,'opacity'))+step ;
		obj.style.opacity = now ;
		if(now>target&&step>0||now<target&&step<0){
			now = target ;
		}
		if(now === target){
			clearInterval(obj.opa);
			endFn && endFn();
		}
	},30)
}
