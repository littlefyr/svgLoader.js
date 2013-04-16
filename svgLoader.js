/** @preserve
Copyright 2013 Adam van den Hoven
http://littlefyr.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(t){"use strict";function i(t){return t*a.PI/180}function n(t,n,e,r,o,s){e=i(e+180),r=i(r+180);var u=[[t+o*a.cos(e),n+o*a.sin(e)],[t+s*a.cos(e),n+s*a.sin(e)],[t+s*a.cos(r),n+s*a.sin(r)],[t+o*a.cos(r),n+o*a.sin(r)]],f=r-e,p=f%(2*a.PI)>a.PI?1:0,d=[];return d.push("M"+u[0].join()),d.push("L"+u[1].join()),d.push("A"+[s,s].join()+" 0 "+p+" 1 "+u[2].join()),d.push("L"+u[3].join()),d.push("A"+[o,o].join()+" 0 "+p+" 0 "+u[0].join()),d.push("z"),d.join(" ")}function e(t,i,n){var e=o.createElementNS("http://www.w3.org/2000/svg",t);if(i)for(var r in i)e.setAttribute(r,i[r]);return n&&n.appendChild(e),e}function r(t,i,r,o,a,s,u,f,p,d,c){i=parseInt(i,10),r=parseInt(r,10);var h,m=e("svg",{width:r+"px",height:i+"px",x:"50%",y:"50%",viewBox:"0 0 200 200",preserveAspectRatio:"xMidYMid meet"},e("g",{transform:"translate(-"+(r/2).toString(10)+",-"+(i/2).toString(10)+")"},e("svg",{height:"100%",width:"100%",version:"1.1"},t))),g=e("g",{},m),l=e("g",{},m),v=a/o;for(h=0;o>h;h++)e("path",{fill:f,"fill-opacity":p*h/o,d:n(100,100,v*h,v*(h+1),s,u)},g),e("path",{fill:f,"fill-opacity":p*h/o,d:n(100,100,-v*h,-v*(h+1),s,u)},l);e("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 100 100",to:"360 100 100",dur:d,repeatCount:"indefinite"},g),e("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",to:"0 100 100",from:"360 100 100",dur:c,repeatCount:"indefinite"},l)}var o=t.document,a=t.Math;t.svgLoader=r,"function"==typeof define&&define("svgLoader",[],function(){return r})}(window);