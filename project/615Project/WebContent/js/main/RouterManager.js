/**
 * Created by jiadongy on 10/4/2014.
 */
define(['mmRouter'], function (avalon) {
    var interfaces = {};
    interfaces.currentRules = [];

    interfaces.addRules = function (rules) {
        if (rules instanceof Array) {
            rules.forEach(function (el) {
                avalon.router.get(el.path, el.process);
                interfaces.currentRules.push(el);
            })
        }
        else if (typeof rules == 'object') {
            avalon.router.get(rules.path, rules.process);
            interfaces.currentRules.push(rules);
        }
    }

    interfaces.avalon = avalon;

    return interfaces;
})