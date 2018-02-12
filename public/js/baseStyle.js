var timer;
var Animation;
var goalData = [{"总人数":0,"总金额":0,"定期交易人数":0,"定期交易金额":0,"活期交易人数":0,"活期交易金额":0,"活包定交易人数":0,"活包定交易金额":0,"二级市场交易人数":0,"二级市场交易金额":0,"总交易人数":0,"总交易金额":0,"提现人数":0,"提现金额":0}];
var contentText = '<ul class="currentPosition">'
				+'<li></li>'
				+'</ul>'
				+'<div class="content-leftBox content-boxItem">'
				+'<svg xmlns="http://www.w3.org/2000/svg"'
				    +'xmlns:xlink="http://www.w3.org/1999/xlink"'
				    +'version="1.1" width="100%" height="100%" id="svg" style="position: absolute; background-color: transparent;">'
					+'<defs>'
			   			+'<marker id="arrow"'
			   				+'markerUnits="strokeWidth"'
			   				+'markerWidth="8"'
			   				+'markerHeight="8"'
			   				+'viewBox="0 0 12 12"'
			   				+'refX="6"'
			   				+'refY="6"'
			   				+'orient="auto">'
			   				+'<path d="M2,2 L10,6 L2,10 L6,6 L2,2" sytle="fill:#000;"></path>'
			   			+'</marker>'
				   	+'</defs>'
				+'</svg>'
				+'<svg class="icon totalTip" aria-hidden="true">'
                    +'<use xlink:href="#icon-rili1"></use>'
                +'</svg>'
				+'<section id="content">'
				+'</section>'
			+'</div>'
			+'<div class="content-rightBox content-boxItem">'
				+'<section id="amount"  class="echart"></section>'
				+'<section id="peoples" class="echart"></section>'
			+'</div>';
var divItmes = '<div class="site-items">'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="item"></div>'
				+'<div class="Withdraw">'
					+'<h5 style="margin-bottom:5px;">转化总金额：<i id="totalAmount"></i></h5>'
					+'<h6>转化总人数：<i id ="totalPeople"></i></h6>'
				+'</div>'
			+'</div>';
var P1 = {
		title:{
			tH:'转化人数（万）',
			tY:0,
			tX:140,
			tP:15,
		},
		xAxisName:'人数',
		colorList:'rgb(147,205,221)'
	}
var A1 = {
		title:{
			tH:'转化金额（万）',
			tY:0,
			tX:140,
			tP:15,
		},
		xAxisName:'金额',
		colorList:'rgb(195,214,155)'
	};
