$(function(){function n(){return 1===r.length&&0===r[0]&&(r.length=0),$("div.calculate").text(r.join(""))}function e(){for(var n=0;n<l.length;n++)""===l[n]&&(l.splice(n,2),n-=1);return $("div.math").text(l.join(" "))}function t(){l.indexOf("=")>-1&&(l.length=0,r.length=0,e())}function i(n){if(n=n.toString().split(""),-1!==n.indexOf(".")){var e=n.slice(n.indexOf(".")+1,n.length);n=n.slice(0,n.indexOf(".")+1);for(var t=0;e[t]<1;)t++;return e=e.join("").slice(0,t+2),"0"===e[e.length-1]&&(e=e.slice(0,-1)),n.join("")+e}return n.join("")}function s(){$("div.content.decimal").click(function(){t(),r.indexOf(".")<0&&0===r.length?(r.push(0,$(this).children().text()),n()):r.indexOf(".")<0&&r.length>0?(r.push($(this).children().text()),n()):r.indexOf(".")>=0&&n()}),$("div.content.number").click(function(){t(),"0"===$(this)[0].innerText&&r.length<1?(r.length=0,n()):r.length<10&&(r.push($(this).children().text()),n())}),$("#backspace").click(function(){r.pop(),n()}),$("#clear").click(function(){r.length=0,l.length=0,n(),e()}),$("#negate").click(function(){t(),-1===r.indexOf("-")?(r.unshift("-"),n()):n()})}function o(){$("div.function").click(function(){l.push(r.join(""),$(this).children().text()),r.length=0,e()})}function c(){function n(n,e){return n*e}function e(n,e){return n/e}function t(n,e){return n+e}function s(n,e){return n-e}for(var o=l.slice(),c=1;c<o.length;c+=2)if("×"===o[c]){var u=Number(o[c-1]),r=Number(o[c+1]),a=n(u,r);o.splice(c-1,3,a),c-=2}for(var c=1;c<o.length;c+=2)if("÷"===o[c]){var u=Number(o[c-1]),r=Number(o[c+1]),a=e(u,r);o.splice(c-1,3,a),c-=2}for(var c=1;c<o.length;c+=2)if("+"===o[c]){var u=Number(o[c-1]),r=Number(o[c+1]),a=t(u,r);o.splice(c-1,3,a),c-=2}for(var c=1;c<o.length;c+=2)if("−"===o[c]){var u=Number(o[c-1]),r=Number(o[c+1]),a=s(u,r);o.splice(c-1,3,a),c-=2}return i(o[0])}function u(){var n=$("div.content.number"),e=$("div.content.decimal"),t=$("div.content.function"),i=$("div.content.manipulate");n.on("mousedown touchstart",function(){$(this).removeClass("number").addClass("press")}),n.on("mouseup touchend",function(){$(this).removeClass("press").addClass("number")}),e.on("mousedown touchstart",function(){$(this).removeClass("decimal").addClass("press")}),e.on("mouseup touchend",function(){$(this).removeClass("press").addClass("decimal")}),t.on("mousedown touchstart",function(){$(this).removeClass("function").addClass("press")}),t.on("mouseup touchend",function(){$(this).removeClass("press").addClass("function")}),i.on("mousedown touchstart",function(){$(this).removeClass("manipulate").addClass("press")}),i.on("mouseup touchend",function(){$(this).removeClass("press").addClass("manipulate")})}var r=[],l=[];u(),s(),o(),$("#equals").click(function(){r.length=0,n(),$("div.calculate").text(c())})});