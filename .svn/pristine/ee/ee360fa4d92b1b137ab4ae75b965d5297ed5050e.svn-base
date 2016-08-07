//包含所有与am相关的函数，常量等JS代码
/*   
 * MAP对象，实现MAP功能   
 *   
 * 接口：   
 * size()     获取MAP元素个数   
 * isEmpty()    判断MAP是否为空   
 * clear()     删除MAP所有元素   
 * put(key, value)   向MAP中增加元素（key, value)    
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False   
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL   
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL   
 * containsKey(key)  判断MAP中是否含有指定KEY的元素   
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素   
 * values()    获取MAP中所有VALUE的数组（ARRAY）   
 * keys()     获取MAP中所有KEY的数组（ARRAY）   
 *   
 * 例子：   
 * var map = new Map();   
 *   
 * map.put("key", "value");   
 * var val = map.get("key")   
 * ……   
 *   
 */     
function Map() {     
    this.elements = new Array();     
       
    //获取MAP元素个数     
    this.size = function() {     
        return this.elements.length;     
    }     
       
    //判断MAP是否为空     
    this.isEmpty = function() {     
        return(this.elements.length < 1);     
    }     
       
    //删除MAP所有元素     
    this.clear = function() {     
        this.elements = new Array();     
    }     
       
    //向MAP中增加元素（key, value)      
    this.put = function(_key, _value) {     
        this.elements.push( {     
            key : _key,     
            value : _value     
        });     
    }     
       
    //删除指定KEY的元素，成功返回True，失败返回False     
    this.remove = function(_key) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    this.elements.splice(i, 1);     
                    return true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取指定KEY的元素值VALUE，失败返回NULL     
    this.get = function(_key) {     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    return this.elements[i].value;     
                }     
            }     
        } catch(e) {     
            return null;     
        }     
    }     
       
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
    this.element = function(_index) {     
        if(_index < 0 || _index >= this.elements.length) {     
            return null;     
        }     
        return this.elements[_index];     
    }     
       
    //判断MAP中是否含有指定KEY的元素     
    this.containsKey = function(_key) {     
        varbln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //判断MAP中是否含有指定VALUE的元素     
    this.containsValue = function(_value) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].value == _value) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取MAP中所有VALUE的数组（ARRAY）     
    this.values = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].value);     
        }     
        return arr;     
    }     
       
    //获取MAP中所有KEY的数组（ARRAY）     
    this.keys = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].key);     
        }     
        return arr;     
    }     
}     
//批量隐藏，禁用元素(只对textbox和datebox有效,要求每个元素都在一个独立单元之下div或td等）
var groupHide = function(hideStringMatch){
	if(hideStringMatch != null && hideStringMatch != ''){
		var $hides = $("[hidewhen~="+hideStringMatch+"]");
		$hides.hide();
	}
}
var groupDisable = function(disableStringMatch){
	if(disableStringMatch != null && disableStringMatch != ''){
		var $disables = $("[disablewhen~="+disableStringMatch+"]");
		$disables.each(function(index, element) {
            var firstclass = $(element).attr('class').split(' ')[0];
			var method = firstclass.split('-')[1];
			eval('$(element).'+method+'("disable")');
        });
		
		//$disables.parent().find('input').attr('disabled',true);
	}
}
/**
** THIS PART USED　FOR　am/plan_list.html
**/
//内部函数，返回button的html代码
var getButtonHtml = function(actionType,tableId,actionHref,rowIndex,rowData,type){
	var button='';
	var callback;
	var result=new Array();
	//HTML for Special Action button
	if(type==0){
//	button = '<a id="'+ actionType.idPrefix + rowIndex +tableId+'" href="javascript:operationButtonClick(\''+ 
//				tableId +'\',\'' + actionHref[0] + '\',' + rowIndex + ');">' + actionType.text +'</a>';
	//HTML for View button
	if(actionType.value != C.VIEW.value)
		button+= '<a id="'+ C.VIEW.idPrefix + rowIndex +tableId+'" href="javascript:otherButtonClick(\''+ 
					rowData.planCode + '\','+C.VIEW.value+');">' + C.VIEW.text +'</a>';
	//HTML for Change button
	button += '<a id="'+ C.CHANGE.idPrefix + rowIndex +tableId+'" href="javascript:otherButtonClick(\''+ 
					rowData.planCode + '\','+C.CHANGE.value+');">' + C.CHANGE.text +'</a>';
	}else{
		button= '<a id="'+ C.VIEW.idPrefix + rowIndex +tableId+'" href="javascript:otherButtonClick(\''+ 
		rowData.planCode + '\','+C.VIEW.value+');">' + C.VIEW.text +'</a>';
	}
	callback=function(){
		//状态不是View时，生成用于样式化的回调函数
		$("#"+ actionType.idPrefix + rowIndex+tableId).linkbutton({text:actionType.text,plain:true,size:'small',iconCls:actionType.icon});
		//如果此plan状态不是View，就需要另外加一个View按钮
		if(actionType.value != C.VIEW.value)
			$("#"+ C.VIEW.idPrefix + rowIndex+tableId).linkbutton({text:C.VIEW.text,plain:true,size:'small',iconCls:C.VIEW.icon});
		//样式化Change按钮
		$("#"+ C.CHANGE.idPrefix + rowIndex+tableId).linkbutton({text:C.CHANGE.text,plain:true,size:'small',iconCls:C.CHANGE.icon});
		}
	result[0]=button;
	if(callback!=null)
		result[1]=callback;
	return result;
}
//内部函数，按钮点击后执行的动作
var operationButtonClick = function(tableId,hrefvalue,rowIndex){
	//funcList.execute();
	//funcList.clear();
	var $table=$("#"+tableId);
	//验证参数合法性
	if($table!=null && hrefvalue!="" && rowIndex){
	$.get(
		hrefvalue,
		//点击按钮后若服务器返回成功，则刷新此行
		function(data){
			if(data = 1){
				//$table.datagrid('reload');
				var rows=$table.datagrid('getRows');
				$.get(buildUrl(C.URL_GET_ONE_PLAN , [C.URLPARAS_GET_ONE_PLAN[0],$table.datagrid(rows[rowIndex])]),
					function(data){
						$table.datagrid('updateRow',data);
					},
					'json'
				);
			}
		},
		'text');
	}
}
var otherButtonClick = function(plancode,actionValue){
	if(plancode != null && plancode !='')//刷新本页面，不太好
		switch(actionValue){
			case C.CHANGE.value:
				location.href=buildUrl(C.URL_CHANGE_ONE_PLAN,[C.URLPARAS_CHANGE_ONE_PLAN[0],'search'],[C.URLPARAS_CHANGE_ONE_PLAN[1],plancode],
																[C.URLPARAS_CHANGE_ONE_PLAN[2],'change']);
				break;
			case C.VIEW.value:
			default:
				location.href=buildUrl(C.URL_VIEW_ONE_PLAN,[C.URLPARAS_VIEW_ONE_PLAN[0],'search'],[C.URLPARAS_VIEW_ONE_PLAN[1],plancode]);
		}
}
var getPlanStateActionById = function(stateValue){
							var result;
							switch(stateValue){
								case 1:
									result = C.AUDIT;break;
								case 2:
									result = C.DISPATCH;break;
								case 3:
									result = C.ACCEPT;break;
								case 4:
									result = C.FINISH;break;
								case 5:
									result = C.FINISH;break;
								case 6:
									result = C.VIEW;break;												
								case 7:
									result = C.AUDIT;break;											
								case 8:
									result = C.VIEW;break;
							}
							return result;
						};