var fieldName = ['目标金额','活期交易','活包定交易','二级市场交易','提现','定期交易'];
var base = {
			li   : '.navItems li',
			queryBox: '#date-query',
			checked : 'checked',
			_Date   : '#laydate_box',
			sub     : '.submit',
			content : '#content'
		};
	base.queryBoxDisplay = function(){
		// 条件选择模块显示||隐藏
		$(base.li).click(function(event){
			event.stopPropagation();
			$(base.queryBox).hide();
			if($(this).hasClass(base.checked)){
				$(base.li).removeClass(base.checked);
				return;
			}
			$(base.li).removeClass(base.checked);
		    $(this).addClass(base.checked);
		    $(base.queryBox).css({'top':$(this).offset().top}).slideDown().attr('data-id',$(this).attr('id')).attr('data-name',$(this).children('span').html());
		})
	}
	base.itmeSite = function(){
		$('.index-rightBox').empty();
		$('.index-rightBox').append(contentText);
		$('#content').append(divItmes);
		if(goalData[0]['总交易金额'] == undefined || !(goalData[0]['总交易金额']) || goalData[0]['总交易金额'] == NaN){
			var totalAmount = 0;
		}else{
			var totalAmount = Math.round(goalData[0]['总交易金额']/10000);
		}
		
		$('#totalAmount').html(totalAmount+'（万）');
		$('#totalPeople').html(goalData[0]['总交易人数']);
		// add chart
		var AxisData = [];
		var seriesData1 = [];
		var seriesData2 = [];
		var Amount= [];
		var People = [];
		// 此处循环用于柱状图排序
		for(var key = 1; key < fieldName.length; key++){
			var Key = fieldName[key];
			var nubA = Math.round(goalData[0][fieldName[key]+'金额']/10000).toFixed(2);
			var nubP = (goalData[0][fieldName[key]+'人数']/10000);
			Amount.push({'feildName':Key,'amount':nubA});
			People.push({'feildName':Key,'amount':nubP});
		}
		Amount = Amount.sort(sort);
		People = People.sort(sort);
		var AfeildName    = [],
			PfeildName    = [],
			AseriesData = [],
		    PseriesData = [];
		for(x in Amount){
			AfeildName.push(Amount[x].feildName);
			AseriesData.push(Amount[x].amount);
			PfeildName.push(People[x].feildName)
			PseriesData.push(People[x].amount);
		}
		A1.yAxisData  = AfeildName; 
		A1.seriesData = AseriesData;
		P1.yAxisData  = PfeildName; 
		P1.seriesData = PseriesData;
		// creation chart
		var myAmountChart = echarts.init(document.getElementById('amount'));
		var myPeopleChart = echarts.init(document.getElementById('peoples'));
		var chart1 = new creationChart(A1);
		var chart2 = new creationChart(P1);
		myAmountChart.setOption(chart1);
		myPeopleChart.setOption(chart2);
		// content text
		var Attributes = {
			doms : $('#content .item'),
			Color :['255,255,0','231, 244, 8','3, 254, 165','241, 142, 15','44, 255, 10','251, 81, 49'],
			Size  :['50','26','32','42','35','38'],
			Position:[
				{'top':50,'left':47},
				{'top':80 ,'left':28},
				{'top':35,'left':20},
				{'top':13,'left':47},
				{'top':40,'left':75},
				{'top':83,'left':60}
			],
			shadow:['30','10','13','18','25','30']
		};
		var coordinateArr = [];
		for(var i = 0; i < $(Attributes.doms).length; i ++){
			var maxW = $(Attributes.doms).parent().width(), //父级width
				maxH = $(Attributes.doms).parent().height(),//父级width
				minW = $(Attributes.doms[i]).outerWidth(),	  //当前对象width
				minH = $(Attributes.doms[i]).outerHeight(),   //当前对象width
				ratioL = '0.'+Attributes.Position[i].left,
				ratioT = '0.'+Attributes.Position[i].top;
			// itme 初始位置
			coordinateArr.push({'x':maxW * ratioL - minW/2,'y':maxH * ratioT - minH/2});
			// 波纹动画
			var Animation = new timer(i,Attributes,coordinateArr);
			Animation.addSpan();
			Animation.animates();
			setInterval(Animation.animates,2100);
		}
		// 创建SVG线段
		var svg = d3.select('#svg');
		var creationSvg = new creationSVG(svg,coordinateArr);
		creationSvg();
		setInterval(creationSvg,4000);
	}
base.queryBoxDisplay();
// 时间插件
$(base.queryBox).click(function(event){
	event.stopPropagation();
})
$(base.sub).click(function(event){submit ($(this).parents(base.queryBox))});
base.itmeSite();
$(window).resize(function(){
	base.itmeSite();
})

/* ===========================================   creation fn    ============================================*/

