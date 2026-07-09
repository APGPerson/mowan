/**
 * 每个界面的ready方法都需要调用
 */
function changeSize() {
    var docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementsByTagName("html")[0].style.fontSize = 100 * (clientWidth / 750) + 'px';
}

/**
 * 判断一个对象的值是否为空
 */
function isEmpty(value) {
	if (!value || typeof (value) == "undefined" || value == '') {
		return true;
	} else {
		return false;
	}
}
/**
 * 获取url中的参数
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

//刷新验证码
function refreshCode(obj){
	obj.src = "../../captcha.jpg?t=" + $.now();
}



//验证身份证号码
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
idCardValidate = function(idCard){
	idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
	if (idCard.length == 15) {
		return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
	} else if (idCard.length == 18) {
		var a_idCard = idCard.split("");                // 得到身份证数组
		if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
			return true;
		}else {
			return false;
		}
	} else {
		return false;
	}
}
function trim(strText){
	return (strText || "").replace( /^\s+|\s+$/g, "" );
}
