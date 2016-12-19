
$(document).ready(function(){
	var num = numberOfScreens;
	var box_h=$("#metro_box").height();
	var box_w=$("#metro_box").width();
	//$("#metro_box").css("margin-top",(($(window).height()-box_h)/2)-10+"px");
	//var img_h=$(".arr_left img").height();
	//var img_w=$(".arr_left img").width();
	//$(".prev").css("position","absolute").css("left","10px").css("top",($(window).height()-img_h)/2);
	//$(".next").css("position","absolute").css("right","10px").css("top",($(window).height()-img_h)/2);
	
	//切屏-----------------------------------------------------------------
	$("#top dl dd a").click(function(){
		if((!$(this).hasClass("top_index")) && (!$(this).hasClass("top_more"))){
			$("#top dl dd a").removeClass("top_tab_h");
			$(this).addClass("top_tab_h");
		}


		var index=$(this).index();
		$("#metro_box dd").hide();
		$("#metro_box dd").eq(index).toggle(100);
		if(index==1){
			$("body").attr("class","bg0");	
		}
		switch (index){
			case 0:
				$("body").attr("class","");						
				break;
			case 1:
				$("body").attr("class","bg0");					
				break;
			case 2:
				$("body").attr("class","bg1");						
				break;
			case 3:
				$("body").attr("class","bg2");					
				break;
			case 4:
				$("body").attr("class","bg3");					
				break;
			case 5:
				$("body").attr("class","bg4");						
				break;	
			case 6:
				$("body").attr("class","bg5");						
				break;	
			default :
				$("body").attr("class","bg6");						
		}		
	});
	
	if(showHome) {
		$('.top_index').show();
	}
	else{
		$('.top_index').hide();
	}

	if(showMore) {
		$('.top_more').show();
	}
	else{
		$('.top_more').hide();
	}	
	$('.top_tab').hide();
	for (var i=0; i < num; i++) {
		$('.top_tab').eq(i).html(tabName[i]);
		$('.top_tab').eq(i).show();	
		for(var j=0;j<16;j++){								
			var title = bookmark[i][j]['title'];
			var url = bookmark[i][j]['url'];
			var thumb = bookmark[i][j]['thumb'];
			if(thumb==''){
				$('#logo'+(i+1)+'-'+(j+1)).html('<a href="'+url+'"><img src="images/net-back.png" width="240" height="120" alt=""></a><span><a href="'+url+'">'+title+'</a></span>');
				alert($('#logo'+(i+1)+'-'+(j+1)).html);
			}
			else{
				$('#logo'+(i+1)+'-'+(j+1)).html('<a href="'+url+'"><img src="images/'+thumb+'" width="240" height="120" alt=""></a><span><a href="'+url+'">'+title+'</a></span>');
			}
		};		
	};

	$('.search_tab li a').hide();
	for (var i=0; i < numberOfSearchTab; i++) {
		$('.search_tab li a').eq(i).html(searchTabName[i]);
		$('.search_tab li a').eq(i).show();	
	}
	if(numberOfSearchTab<=1){
		$('.search_tab li a').hide();
	}
	SetSelectOption(defaultSearchTab)
	SetSearchEngine(defaultSearchTab,defaultSearchIndex);
	
	//链接在新窗口打开
	$(".a_link dd a").attr("target","_blank");
	$(".a_link ul li>a").hover(function(){
		var a_href=$(this).attr("href");			
		$(this).siblings().find("a").attr("href",a_href);
	});

	$(".search_tab li").mouseover(function(){
		if(!$(this).hasClass("search_tab_on"))
			$(this).addClass("search_tab_h");
	});
	$(".search_tab li").mouseleave(function(){
		$(this).removeClass('search_tab_h');
	});
	$(".search_tab li").click(function(){
		$(".search_tab li").removeClass('search_tab_h');
		$(".search_tab li").removeClass('search_tab_on');
		$(this).addClass("search_tab_on");

		var s_tab = $(this).index();
		SetSelectOption(s_tab);
		SetSearchEngine(s_tab,0);
	});

	$('.select_showbox').click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$('.select_option').toggle(false);
		}
		else{
			$(this).addClass("active");
			$('.select_option').toggle(true);
		}

	});
	$('.select_option li').live('click',function(){
		$('.select_showbox').html($(this).html());	
		$('.select_showbox').removeClass('active');
		$('.select_option').hide();

		var s_tab = $('.search_tab_on').index();
		var s_index = $(this).index();
		SetSearchEngine(s_tab,s_index);
	});
	$('.select_box').mouseleave(function(){
		$('.select_showbox').removeClass('active');
		$('.select_option').hide();	
	});

});

function SetSearchEngine(tab,index){
	var title;
	var thumb;

	if(tab >=searchEngine.length)
		return;
	if(index >=searchEngine[tab].length)
		return;

	title = searchEngine[tab][index]['title'];
	thumb = searchEngine[tab][index]['thumb'];	
	if(thumb==''){
		$('.select_showbox').css('text-indent', '1.5em');
		var selectOption = title;
	}
	else{
		$('.select_showbox').css('text-indent', '');
		var selectOption = '<img src="images/'+ thumb +'" width="75" height="35" alt="">';
	}
	$('.select_showbox').html(selectOption);

	//Form
	$('.others_params').empty();
	$('.searchbar form').attr("action",searchEngine[tab][index]['url']);
	$('.inp_srh').attr('name',searchEngine[tab][index]['key_param']);
	$('.btn_srh').attr('value',searchEngine[tab][index]['button']);
	var others_params = searchEngine[tab][index]['others_params'];
	var apv = others_params.split('&');
	apv.forEach(function(element) {
		var pv = element.split('=');
		var inp = '<input type="hidden" name="' + pv[0] + '" value="'+ pv[1] +'">';
		$('.others_params').append(inp);
	}, this);
}

function SetSelectOption(tab){
	var title;
	var thumb;

	if(tab >=searchEngine.length)
		return;
	$('.select_option').empty();
	//SelectBox
	for(var i=0;i<searchEngine[tab].length;i++)
	{
		title = searchEngine[tab][i]['title'];
		thumb = searchEngine[tab][i]['thumb'];	
		if(thumb==''){
			var searchli = $('<li>' + title + '</li>');
		}
		else{
			var searchli = $('<li><img src="images/'+ thumb +'" width="75" height="35" alt=""></li>');
		}
		searchli.appendTo('.select_option');
	}
}