function timer(i,Attributes,arr){
	var count = i;
	// 创建另一组固定的圆
	if(typeof this.addSpan != 'function'){
		this.addSpan = function(){
			var Nub = ['12344','567657777','345','435353','2552567','314235467']; 
			$(Attributes.doms[count]).parent().append((function(){
				var field = fieldName[count];
				if(field == '目标金额'){
					var span = $('<span class="addSpan " onclick="open_win()"><span>'+field+'</span><i data-value="'+goalData[0]['总人数']+'">'+Math.round(goalData[0]['总金额']/10000)+'</i></span>');
				}else{
					var span = $('<span class="addSpan"><span>'+field+'</span><i data-value="'+goalData[0][field+'人数']+'">'+Math.round(goalData[0][field+'金额']/10000)+'</i></span>');
				}
				
				span.css({
					'position':'absolute',
					'width':Attributes.Size[count]*2,
					'height':Attributes.Size[count]*2,
					'top':arr[count].y - Attributes.Size[count] +'px',
					'left':arr[count].x - Attributes.Size[count] +'px',
					'color':'rgb('+Attributes.Color[count]+')',
					'text-align':'center',
					'border-width':'2px',
					'border-style':'solid',
					'border-radius':'50%',
					'border-color':'rgba('+Attributes.Color[count]+',1)',
					'box-shadow':'0 0 '+ Attributes.shadow[count] +'px rgba('+Attributes.Color[count]+',.8) inset'
				})
				// 字段名&值 位置
				var Span = $(span).children('span');
				var marX = -$(Span).text().length/2*14;
				if(arr[count].y < arr[0].y/2){ // 顶部的圆
					$(Span).css({'margin-top':-23,'margin-left':marX});
				}else if(count == 0){ // 中心点圆
					$(Span).css({'margin-top':Attributes.Size[count]-15,'margin-left':marX});
				}else{
					$(Span).css({'margin-top':Attributes.Size[count]*2,'margin-left':marX});
				}
				return span;
			})());
		};
	}
	
    this.animates =  function (){
    	var random = Math.floor(Math.random()*100+1)*i + 1300;
    	// itme 初始style start
		$(Attributes.doms[count]).css({
			'top':arr[count].y -1 +'px',
			'left':arr[count].x -1 +'px',
			'border-color':'rgb('+Attributes.Color[count]+')',
			'box-shadow':'0 0 '+ Attributes.shadow[count] +'px rgb('+Attributes.Color[count]+') inset',
			'opacity':1
		});
		$(Attributes.doms[count]).stop().animate({
			'opacity':'0',
			'border-color':'rgb('+Attributes.Color[count]+')',
			'padding':Attributes.Size[count],
			'top':arr[count].y - Attributes.Size[count]-1 +'px',
			'left':arr[count].x - Attributes.Size[count]-1+'px'
		},random,function(){
			$(Attributes.doms[count]).stop().animate({
				'opacity':'0',
				'padding':'0px',
				'top':arr[count].y -1+'px',
				'left':arr[count].x -1+'px'
			},50);
		});
	};
}

function creationSVG(svg,Arr){
	var arr = [];
	var arr = Arr;
	//Secondary beisaier curve control points
	var controlPoins = function(){
		var coordinateZ = [];
		for(var i = 1;i < arr.length; i++){
			var qx,
				qy;
			if(arr[0].x - arr[i].x > 0){
				qx = (arr[0].x - arr[i].x)/2 + arr[i].x;
			}else{
				qx = (arr[i].x - arr[0].x)/2 + arr[0].x;
			}
			if(arr[0].y - arr[i].y > 0){
				qy = (arr[0].y - arr[i].y)/2 + arr[i].y;
			}else{
				qy = (arr[i].y - arr[0].y)/2 + arr[0].y;
			}
			coordinateZ.push({'qx':qx,'qy':qy});
		}
		return coordinateZ;
	};
	// creation svg
	return function(){
		svg.selectAll("*").remove();
		var obj = new controlPoins(arr);
		for(var i = 0;i < arr.length-1;i++){
			// 创建svg线条
			var path = d3.path();
			// 重新定义初始点，防止变量修改后污染；
			var baseX = arr[0].x,
				baseY = arr[0].y;
			path.moveTo(baseX, baseY);//start xy
            path.quadraticCurveTo(obj[i].qx + i*10, obj[i].qy, arr[i+1].x, arr[i+1].y);// end
            //底线
            svg.append("path")
                .attr("stroke-width", 1)
                .style("fill", "none")
                .style("stroke", "#03fedf")
                .style('opacity','.1')
                .style('box-shadow','0px 0px 50px 10px red')
                .attr("d", path)
                .transition()
                .duration(10);
            // 静止虚线
        	svg.append("path")
                .attr("stroke-width", 1)
                .style("fill", "none")
                .style("stroke", "#03fedf")
                .style('opacity','.3')
                // ("stroke-dasharray", "线段长度, 线段间距")
                .style("stroke-dasharray", "3, 10")
                .attr("d", path)
                .transition()
                // 动画持续时间
                .duration(10)
                .styleTween("stroke-dashoffset", function () {
                    return d3.interpolateNumber(1000, 0);
                });
            // 移动光点
            svg.append("path")
                .attr("stroke-width", 3)
                .style("fill", "none")
                .style("stroke", "#ff9800")
                .style("stroke-dasharray", "3, 1000")
                .attr("d", path)
                .transition()
                .duration(8000)
                .styleTween("stroke-dashoffset", function () {
                    return d3.interpolateNumber(1000, 100);
                })
            .transition().delay(0).remove();
            path.closePath();
		}
	}
}
// 显示圆圈所有值
$('.index-rightBox').delegate('.addSpan','mousemove',function(){
	$(this).css('cursor','pointer');
	overStyle($(this));
}).delegate('.addSpan','mouseout',function(){
	$(this).css('cursor','default');
	$('#overText').stop().fadeOut(150);
})

