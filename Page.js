
(function(){
	/*
	content:document.getElementById('box'),
	pages:20,	
	currt:1,
	groups:5,	
	*/
	function Pages(option,jumpBack){
		this.back = jumpBack ? jumpBack:function(){};
		this.defaults = {
			groups:5,			
			currt:1,
			first:'首页',
			last:'末页',
			prev:'上一页',
			next:'下一页',
			skin:'#009688',
			skip:false
		}
		this.config = Pages.extend(this.defaults,option);
		this.render();
	}
	Pages.extend = function(rootObj,sourceObj){
		for(var i in sourceObj){
			rootObj[i] = sourceObj[i]
		}
		return rootObj;
	}
	Pages.on = function(elm,style,fn){
		elm.attachEvent ? elm.attachEvent('on'+style,fn):elm.addEventListener(style,fn,!1)
	}
	Pages.prototype.jump = function(indet){
		this.back&&this.back(indet);
	}
	Pages.prototype.view = function(){
		var htmlElm = '';
		var interg = Math.floor((this.config.groups-1)/2);
		if(this.config.currt>1 && this.config.prev){
			htmlElm +='<a href="javascript:void(0)" title="'+this.config.prev+'" data-page="'+(this.config.currt-1)+'">'+this.config.prev+'</a>';
		}
		var start = this.config.currt - interg <=1?1:this.config.currt-interg;
		start = this.config.currt+interg>this.config.pages?this.config.pages-this.config.groups:start;
		if(this.config.currt - interg -1 >1){
			htmlElm +='<a href="javascript:void(0)" title="'+this.config.first+'" data-page="1">'+this.config.first+'</a><span>...</span>';
		}else{
			start = 1;
		}
		var end = this.config.currt+interg>=this.config.pages?this.config.pages:this.config.currt+interg;
		//end = end<this.config.groups?this.config.groups:end;
		for(var i=start; i<=end;i++){
			if(i == this.config.currt){
				htmlElm+='<span class="currt"><em class="page-curt" style="background:'+this.config.skin+';"></em><em>'+(i==1?this.config.first:i)+'</em></span>';
			}else{
				htmlElm+='<a href="javascript:void(0)" data-page="'+i+'">'+(i==1?this.config.first:i)+'</a>';
			}
		}
		if(end !== this.config.pages){
			htmlElm+='<span>...</span><a href="javascript:void(0)" title="'+this.config.last+'" data-page="'+this.config.pages+'">'+this.config.last+'</a>';
		}
		if(this.config.currt !== this.config.pages){
			htmlElm+='<a href="javascript:void(0)" title="'+this.config.next+'" data-page="'+(this.config.currt+1)+'">'+this.config.next+'</a>';
		}
		if(this.config.skip){
		    htmlElm+='<span class="page-control">到第<input type="text">页<button>确定</button></span>'
		}
		this.config.content.innerHTML = htmlElm;
	}
	Pages.prototype.bindEve = function(){
		var domChild = this.config.content.children;
		var _this =this;
		var jumpText = null;
		for(var i=0; i<domChild.length; i++){
			if(domChild[i].nodeName.toLowerCase()=='a'){
				Pages.on(domChild[i],'click',function(){
					var curtpage = parseInt(this.getAttribute('data-page'));
					console.log(curtpage);
					_this.config.currt = curtpage;
					_this.jump(_this.config.currt);
					_this.render();
				})
			}
		}
		if(this.config.skip){
			var inputCotr = this.config.content.getElementsByTagName('input')[0];
			var jumpBtn = this.config.content.getElementsByTagName('button')[0];
			Pages.on(inputCotr,'keyup',function(){
				var entr= inputCotr.value.replace(/\s|\D/g, "");
				inputCotr.value = entr;
			});
			Pages.on(jumpBtn,'click',function(){
			
				if(inputCotr.value.length==0) return false;
				_this.config.currt = parseInt(inputCotr.value)>_this.config.pages?_this.config.pages:parseInt(inputCotr.value);
				_this.jump(_this.config.currt);
				_this.render();
			});
		}
	}
	Pages.prototype.render = function(){
        this.view();
        this.jump(this.config.currt);
		this.bindEve();
	}
	window.Page = function(config,callback){
		return new Pages(config,callback);
	}
})();
