/**
 * Created by rtio on 2014/11/10.
 */
define(function(){
    var amData = {};

    metaData = [
        {   EmployeeId:'005',
            EmployeeName:'张三',
            RoleId:1,
            password:'1234',
            PermissionLevel:4
        },
        {   EmployeeId:'006',
            EmployeeName:'李四',
            RoleId:2,
            password:'1234',
            PermissionLevel:3
        },
        {   EmployeeId:'007',
            EmployeeName:'王五',
            RoleId:3,
            password:'1234',
            PermissionLevel:2
        },
        {   EmployeeId:'008',
            EmployeeName:'赵六',
            RoleId:4,
            password:'1234',
            PermissionLevel:5
        },
        {   EmployeeId:'009',
            EmployeeName:'钱七',
            RoleId:5,
            password:'1234',
            PermissionLevel:6
        },
        {   EmployeeId:'010',
            EmployeeName:'孙八',
            RoleId:6,
            password:'1234',
            PermissionLevel:1
        },
    ]//定义用户数据

    amData.getUser = function(username){
        if(typeof username == undefined && username == ''){
            return '';
        }
        for(var u in metaData){
            if(metaData[u].EmployeeId == username){
                return metaData[u];
            }
        }
        return '';
    }

    amData.verifyUser = function(userName,passWord){
        if(typeof userName !== undefined && typeof passWord !== undefined){
            var usr = amData.getUser(userName);
            if(typeof usr !== undefined && usr !== ''){
                if(usr.password == passWord)
                    return true;
            }
        }
        return false;
    };

    amData.getPermission = function(userID){
        if(typeof userID == undefined && userID == '')
            return '';
        var usr = amData.getUser(userID);
        var permission = usr.PermissionLevel;
        if(typeof permission !== undefined && permission !== '') {
            return usr.PermissionLevel;
        }
        return '';
    }
    return amData;
})