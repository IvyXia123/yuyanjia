function submit (b){
	var $load = '<article id="loading">'
	    		+'<div class="loader">'
				  	+'<section>'
				  		+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
					  	+'<span></span>'
				  	+'</section>'
				+'</div>'
			+'</article>';
	var obj = {
		_id    : b.attr('data-id'),
		name   : b.attr('data-name'),
		start1 : b.find('.submenu').children('input:eq(0)').val(),
		end1   : b.find('.submenu').children('input:eq(1)').val(),
		start2 : b.find('.submenu').children('input:eq(2)').val(),
		end2   : b.find('.submenu').children('input:eq(3)').val()
	}
	if(obj.start1 == "" ||obj.start2 == "" ||obj.end1 == "" ||obj.end2 == "")return alert('请填写完整日期！');
	$('.index-rightBox').append($load);
	
	goalData = {};
	$.ajax({
		type:"get",
		url:"http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id="+obj._id+"&date1start="+obj.start1+"&date1end="+obj.end1+"&date2start="+obj.start2+"&date2end="+obj.end2,
		async:true,
		dataType: 'text',
		timeout:1000 * 60 * 50,
		success:function(data){
			if(!data)return;
			data = data.replace(/null/g,"0");
			data = JSON.parse(data);
			data = data.details[Object.getOwnPropertyNames(data.details)].values;
			goalData = data
			base.itmeSite();
			$('.currentPosition').children().html(obj.name+'行为');
			$('.currentPosition').attr({'start-date':obj.start1+' 00:00:00','end-date':obj.end1+' 00:00:00'});
		},
		complete:function(){
			$('#loading').remove();
		}
	});
	b.hide();
}