function overStyle(e){
	var offsetX = $(e).offset().left + $(e).outerHeight()/2-15;
	var offsetY = $(e).offset().top + $(e).outerWidth();
	if($(e).children('span').html() == '目标金额'){
		var tex = $(e).children('span').html()+'：'+$(e).children('i').html()+'（万）<br/>'
				+ '目标人数：'+$(e).children('i').attr('data-value');
	}else{
		var tex = $(e).children('span').html()+'金额：'+$(e).children('i').html()+'（万）<br/>'
				+ $(e).children('span').html()+'人数：'+$(e).children('i').attr('data-value');
	}
	
	$('#overText').stop().fadeIn(150).css({
		'top':offsetY +'px',
		'left':offsetX +'px'
	}).html(tex);
}
/*------------------------------------------      eCharts       ------------------------------------*/
function creationChart(arr){
	// echarts
	var option;
	return option = {
		baseOption:{			// 画布style
			width:280,
			title: {			// title
				top:arr.title.tY,
				left:arr.title.tX,
				padding:arr.title.tP,
	            text:arr.title.tH, 
	            textStyle: {
	                fontSize: 16
	            }
	        },
		    tooltip: {          // 提示框组件
		        trigger: 'axis',// 触发类型
		        axisPointer: {  // 指示器
		            type: 'shadow'
		        },
		        formatter: "{a} <br/>{b} : {c}" // 提示悬浮文字
		    },
		    grid: { 	   	// 画布位置
		        left: '4%',
		        right: '50px',
		        bottom: '5%',
		        top:'50px',
		        containLabel: true
		    },
		    xAxis: {        // 直角坐标系 X
		        type: 'value',
		        name:arr.xAxisName,
		        nameLocation:'end',
		        position:'top',
		        //去掉，坐标尺度
		        axisTick: {
		            show: false
		        },
		        axisLabel: {
		        	interval:1,
                 	rotate:315,
                 	margin:2,
		            formatter: '{value}'
		        }
		    },
		    yAxis: {		// 直角坐标系 Y
		        type: 'category',
		        nameLocation:'start',
		        axisTick: {
		            show: false
		        },
		        inverse:'true', //排序
		        data:arr.yAxisData
		    },
		    series: [{	// 画布内容样式
		            type: 'bar',
		            barGap: 10,
		            barCategoryGap: '40%',
		            itemStyle: {
		                normal: {
		                    color: arr.colorList,
		                }
                	},
	        	data: arr.seriesData
		    }]
		}
	};
}

/* 排序
  -----*/
 function sort(a,b){
 	return b['amount'] - a['amount'];
 }

function open_win(){
	if(!$('.currentPosition').attr('start-date'))return alert('请先查询一次数据！');
	if(!$('.currentPosition').attr('end-date'))return alert('请先查询一次数据！');
	var w = window.open("/pages/pageScroll");
}
