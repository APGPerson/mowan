//ready
$(document).ready(function () {
	var UA = navigator.userAgent || null;
	var isIE = /(msie|trident.*rv:)/i.test(UA);
	if (isIE) {
		layer.open({
			content: '请用电脑访问，使用谷歌浏览器、火狐浏览器，或360浏览器的极速模式，本系统不支持IE浏览器。',
			btn: '好的'
		});
		return false;
	}
	changeSize();
	$(".project-name1")[0].innerText = sessionStorage.getItem("__zksim_login_title1") ?? "默认"
	$(".project-name2")[0].innerText = sessionStorage.getItem("__zksim_login_title2") ?? ""
	$(".project-name3")[0].innerText = sessionStorage.getItem("__zksim_login_title3") ?? ""
	//取考试信息
	//local_obj.flag = getUrlParam('flag');
	//getExamLogin(local_obj.examdm,local_obj.flag);
});

//随时随地重绘大小
$(window).resize(function () {
	changeSize();
})



function login() {
	const loadingFrame = layer.open({
		type: 2,
		content: '正在登录中'
	});

	setTimeout(() => { // 模拟登陆时间
		layer.close(loadingFrame);
		if ($("#txyzm").val().toUpperCase() !== "B23PY") {
			layer.open({
				content: "验证码错误",
				btn: '好的'
			});
			return false;
		}
		let stuid = sessionStorage.getItem("__zksim_login_stuid")
		let stuplace = sessionStorage.getItem("__zksim_login_stuplace")

		if (stuid !== null && stuid !== "" && $("#ksh").val() !== stuid) {
			layer.open({
				content: "账号错误",
				btn: '好的'
			});
			return false;
		}
		if (stuplace !== null && stuplace !== "" && $("#zwh").val() !== stuplace) {
			layer.open({
				content: "座位号错误",
				btn: '好的'
			});
			return false;
		}

		const targetUrl = `/website/score/cfzk.html`;
		window.location.href = targetUrl;
	}, 3000 * Math.random())
}
