//ready

const params = new URL(document.location).searchParams;

$(document).ready(function(){
	changeSize();
	var examdm = sessionStorage.getItem("commonlogin_examdm");
	getExam(examdm);
	initForm();
});

//event
$(window).resize(function () {
    changeSize();
})

function initForm(){
	//查分
	getStuFs();
	//初始化遮罩相关的事件
	addEventListener();
}

//获取（经过登录后跳转到主功能界面上）的系统标题
function getExam(examdm){
	const diwen = "diwen.png" // 硬编码背景图
	$(".container")[0].style = 'background: url(./images/'+diwen+');background-size: contain;';

	$("#sysTitle1").text(params.get("title1") ?? "默认标题");
	$("#sysTitle2").text(params.get("title2") ?? "");
}

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

// 作者：youthcity
// 链接：https://juejin.cn/post/6844903665522704398
// 	来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


function genQR(data){
	var qrcode = new QRCode(document.getElementById('img'), {
		text: randomString(500, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
		width: window.innerWidth / 2,
		height: window.innerWidth / 2,
		colorDark : "#000000",
		colorLight : "#ffffff",
		version: 7,
		correctLevel : QRCode.CorrectLevel.H
	});
}

function getStuFs(){
	let data = sessionStorage.getItem("data") // 使用来自sessonStorage的数据而不是URL Param避免XSS注入被利用(其由用户自行设置)
	try{
		if (data === null){
			throw new Error
		}
		data = JSON.parse(data)
	}catch{
		layer.open({
					type: 0,
					content: "请添加有效数据",
					btn: ['OK'],
					yes: (index) => {
						history.back() // 返回上一页
					}
		});
		return;
	}

	$("#zkzh").text(data.stuid ?? 0);
	// $("#zjhm").text(stu.zjhm); WTF IT IS
	$("#xm").text(data.stuname ?? "未知");

	// 有成绩项目
	if(data.score){
		genQR(data.score);
		let append_html = ""
		for (const [name,score] of Object.entries(data.score)){
			append_html += '<tr>';
			if(typeof(score) === 'number'){
				append_html += '<td><span>'+trim(name)+'</span></td><td><span>'+score+'</span></td>';
			}else{
				append_html += '<td><span>'+trim(name)+'</span></td><td><span>复核中</span></td>'
			}	
		}
		append_html += "<tr>"
		$("#infobody").append(append_html);
	}


	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)||/(Android)/i.test(navigator.userAgent)) {
					$("#alertInfo").append("<span >目前移动端暂不支持成绩复核申请功能，若需申请成绩复核，请用电脑访问招考资讯网中的成绩发布功能。</span>");
					$("#alertInfo").show();
					$("#fuheInfo").hide();
					$("#fuheButton").hide();
					return
	}

	// 有复核项目
	if (data.review){
		if(data.review.reviewed){ // 已复核过
			$("#infotr").append('<td>成绩复核状态</td>');
		}
		if (data.review.open){
			$("#alertInfo").hide();
			$("#fuheInfo").show();
			$("#fuheButton").show();
		}else{
			$("#alertInfo").append("<span class=\"color-red\">复核申请开放时间为："+(data.review.start ?? "未指定")+" 至 "+(data.review.end ?? "未指定")+"</span>");
			$("#alertInfo").show();
			$("#fuheInfo").hide();
			$("#fuheButton").hide();
		}
	}
};

function fuheshenqing(){
	// 禁用复核功能
}

function showImg(path){
	//展开遮罩层和图片框
	$('#cf_layer').show();
	$('#cf_imgdiv').show();
//	console.log(path);
	//卷头图
	var imgpath= "../../maystar/" +"/"+ path;
	$('#cf_img').attr('src',imgpath);
}

function hideImg(){
	//展开遮罩层和图片框
	$('#cf_layer').hide();
	$('#cf_imgdiv').hide();
}
function replacepos(text,start,stop,replacetext){
    mystr = text.substring(0,start-1)+replacetext+text.substring(stop+1);
    return mystr;
}
function addEventListener(){
	$('#cf_layer').on('click' ,hideImg);
	$('#cf_close').on('click' ,hideImg);
}