//内部函数，根据传入的stateValue（string）返回对应执行的动作类
var getPlanStateAction = function(stateValue){
							var result;
							switch(stateValue){
								case C.BEFORE_AUDIT_PLAN.text:
									result = C.AUDIT;break;
								case C.AFTER_AUDIT_PLAN.text:
									result = C.DISPATCH;break;
								case C.BEFORE_ACCEPT_PLAN.text:
									result = C.ACCEPT;break;
								case C.AFTER_ACCEPT_PLAN.text:
									result = C.FINISH;break;
								case C.BEFORE_FINISH_PLAN.text:
									result = C.FINISH;break;
								case C.AFTER_FINISH_PLAN.text:
									result = C.VIEW;break;												
								case C.BEFORE_ANOTHER_AUDIT_PLAN.text:
									result = C.AUDIT;break;											
								case C.AFTER_ANOTHER_AUDIT_PLAN.text:
									result = C.VIEW;break;
							}
							return result;
						};
//内部函数，根据传入的stateText（string）返回对应的stateCode
var getPlanStateCodeByText = function(stateText){
							var result;
							switch(stateText){
								case C.BEFORE_AUDIT_PLAN.text:
									result = C.BEFORE_AUDIT_PLAN.code;break;
								case C.AFTER_AUDIT_PLAN.text:
									result = C.AFTER_AUDIT_PLAN.code;break;
								case C.BEFORE_ACCEPT_PLAN.text:
									result = C.BEFORE_ACCEPT_PLAN.code;break;
								case C.AFTER_ACCEPT_PLAN.text:
									result = C.AFTER_ACCEPT_PLAN.code;break;
								case C.BEFORE_FINISH_PLAN.text:
									result = C.BEFORE_FINISH_PLAN.code;break;
								case C.AFTER_FINISH_PLAN.text:
									result = C.AFTER_FINISH_PLAN.code;break;												
								case C.BEFORE_ANOTHER_AUDIT_PLAN.text:
									result = C.BEFORE_ANOTHER_AUDIT_PLAN.code;break;											
								case C.AFTER_ANOTHER_AUDIT_PLAN.text:
									result = C.AFTER_ANOTHER_AUDIT_PLAN.code;break;
							}
							return result;
						};
						
