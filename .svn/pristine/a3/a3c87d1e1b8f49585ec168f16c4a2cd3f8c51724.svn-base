//本页面的cookie操作
function SetCCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 300; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCCookie(name)//取cookies函数       
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return (arr[2]); return null;
}
function delCCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


//父页面的cookie操作
function SetFCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 300; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    window.parent.document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getFCookie(name)//取cookies函数       
{
    var arr = window.parent.document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return (arr[2]); return null;
}
function delFCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) window.parent.document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}