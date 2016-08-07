/**
 * Created by rtio on 2014/11/8.
 */
define(function() {
    var amCookie = {};

    amCookie.get = function(key){
        var str,ary;
        str = document.cookie;
        ary = str.replace(/ *; */g,";").split(";");
        key = escape(key) + "=";
        for(var i=0; i<ary.length;i++){
            if(ary[i].indexOf(key) == 0){
                return (unescape(ary[i].split("=")[1]));
            }
        }
    };

    amCookie.set = function(key,value,cookieDomain,cookiePath,expireTime,targetWindow){
        var strAppendix = "";
        strAppendix += cookieDomain?"domain="+cookieDomain:"";
        strAppendix += cookiePath?"path="+cookiePath:"";
        strAppendix += expireTime?"expires="+expireTime:"";
        strAppendix += targetWindow?targetWindow:top;
        window.document.cookie += escape(key) + "=" + escape(value) +strAppendix.length>0?strAppendix:'';
//        alert(window.document.cookie)
    };

    amCookie.remove = function(name, opt) {
        opt = opt || {}
        if (!opt.expires) {
            opt.expires = new Date(1970, 0, 1)
        }
        amCookie.set(name, '', opt)
    }

    return amCookie;

});