//声明经常使用的常量值
C={
	BEFORE_AUDIT_PLAN			:	{text:'待审核',code:1},		//待审核
	AFTER_AUDIT_PLAN			:	{text:'已审核',code:2},		//已审核
	BEFORE_ACCEPT_PLAN			:	{text:'待接受',code:3},		//待接受
	AFTER_ACCEPT_PLAN			:	{text:'已接受',code:4},		//已接受
	BEFORE_FINISH_PLAN			:	{text:'待完成',code:5},		//待完成
	AFTER_FINISH_PLAN			:	{text:'已完成',code:6},		//已完成
	BEFORE_ANOTHER_AUDIT_PLAN	:	{text:'待再次审核',code:7},	//待再次审核
	AFTER_ANOTHER_AUDIT_PLAN	:	{text:'已再次审核',code:8},	//已再次审核
	//与plan状态变化有关的动作
	AUDIT					:	{value:0,idPrefix:'auditButton_',text:'过审',icon:'icon-undo'},
	DISPATCH				:	{value:1,idPrefix:'dispatchButton_',text:'发布',icon:'icon-redo'},
	ACCEPT					:	{value:2,idPrefix:'acceptButton_',text:'接受',icon:'icon-man'},
	FINISH					:	{value:3,idPrefix:'finishButton_',text:'完成',icon:'icon-cut'},
	DELAY					:	{value:4,idPrefix:'delayButton_',text:'延迟',icon:'icon-no'},
	VIEW					:	{value:5,idPrefix:'viewButton_',text:'操作',icon:'icon-edit'},
	CHANGE					:	{value:6,idPrefix:'changeButton_',text:'更改',icon:'icon-man'},
	
	URL_GET_ONE_PLAN		:	'../am/get.action',				URLPARAS_GET_ONE_PLAN			:	['planCode'],
	URL_GET_ALL_PLANS		:	'../am/getPlans.action',	
	URL_DEL_ONE_ATTACHMENT	:	'../am/delFile.action',			URLPARAS_DEL_ONE_PLAN			:	['planCode','fileName'],
	URL_ADD_ONE_PLAN		:	'../am/add.action',				URLPARAS_ADD_ONE_PLAN			:	['planCode'],
	URL_UPDATE_ONE_PLAN		:	'../am/update.action',			URLPRRAS_UPDATE_ONE_PLAN		:	['planCode'],
	URL_ADD_ONE_ATTACHMENT	:	'../am/file.action',			URLPARAS_ADD_ONE_PLAN			:	['planCode','fileName'],
	URL_GET_ALL_PLAN_STATES	:	'../am/getAllStates',			URLPARAS_GET_ALL_PLAN_STATES	:	['stateCode','stateName'],
	URL_VIEW_ONE_PLAN		:	'../am/plan_report.html',		URLPARAS_VIEW_ONE_PLAN			:	['type','planCode'],
	URL_VIEW_PLAN_CATEGORY	:	'../am/getCategory.action',	
	URL_DEL_ONE_PLAN		:	'../am/delete.action',			URLPARAS_DEL_ONE_PLAN			:	['planCode'],
	URL_CHANGE_ONE_PLAN		:	'../am/plan_report.html',		URLPARAS_CHANGE_ONE_PLAN		:	['type','planCode','modifyType'],	
	URL_GET_PLAN_CONTROLLERS:	'../am/getalluser.action',		URLPARAS_GET_PLAN_CONTROLLERS	:	[],	
	URL_GET_ROLES			:	'../am/getRoleList',			URLPARAS_GET_ROLES				:	['employeeId'],
	URL_GET_PLANS_BY_ROLE	:	'../am/getPlanByRoleId',		URLPARAS_GET_PLANS_BY_ROLE		:	['roleId','complete'],
	URL_GET_PLANS_BY_EMP	:	'../am/getPlansByEmployeeId',	URLPARAS_URL_GET_PLANS_BY_EMP	:	['employeeId'],
	URL_GET_SCRIPT_LIST		:	'../am/getScriptList',		URLPARAS_GET_SCRIPT_LIST		:	['employeeId']
}
//URL生成器,第一个参数无参数网址，后面跟任意数量的[参数名,参数]
var buildUrl = function(originUrl){
	var url = arguments.length>1?arguments[0]+'?':arguments[0];
	if(arguments.length > 1){
		for(var i=1;i<arguments.length;i++)
			if(arguments[i].length ==2 && arguments[i][0] != null && arguments[i][0] != ''
										&& arguments[i][1] != null && arguments[i][1] != '')
				url+= (i<=1)?(arguments[i][0]+'='+arguments[i][1]):('&'+arguments[i][0]+'='+arguments[i][1]);
			else
				return '';
	}
	return url;
}
//回调函数执行器
fArray=new Array();
funcList = {
	execute 	: function(){
				for(var index in fArray)
					fArray[index]();
				},
	add		: function(func){
				if(typeof(func) == 'function')
					fArray.push(func);
				},
	clear	: function(){
				fArray.length=0;
				}
}
/**
** THIS PART USED　FOR　am/plan_report.html
**/
//数字比较器 返回1：大于，0：等于或者格式不正确，-1：小于
function numberCompartor(num1,num2){
	var n1=isNaN(num1)==false?parseInt(num1):null;
	var n2=isNaN(num2)==false?parseInt(num2):null;
	if(n1 ==null || n2 == null || n1 == n2)
		return 0;
	else if(n1 > n2)
		return 1;
	else
		return -1;
}
//日期比较器 返回1：大于，0：等于，-1：小于，-2：格式不正确
var dateCompartor = function(origin,anotherString){
	var origin_date=origin.split('-');
	var another_date=anotherString.split('-');
	var formatValid=true;
	if(origin_date.length!=3 || another_date.length!=3)
		formatValid=false;
	for(var i=0;i<3;i++)
		if(isNaN(origin_date[i])==true && isNaN(another_date[i])==true){
			formatValid=false;
			break;
		}
	if(formatValid){
		for(var j=0;j<3;j++){
			if(parseInt(origin_date[j])>parseInt(another_date[j]))
				return 1;
			else if(parseInt(origin_date[j])<parseInt(another_date[j]))
				return -1;
		}
		return 0;
	}
	else
		return -2;	
}
//设置easyui-datebox的解析格式:yyyy-mm-dd,传入id数组
var initAllDateboxFormat = function(id){
	if(id instanceof Array){
		id.forEach(function(value){
			$("#"+value).datebox({
				formatter:function(date) {
					var y = date.getFullYear();
					var m = date.getMonth()+1;
					var d = date.getDate();
					return y+'-'+m+'-'+d;
				},
				parser:function(s){
					if (s) {
						var a = s.split('-');  
						var d = new Date(parseInt(a[0]), parseInt(a[1]) - 1, parseInt(a[2]));  
						return d; 
					} 
					else {  
						return new Date();
					}
				},
			});
		});
	}
}
//截断页面中所有easyui-datebox中的日期时间为日期
var setAllDateboxNoTime = function(){
	$.each($(".easyui-datebox"),function(index,onedatebox){
		var tmp=onedatebox.datebox('getValue').split(' ')[0];
		onedatebox.datebox('setValue',tmp);		
	});
}
//生成整个fileExisted区域
var initExistedAttachmentList = function(fileExistedDivId,plancode,planoutput){
	var $parentDiv=$("#"+fileExistedDivId);
	var $clickBindObject=$parentDiv.find("div.cancel");
	var $fileOperationDescription=$parentDiv.find("span.data");
	var $fileName=$parentDiv.find("span.fielName");
	//清空附件列表并重新根据planoutput生成
	$parentDiv.children().remove();
	$.each(planoutput,function(index,value){
			var display_filename=value.fileName;
			var tooltipsetting="";
			if(display_filename.length>25){
				display_filename=display_filename.substring(0,24)+'...';
				tooltipsetting=' easyui-tooltip" title="'+ value.fileName;
			}
			$parentDiv.append('<div id="attachment_'+ index +'" class="uploadify-queue-item">'+					
			'<div class="cancel"><a href="javascript:void(0)">X</a></div>'+					
			'<span class="fileName'+ tooltipsetting +'">'+ display_filename +'</span>'+
			'<span class="data">&nbsp;&nbsp;<a href="'+ value.fileHref +'">View</a></span></div>');
	});
	//为附件列表中的每一项cancel生成删除操作
	$clickBindObject.bind('click',function() {
		$fileOperationDescription.text('Deleting');
		$.get(
			buildUrl(C.URL_DEL_ONE_ATTACHMENT,[C.URLPARAS_DEL_ONE_PLAN[0],plancode],
												[C.URLPARAS_DEL_ONE_PLAN[1],$fileName.text()]),
			//返回成功标志时应该移除这个条目
			function back(data) {
				if(data == 1){
					$fileOperationDescription.select("a").attr('href','javascript:void()');
					$parentDiv.delay(900).fadeOut(500, function() {$(this).remove();});
				}
				else
					$fileOperationDescription.text('Delete Failed');
			},
			"json"
		);
	});
}
//通用Tree生成( 递归从root开始把son挂到parent下，支持多root（level=1),空间3N，时间N^level）
var Tree = {
	leafVN 		: 'leaf',
	parentVN 	: 'parentCode',
	levelVN 	: 'level',
	idVN		: 'planCode',
	textVN		: 'planName',
	sons		: new Array(),
	addtionalVN	: 'plans',
	getTree		: function(info,leafVN,parentVN,levelVN,idVN,textVN,addtionalVN){
		if(info != null){
			var result;
			if(leafVN&&parentVN&&levelVN&&idVN&&textVN){
				Tree.leafVN = leafVN;
				Tree.parentVN = parentVN;
				Tree.levelVN = levelVN;
				Tree.idVN = idVN;
				Tree.textVN = textVN;
			}
			if(Tree.leafVN&&Tree.parentVN&&Tree.levelVN&&Tree.idVN&&Tree.textVN)
				result = Tree.getFinalData(info);
			if(addtionalVN){
				Tree.addtionalVN = addtionalVN;
				Tree.addOtherNodesToLeafs();
			}
			return result;
			
		}
	},
	//外部调用接口,返回json格式数据用于combotree的加载
	getFinalData : function(info){
		if(info instanceof Array){
			var topNodes = info.filter(function(value,index,array){
				if(eval('value.'+Tree.levelVN) == 1)
					return true;
			});
			var resultData = new Array();
			topNodes.forEach(function(value,index,array){
				resultData.push(Tree.getNewNodeData(eval('value.'+Tree.idVN),eval('value.'+Tree.textVN)));
			});
			resultData.forEach(function(value,index,array){
				resultData[index] = Tree.getNodeWithSons(info,topNodes[index],resultData[index]);
			});
			return resultData;
		}
		else
			return null;
	},
	//内部函数，返回挂好子节点的父节点，递归查找
	getNodeWithSons : function(info,parentNode,parentData){
		if(parentData.children instanceof Array){
			info.forEach(function(value,index,array){
				if(eval('value.'+Tree.parentVN) == eval('parentNode.'+Tree.idVN)){
					var son = Tree.getNewNodeData(
								eval('value.'+Tree.idVN),eval('value.'+Tree.textVN),eval('value.'+Tree.leafVN));
					Tree.sons.push(son);
					parentData.children.push(son);
					Tree.getNodeWithSons(info,value,son);
				}
			});
		}
		return parentData;
	},
	//内部函数：根据id和text返回新的节点类
	getNewNodeData : function(id,text,isLeaf){
		return isLeaf==true?{'id':id,'text':text}:{'id':id,'text':text,children:new Array()};
	},	
	addOtherNodesToLeafs : function(info){
		if(Tree.sons.length>0){
			Tree.sons.forEach(function(value,index,array){
				if(typeof(value.children) == 'undefined'){
					var otherData = null;
					for(var i in info){
						if(eval('info[i].'+idVN) == value.id){
							otherData = eval('info[i].'+addtionalVN);
							break;
						}
					}
					if(otherData != null){
						otherData.forEach(function(value1,index1){
							var son = Tree.getNewNodeData(addtionalVN+'_'+index1,value1,true);
							value.children = son;
						});
					}
				}
			});
		}
	}
}
var Combo = {
	idVN	:	null,
	textVN	:	null,
	descVN	:	null,
	groupVN	:	null,
	getCombo	:	function(info,idVN,textVN,groupVN,descVN){
		if(info&&idVN&&textVN){
			Combo.idVN = idVN;
			Combo.textVN = textVN;
			if(groupVN)
				Combo.groupVN = groupVN;
			if(descVN)
				Combo.descVN = descVN;
			var result = Combo.getFinalData(info);
			return result;
		}
			
	},
	getFinalData	:	function(info){
		if(info instanceof Array){
			var result = new Array();
			info.forEach(function(value,index,aray){
				result.push({value:eval('value.'+Combo.idVN),text:eval('value.'+Combo.textVN)});
			});
			if(Combo.descVN)
				if(Combo.descVN instanceof Function == false)
					info.forEach(function(value,index){
						result[index].desc=eval('value.'+Combo.descVN);});
				else 
					info.forEach(function(value,index){
						result[index].desc=Combo.descVN(value)});
					
			if(Combo.groupVN)
				info.forEach(function(value,index){
					result[index].group=eval('value.'+Combo.groupVN);
			});
			return result;
		}
	}
}




































