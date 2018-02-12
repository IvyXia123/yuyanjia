function chartsArr(doms){
	$('.chart').empty().hide();
	chartShow = null;
	var cDom = doms;
	var chartsArr = {
		0:function(){
			let myChart = getId(cDom[0]);
			// 30天到期
			var option = {
			    title : {
			    	text:'最近30天资产到期情况',
			        subtext: getData[0].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[0].seriesName
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[0].xAxisData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    series : [
			        {
			        	name: getData[0].seriesName,
			            type:'line',
			            data: getData[0].seriesData,
			            markPoint : {
			                data : getData[0].markPointData
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'}
			                ]
			            }
			        }
			    ]
			};
			
			myChart.setOption(option);
			// 获取当前正在显示的chart。
			chartShow = '0';
		},
		1:function(){
			let myChart = getId(cDom[1]);
			// 到期用户分析
			var option = {
			    title : {
			        subtext: getData[1].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[1].seriesName
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[1].xAxisData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    series : [
			        {
			        	name: getData[1].seriesName,
			            type:'line',
			            data: getData[1].seriesData,
			            markPoint : {
			                data : getData[1].markPointData
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'}
			                ]
			            }
			        }
			    ]
			};
			
			myChart.setOption(option);
			pieTab(cDom[1],getData[1]);
			// 获取当前正在显示的chart。
			chartShow = '1';
		},
		2:function(){
			let myChart = getId(cDom[2]);
			// 到期产品分布
			var option = {
			    title : {
			        "text":getData[2].seriesName,
			        x:'center',
			        y:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			      	y:'center',
		        	data: getData[2].legendData
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['pie', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    series : [
			        {
			            name: getData[2].seriesName,
			            type:'pie',
			            radius : ['25%','50%'],
			            center: ['50%', '50%'],
			           itemStyle : {
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			           },
			            data: getData[2].seriesData
			        }
			    ]
			};
			myChart.setOption(option);
			columnarTab(cDom[2],getData[2]);
			// 获取当前正在显示的chart。
			chartShow = '2';
		},
		3:function(){
			let myChart = getId(cDom[3]);
			// 到期用户定期资产AUM期限分布
			var option = {
			    title : {
			        "text":getData[3].seriesName,
			        x:'center',
			        y:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			      	y:'center',
		        	data: getData[3].legendData
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['pie', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    series : [
			        {
			            name: getData[3].seriesName,
			            type:'pie',
			            radius : ['28%','50%'],
			            center: ['50%', '50%'],
			           itemStyle : {
			                emphasis : {
			                    label : {
			                        show : true,
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			           },
			            data: getData[3].seriesData
			        }
			    ]
			};
			myChart.setOption(option);
			columnarTab(cDom[3],getData[3]);
			// 获取当前正在显示的chart。
			chartShow = '3';
		},
		4:function(){
			let myChart = getId(cDom[4]);
			// 无定期资产AUM 用户活期AUM分布
			var option = {
			    title : {
			        subtext: getData[4].subtext
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data: getData[4].seriesName
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : getData[4].xAxisData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value} '
			            }
			        }
			    ],
			    series : [
			        {
			        	name: getData[4].seriesName,
			            type:'line',
			            data: getData[4].seriesData,
			            markPoint : {
			                data : getData[4].markPointData
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name : '平均值'}
			                ]
			            }
			        }
			    ]
			};
			
			myChart.setOption(option);
			pieTab(cDom[4],getData[4]);
			// 获取当前正在显示的chart。
			chartShow = '4';
		}
	}
	return chartsArr;
};

function getId(dom){
	$('#'+dom).show();
	var myChart = echarts.init(document.getElementById(dom));
	return myChart;
}
// 排序
function sortFn(a,b){
	var first=a.tag;
    	first=first.replace(/[\u4e00-\u9fa5]/g,"");// 去除中文
    	first = first.replace(/[\(]/g,'').replace(/[\k]/g,'');		   // 去除%
    	if(first.indexOf(',') > -1)first = first.substring(0,first.indexOf(',')); // 截取~前面的值
    	if(first == "")first = 0;				   // 值为空
	var last=b.tag;
    	last=last.replace(/[\u4e00-\u9fa5]/g,"");
    	last = last.replace(/[\(]/g,'').replace(/[\k]/g,'');
    	if(last.indexOf(',') > -1)last = last.substring(0,last.indexOf(','));
    	if(last == "")last = 0;
	
	return eval(first) - eval(last);
}

// table
function pieTab(dom,data){
	$('#'+dom).next('.foot-tab').children('table').empty().stop().hide();
	var datas = data.values.sort(sortFn);
	var tr1 = $('<tr><th></th></tr>'),
		tr2 = $('<tr><th>到期人数</th></tr>');
		tr3 = $('<tr><th>到期金额</th></tr>'),
		totalAmount = 0,
		totalMem = 0;
	for(var i = 0;i < datas.length; i++){
		if(datas[i].tag == "")datas[i].tag = 0;
		if(datas[i].tag == "")datas[i].mem = 0;
		if(datas[i].tag == "")datas[i].amount = 0;
		totalAmount += datas[i].amount;
		totalMem  += datas[i].mem;
		tr1.append('<th>'+datas[i].tag+'</th>');
		tr2.append('<td>'+parseFloat(datas[i].mem).toLocaleString()+'</td>');
		tr3.append('<td>'+parseFloat(datas[i].amount).toLocaleString()+'</td>');
	}
	tr1.append('<th style="color: red;">Total</th>');
	tr2.append('<td>'+parseFloat(totalMem).toLocaleString()+'</td>');
	tr3.append('<td>'+parseFloat(totalAmount).toLocaleString()+'</td>');
	$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr1,tr2,tr3);
	// title
	$('#' +dom).prev('.chart-title').find('.endDate').text(subEndDate.substring(0,10));
	$('#' +dom).prev('.chart-title').find('.totalMem').text(parseFloat(totalMem).toLocaleString());
	$('#' +dom).prev('.chart-title').find('.totalAmount').text(parseFloat((totalAmount/10000).toFixed(1)).toLocaleString()+' 亿元');
}

function columnarTab(dom,data){
	//var datas = data.values.sort(sortFn);
	$('#'+dom).next('.foot-tab').children('table').empty().stop().hide();
	var datas = data.values;
	var tr1	= $('<tr><th>到期产品</th><th>到期人数</th><th>到期金额</th></tr>'),
		tr2 = $('<tr><th>定期资产AUM</th><th>人数</th><th>交易金额</th></tr>');
		totalAmount = 0,
		totalMem = 0;
	$('#'+dom).next('.foot-tab').children('table').stop().show().append('<tr style="background-color:transparent;"><td colspan="3" style="border: none;background-color: white; text-align: right;">人群会重复</td></tr>');
	if(dom == 'product'){
		$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr1);
	}else{
		$('#'+dom).next('.foot-tab').children('table').stop().show().append(tr2);
	}
	for(var i = 0;i < datas.length; i++){
		if(datas[i].tag == "")datas[i].tag = 0;
		if(datas[i].tag == "")datas[i].mem = 0;
		if(datas[i].tag == "")datas[i].amount = 0;
		totalAmount += datas[i].amount;
		totalMem  += datas[i].mem;
		let tr3 = '<tr>'
			+'<td>'+datas[i].tag+'</td>'
			+'<td>'+parseFloat(datas[i].mem).toLocaleString()+'</td>'
			+'<td>'+parseFloat(datas[i].amount).toLocaleString()+'</td>'
		+'</tr>';
		$('#'+dom).next('.foot-tab').children('table').append(tr3);
	}
	let trTotal = '<tr>'
		+'<td style="color: red;">Total</td>'
		+'<td>'+parseFloat(totalMem).toLocaleString()+'</td>'
		+'<td>'+parseFloat(totalAmount).toLocaleString()+'</td>'
	+'</tr>';
	$('#'+dom).next('.foot-tab').children('table').append(trTotal).stop().show();
	// title
	$('#' +dom).prev('.chart-title').find('.endDate').text(subEndDate.substring(0,10));
	$('#' +dom).prev('.chart-title').find('.totalMem').text(parseFloat(totalMem).toLocaleString());
	$('#' +dom).prev('.chart-title').find('.totalAmount').text(parseFloat((totalAmount/10000).toFixed(1)).toLocaleString()+' 亿元');
}
