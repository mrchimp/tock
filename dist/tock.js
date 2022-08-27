/*!
 * 
 *   tocktimer v1.1.1
 *   https://github.com/mrchimp/tock.git
 *
 *   Copyright (c) Mr Chimp  and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Tock=e():t.Tock=e()}(this,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function o(t,e){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.add(t)}function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function a(t,e,i){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return i}t.r(e),t.d(e,{default:()=>b});var r=/^\s*(\+|-)?\d+\s*$/,h=/^(\d{1,2}):(\d{2})$/,l=/^(\d{1,2}):(\d{2})(?::|\.)(\d{2,3})$/,u=36e5,c=6e4,d=1e3,m=/^(\d{4})-([0-1]\d)-([0-3]\d)(?:\s|T)(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3})Z?)?$/,f=new WeakSet,p=new WeakSet,v=new WeakSet;function _(){if(this.time+=this.interval,this.countdown&&this.duration_ms-this.time<0)return this.final_time=0,this.go=!1,this.callback(this),clearTimeout(this.timeout),void this.complete(this);this.callback(this);var t=Date.now()-this.start_time-this.time,e=t>0?this.interval-t:this.interval;e<=0?(this.missed_ticks=Math.floor(Math.abs(e)/this.interval),this.time+=this.missed_ticks*this.interval,this.go&&a(this,f,_).call(this)):this.go&&(this.timeout=window.setTimeout(a(this,f,_).bind(this),e))}function w(t){this.duration_ms=t,this.start_time=Date.now(),this.time=0,this.go=!0,a(this,f,_).call(this)}function y(t){this.start_time=t||Date.now(),this.time=0,this.go=!0,a(this,f,_).call(this)}const b=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),o(this,v),o(this,p),o(this,f),n(this,"go",void 0),n(this,"timeout",void 0),n(this,"missed_ticks",void 0),n(this,"interval",void 0),n(this,"countdown",void 0),n(this,"start_time",void 0),n(this,"pause_time",void 0),n(this,"final_time",void 0),n(this,"duration_ms",void 0),n(this,"time",void 0),n(this,"callback",void 0),n(this,"complete",void 0),this.go=!1,this.timeout=void 0,this.missed_ticks=null,this.interval=e.interval||10,this.countdown=e.countdown||!1,this.start_time=0,this.pause_time=0,this.final_time=0,this.duration_ms=0,this.time=0,this.callback=e.callback||function(){},this.complete=e.complete||function(){}}var e,_,b;return e=t,_=[{key:"reset",value:function(){if(this.countdown)return!1;this.stop(),this.start_time=0,this.time=0}},{key:"start",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"0";if(this.go)return!1;var e=this.timeToMS(t);this.start_time=e,this.pause_time=0,this.countdown?a(this,p,w).call(this,e):a(this,v,y).call(this,Date.now()-e)}},{key:"stop",value:function(){this.pause_time=this.lap(),this.go=!1,clearTimeout(this.timeout),this.countdown?this.final_time=this.duration_ms-this.time:this.final_time=Date.now()-this.start_time}},{key:"pause",value:function(){this.go?(this.pause_time=this.lap(),this.stop()):this.pause_time&&(this.countdown?a(this,p,w).call(this,this.pause_time):a(this,v,y).call(this,Date.now()-this.pause_time),this.pause_time=0)}},{key:"lap",value:function(){return this.go?this.countdown?this.duration_ms-(Date.now()-this.start_time):Date.now()-this.start_time:this.pause_time||this.final_time}},{key:"msToTime",value:function(t){var e=this.zeroPad(t%d,3),i=this.zeroPad(Math.floor(t/d%60),2);return this.zeroPad(Math.floor(t/c%60),2)+":"+i+"."+e}},{key:"zeroPad",value:function(t,e){for(t=t.toString();t.length<e;)t="0"+t;return t}},{key:"msToTimecode",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.zeroPad(Math.floor(t/d%60),2),s=this.zeroPad(Math.floor(t/c%60),2),o=this.zeroPad(Math.floor(t/u),2),n=e?":"+this.zeroPad(Math.floor(t%d),3):"";return o+":"+s+":"+i+n}},{key:"timeToMS",value:function(t){if(r.test(String(t)))return parseInt(t,10);var e,i,s,o,n=new Date;return h.test(t)?(i=t.split(":"),e=parseInt(i[0],10)*c,e+=parseInt(i[1],10)*d):(s=t.match(l))?3==s[3].length||parseInt(s[3],10)>59?(e=parseInt(s[1],10)*c,e+=parseInt(s[2],10)*d,e+=parseInt(s[3],10)):(e=parseInt(s[1],10)*u,e+=parseInt(s[2],10)*c,e+=parseInt(s[3],10)*d):(s=t.match(m))?((o=new Date).setFullYear(parseInt(s[1],10)),o.setMonth(parseInt(s[2],10)),o.setDate(parseInt(s[3],10)),o.setHours(parseInt(s[4],10)),o.setMinutes(parseInt(s[5],10)),o.setSeconds(parseInt(s[6],10)),void 0!==s[7]&&o.setMilliseconds(parseInt(s[7],10)),e=Math.max(0,o.getTime()-n.getTime())):(e=Date.parse(t),isNaN(e)?0:Math.max(0,e-n.getTime()))}}],_&&s(e.prototype,_),b&&s(e,b),Object.defineProperty(e,"prototype",{writable:!1}),t}();return e})()));
//# sourceMappingURL=tock.js.map