'use strict'
var fortunes = [
    'IS is using d25t','IS-3 is using BL-9','IS-8 is using 440','IS-7 is using S70'
]
exports.getFortune= function () {
        var idx = Math.floor(Math.random()*fortunes.length);
        return fortunes[idx];
    }
