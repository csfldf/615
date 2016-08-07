/**
 * Created by FeiyuLab on 2014/9/24 0024.
 */
"use strict";
define(function() {
    var set={};
    /*=================================日期处理函数==================================================*/
    var date=set.date={}
    /**
     * 判断是否是合法日期
     * @param dateString
     * @returns {boolean|Array|{index: number, input: string}|*}
     */
    date.isDateString=function(dateString){
        return typeof dateString =='string' && dateString.match(/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/)
    }
    date.getCurrentDate=function(){
        var date=new Date(),
            year=date.getFullYear(),
            month=date.getMonth()+1,
            day=date.getDate();
        return year+'-'+((month<=9)?('0'+month):month)+'-'+((day<=9)?('0'+day):day);
    }
    /**
     * 求日期差值
     * @param dateString1
     * @param dateString2
     * @returns {Number}
     */
    date.dateDiff =function (dateString1, dateString2) {
        if(date.isDateString(dateString1) && date.isDateString(dateString2)){
            var date1 = new Date(dateString1),
                date2 = new Date(dateString2);
            var daysNum = parseInt((date1 - date2) / 1000 / 60 / 60 / 24);
            return daysNum;
        }
    }

    /*=================================模板处理函数==================================================*/
    var tmpl=set.tmpl={};
    /**
     * 删除模板中的script（src=""和含有justfordebug="true"）和link（ref=""）
     * @param tmpl
     * @returns {*}
     */
    tmpl.clearUselessHtml=function(tmpl){
        if(typeof tmpl == 'string'){
            tmpl=tmpl.replace(/<meta([\s\S]*?)\/>|<script src=(.*?)>|<link(.*?)ref=(.*?)>|<script(.+)justfordebug="true"[\w\W]*?<\/script>/gm,'');
            return tmpl;
        }
        else{
            return '';
        }
    }

    return set;
});
/**
 * 2014.10.14:add:clearUselessHtml，使用惰性匹配[*？]
 *            add:isDateString
*/