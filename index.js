var fastmatter = require('fastmatter');
var moment = require('moment');
var _ = require('lodash');
moment().format();

var GIP = function (results) {
    this.parsed = _.map(results, function(h){
        h.priority = fastmatter(h.body);
        return h;
    });
};

GIP.prototype.output = function(){

    var this2 = this;

    var prioritizeIssue = function(h){

        var calculatedBlockers = function(h){

            if (Object.prototype.toString.call( h.blockers ) === '[object Array]') {

                return _.reduce(h.blockers, function(memo, num){

                    var d = _.filter(this2.parsed, function(obj){
                        return obj.number == num;
                    })[0];

                    if ( typeof d !== 'undefined' && d ){
                        return memo + prioritizeIssue(d.priority.attributes);
                    } else {
                        return memo + 0;
                    }

                }, 0);

            } else {
                return 0;
            }
        };


        var days = moment(h.due_date).diff(moment(), 'days');
        return (h.points || 0) +
            (h.business_value || 0) +
            (h.technical_value || 0) +
            (h.completion || 0) +
            calculatedBlockers(h) +
            days;
    };

    return _.map(this.parsed, function(h){
        h.priority.calculated = prioritizeIssue(h.priority.attributes);
        return h;
    });
};

module.exports = GIP;
