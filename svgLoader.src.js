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
!function (window) {
    'use strict';
    var document = window.document,
        Math = window.Math;

    // Create a path for an annular sector
    // https://gist.github.com/4190516
    function deg2rad(deg) {
        return deg * Math.PI / 180;
    }

    function annularSector(centerX, centerY, startAngle, endAngle, innerRadius, outerRadius) {
        startAngle = deg2rad(startAngle + 180);
        endAngle = deg2rad(endAngle + 180);

        var p = [
            [centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle)],
            [centerX + outerRadius * Math.cos(startAngle), centerY + outerRadius * Math.sin(startAngle)],
            [centerX + outerRadius * Math.cos(endAngle), centerY + outerRadius * Math.sin(endAngle)],
            [centerX + innerRadius * Math.cos(endAngle), centerY + innerRadius * Math.sin(endAngle)]
        ];

        var angleDiff = endAngle - startAngle,
            largeArc = (angleDiff % (Math.PI * 2)) > Math.PI ? 1 : 0;

        var commands = [];

        commands.push('M' + p[0].join());
        commands.push('L' + p[1].join());
        commands.push('A' + [outerRadius, outerRadius].join() + ' 0 ' + largeArc + ' 1 ' + p[2].join());
        commands.push('L' + p[3].join());
        commands.push('A' + [innerRadius, innerRadius].join() + ' 0 ' + largeArc + ' 0 ' + p[0].join());
        commands.push('z');

        return commands.join(' ');
    }


    // Some DOM helpers
    function create(type, attr, parent) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', type);
        if (attr){
            for (var name in attr) {
                element.setAttribute(name, attr[name]);
            }
        }
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    }

     function svgLoader(container, height, width, sections, arcSize, innerRadius, outerRadius, color, opacity, cwTime, ccwTime){
        height = parseInt(height, 10);
        width = parseInt(width, 10);
        var svg = create('svg', {
                width: width+'px',
                height: height+'px',
                x: '50%',
                y: '50%',
                viewBox: '0 0 200 200',
                preserveAspectRatio: 'xMidYMid meet'
            }, create('g', {transform: 'translate(-' + (width/2).toString(10) +',-' + (height/2).toString(10) +')'},create('svg', {height:'100%', width:'100%', version:'1.1'}, container))),
            cw = create('g',{}, svg),
            ccw = create('g', {}, svg),
            section = arcSize/sections,
            i;

        for(i=0; i<sections; i++){
            create('path', {
                fill: color,
                'fill-opacity': opacity*i/sections,
                d: annularSector(100, 100, section*i, section*(i+1), innerRadius, outerRadius)
            }, cw);
            create('path', {
                fill: color,
                'fill-opacity': opacity*i/sections,
                d: annularSector(100, 100, -section*i, -section*(i+1), innerRadius, outerRadius)
            }, ccw);
        }
        create('animateTransform', {
            attributeType: 'xml',
            attributeName: 'transform',
            type: 'rotate',
            from: '0 100 100',
            to: '360 100 100',
            dur: cwTime,
            repeatCount: 'indefinite'
        }, cw);
        create('animateTransform', {
            attributeType: 'xml',
            attributeName: 'transform',
            type: 'rotate',
            to: '0 100 100',
            from: '360 100 100',
            dur: ccwTime,
            repeatCount: 'indefinite'
        }, ccw);
    };
    window.svgLoader = svgLoader;
    if ( typeof define === "function" ) {
        define( "svgLoader", [], function () { return svgLoader; } );
    }

}(window);
