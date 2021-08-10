(this["webpackJsonpsysex-t9"]=this["webpackJsonpsysex-t9"]||[]).push([[0],{13:function(e,t){},25:function(e,t){},26:function(e,t){},27:function(e,t,s){},28:function(e,t,s){},29:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),a=s(14),r=s.n(a),o=s(4),i=s(2),l=s(3),d=s.n(l),j=(s(7),s(0)),u=function(e){return d.a.enable((function(t){t&&alert("WebMidi could not be enabled.",t);var s=d.a.inputs[0],n=d.a.outputs[0];e.setAll([Object(o.a)(d.a.inputs),Object(o.a)(d.a.outputs)]),e.setInput(s),e.setOutput(n)}),!0),Object(j.jsxs)("div",{className:"midi-ports",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{className:"port-label",children:"Input Port: "}),Object(j.jsx)("select",{className:"ports input-ports",onChange:function(t){e.setInput(d.a.getInputByName(t.target.value))},children:d.a.inputs.map((function(e){return Object(j.jsx)("option",{id:e.id,children:e.name},e.id)}))})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{className:"port-label",children:"Output Port: "}),Object(j.jsx)("select",{className:"ports output-ports",onChange:function(t){e.setOutput(d.a.getOutputByName(t.target.value))},children:d.a.outputs.map((function(e){return Object(j.jsx)("option",{children:e.name},e.id)}))})]})]})},b=s(5);var h=function(e){var t=Object(n.useState)(!1),s=Object(i.a)(t,2),c=s[0],a=(s[1],Object(n.useState)([])),r=Object(i.a)(a,2),o=r[0],l=r[1];return Object(j.jsxs)(j.Fragment,{children:[c?o.map((function(e){return Object(j.jsx)("div",{children:Object(j.jsx)("div",{children:e})})})):"",Object(j.jsxs)("label",{className:"button",children:["Import Sheet",Object(j.jsx)("input",{type:"file",className:"file",onChange:function(t){!function(t){var s=new FileReader;s.readAsArrayBuffer(t);var n=/xlsx$/;s.onload=function(s){if(!1!==n.test(t.name)){var c=s.target.result,a=b.read(c,{type:"buffer"});l(a.SheetNames);for(var r=prompt("Please enter the name of the sheet"),o=a.Sheets[r],i=b.utils.sheet_to_json(o,{header:1}),d=[],j=i.length,u=3;u<j;u++)d.push({index:u-3,name:i[u][0],port:i[u][1],test:i[u][2],behavior:i[u][3],sysex:i[u][4],expected:i[u][5],expectedLength:null,response:"",responseLength:null,passFail:null});e.setItems(d),console.log("Worksheet load successful"),console.table(d),e.setHelp(!e.help)}else alert("ERROR: Incompatible file type.  Please upload a file with an extension of .xlsx")},s.onerror=function(e){alert("unknown error. please retry"),s.abort()}}(t.target.files[0])}})]})]})};var p=function(e){var t=b.utils.book_new(),s=b.utils.json_to_sheet(e.data);return b.utils.book_append_sheet(t,s,"Sysex Results"),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"button",onClick:function(){return b.writeFile(t,"sysex-results.xlsx")},children:"Export to New Sheet"})})};var x=function(){return Object(j.jsxs)("div",{className:"window",children:[Object(j.jsxs)("section",{className:"window__header",children:[Object(j.jsx)("h4",{children:"Welcome to Sysex Tester 9"}),Object(j.jsx)("p",{children:"Sysex T9 will import your excel sheets and parse the cells for sysex data, where you will be able to send the messages to your MIDI device while monitoring the response."}),"________________"]}),Object(j.jsxs)("section",{className:"window__content",children:[Object(j.jsx)("p",{children:" To use Sysex T9: "}),Object(j.jsxs)("p",{children:[" ","1. Create an excel sheet based on"," ",Object(j.jsx)("a",{href:".",target:"_blank",children:"this template"})]}),Object(j.jsxs)("p",{children:["2. Click the Import Sheet button. NOTE: This menu will disappear once a sheet is imported. Access this window again by clicking [help]"," "]}),Object(j.jsx)("p",{children:"3. Make sure your Input and Output Ports are set to the proper MIDI Device "}),Object(j.jsx)("p",{children:" 4. Click Send to send each Sysex message. If the message is successful, the response will be written to the Response cell. "}),Object(j.jsxs)("p",{children:["5. Along with the Sysex response message, the amount of bytes sent and received will be written and compared. ",Object(j.jsx)("br",{}),"If the number of bytes of the response matches the expected number of bytes, the message will be colored green. If the incorrect amount of bytes are received, the message will be colored red."]}),Object(j.jsx)("p",{children:"6. Once finished, [Export to New Sheet] and save the results to your system"}),"________________"]}),Object(j.jsxs)("section",{className:"window__footer",children:[Object(j.jsx)("p",{}),"If you want to see more data while operating Sysex T9:",Object(j.jsx)("p",{}),"1. Open up the console on your browser by right clicking anywhere and clicking [Inspect].",Object(j.jsx)("p",{}),"2. Click on the [Console] tab to get readouts of the data being sent and received.",Object(j.jsx)("p",{}),"If you want to access this menu again, press the [help] button at any time.",Object(j.jsx)("p",{})]})]})};var O=function(e){var t=e.help,s=e.setHelp;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("button",{className:"button help-button",onClick:function(){return s(!t)},children:"help"})})};var m=function(e){var t=e.data,s=e.dataLength,c=Object(n.useState)("copy"),a=Object(i.a)(c,2),r=a[0],o=a[1];return Object(j.jsx)("div",{className:"copy__container",children:Object(j.jsx)("button",{className:"copy"===r?"copy button":"copy button button__active",onClick:function(e){var n="".concat(t.join(""),"  ").concat(s," bytes");navigator.clipboard,navigator.clipboard&&(navigator.clipboard.writeText(n),o("copied"))},children:r})})};var f=function(e){var t=Object(n.useState)(!1),s=Object(i.a)(t,2),c=s[0],a=s[1];return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("button",{className:c?"button send-button sent":"button send-button",id:e.id,onClick:function(t){e.onClick(t),a(!0)},children:Object(j.jsx)("span",{className:"send-text",children:c?"sent":"send"})})})},g=[["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],["C","C#","D","D#","E","F","F#","G"]];var v=function(e){e=parseInt(Number("0x"+e,10));for(var t=0,s=-1,n=0;n<g.length;n++){for(var c=0;c<g[n].length;c++){if(e===t)return g[n][c]+s;t++}s++}};var y=function(e){var t=e.input,s=(e.output,e.hex),c=e.allPorts,a=Object(n.useState)([]),r=Object(i.a)(a,2),l=r[0],d=r[1],u=Object(n.useState)(c[0]),b=Object(i.a)(u,2),h=b[0],p=(b[1],Object(n.useState)(c[0])),x=Object(i.a)(p,2),O=(x[0],x[1],[]),m=c[0];function f(){m.forEach((function(e,t){e.addListener("midimessage","all",(function(e){var t=s(Object(o.a)(e.data)),n=parseInt(e.timestamp);O.push({port:e.target.name,time:n,message:t}),d([].concat(O)),document.querySelectorAll(".monitor-column").forEach((function(e){return e.scrollTop=e.scrollHeight}))}))}))}c[1],Object(n.useEffect)((function(){return console.log("render"),f(),function(){t.removeListener("midimessage","all"),console.log("unmount")}}),[t]);var g=["cyan","violet","magenta","orange"];return Object(j.jsxs)("div",{className:"monitor-container",children:[Object(j.jsx)("div",{className:"monitor-title",children:"MIDI MONITOR"}),Object(j.jsx)("div",{className:"monitor-content",children:h.map((function(e,t){return Object(j.jsxs)("div",{className:"columns-container",children:[Object(j.jsx)("div",{id:e.name,className:"midi-port ".concat(g[t]),children:e.name}),Object(j.jsx)("div",{className:"monitor-column",children:l.map((function(t){return t.port===e.name?Object(j.jsxs)("div",{className:"midi-message",children:[Object(j.jsx)("div",{children:t.message}),Object(j.jsx)("div",{children:"(".concat(v(t.message[1]),")")}),Object(j.jsx)("div",{children:t.time})]},t.time):""}))},e.id)]},e.id)}))})]})};s(27),s(28);var N=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),s=t[0],c=t[1],a=Object(n.useState)(),r=Object(i.a)(a,2),l=r[0],d=r[1],b=Object(n.useState)(),g=Object(i.a)(b,2),v=g[0],N=g[1],_=Object(n.useState)([]),C=Object(i.a)(_,2),w=C[0],I=C[1],S=Object(n.useState)(!0),F=Object(i.a)(S,2),D=F[0],E=F[1],A=Object(n.useState)(!0),G=Object(i.a)(A,2),L=G[0],k=G[1];function T(e){console.log("test",e);var t=parseInt(e.target.id),n=s[t].sysex.split(" ").map((function(e){return e="0x"+e,parseInt(Number(e,10))})),a=n.splice(0,1),r="".concat(a,",").concat(n);v?(v.send(a,n),function(e){console.groupEnd("LOG"),l.removeListener("sysex","all"),l.addListener("sysex","all",(function(t){console.log("TARGET",e);var s=Object(o.a)(t.data);s||alert("No SysEx received. Check MIDI Port"),console.log("RECEIVED ".concat(s," (").concat(s.length," bytes) at ").concat(l.name," port")),console.groupEnd("LOG"),s&&function(e,t){c((function(s){var n=s.map((function(s){return s.index===e&&(s.response=t,s.expectedLength=s.expected.split(" ").length,s.responseLength=function(e){return e.length}(t)),s.responseLength===s.expectedLength&&(s.passFail="pass"),s.responseLength!==s.expectedLength&&(s.passFail="fail"),s}));return e=null,n}))}(e,B(s))}))}(t),console.group("LOG"),console.log("SENT ".concat(r," (").concat(r.length," bytes) to ").concat(v.name," port"))):alert("No MIDI output port selected")}function B(e){return e.map((function(e){return 2===(e=e.toString(16)+" ").length&&(e="0"+e),e.toUpperCase()}))}return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("p",{className:"title",children:"Sysex Tester v0.2.1"}),Object(j.jsxs)("div",{className:"utilities",children:[Object(j.jsx)(h,{setItems:c,setHelp:E,help:D}),Object(j.jsx)(p,{data:s}),Object(j.jsx)(u,{setInput:d,setOutput:N,input:l,output:v,setAll:I}),Object(j.jsx)("button",{className:"button",onClick:function(){return k(!L)},children:"MIDI MONITOR"}),Object(j.jsx)(O,{help:D,setHelp:E})]}),D?Object(j.jsx)(x,{}):"",Object(j.jsxs)("div",{className:"main-container",children:[Object(j.jsxs)("table",{className:"table-container",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{className:s.length>2?"table-header":"invisible",children:[Object(j.jsx)("th",{className:"header__item",children:"Message Type"}),Object(j.jsx)("th",{children:"Port"}),Object(j.jsx)("th",{children:"Test"}),Object(j.jsx)("th",{children:"Expected Behavior"}),Object(j.jsx)("th",{children:"SysEx to Send"}),Object(j.jsx)("th",{children:"Expected Response"}),Object(j.jsx)("th",{children:"Response"})]})}),Object(j.jsx)("tbody",{children:s.map((function(e,t){return Object(j.jsxs)("tr",{className:void 0===e.port?"table_section":"table_row",children:[Object(j.jsx)("td",{className:"msg_name",children:e.name}),Object(j.jsx)("td",{className:"port",children:e.port}),Object(j.jsx)("td",{className:"description",children:e.test}),Object(j.jsx)("td",{className:"behavior",children:e.behavior}),Object(j.jsx)("td",{className:"sysex-container",children:Object(j.jsxs)("div",{className:e.sysex?"sysex-cell":"invisible",children:[e.sysex,Object(j.jsx)(f,{id:t,onClick:T})]})}),Object(j.jsx)("td",{className:"long expected",children:Object(j.jsxs)("div",{className:"overflow",children:[e.expected,Object(j.jsx)("div",{className:"pass"===e.passFail?"pass":"fail",children:e.expectedLength?"Expected: ".concat(e.expectedLength," bytes"):""})]})}),Object(j.jsxs)("td",{className:"long response",children:[Object(j.jsxs)("div",{className:"overflow",children:[e.response,Object(j.jsx)("div",{className:"pass"===e.passFail?"pass":"fail",children:e.responseLength?"Response: ".concat(e.responseLength," bytes"):""})]}),e.responseLength>1?Object(j.jsx)(m,{data:e.response,dataLength:e.responseLength}):void 0]})]},t)}))})]}),l&&L?Object(j.jsx)(y,{input:l,output:v,hex:B,allPorts:w}):""]}),Object(j.jsx)("footer",{children:"\xa9 Copyright 2021 John DeTora. All rights reserved."})]})};r.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(N,{})}),document.getElementById("root"))},7:function(e,t,s){}},[[29,1,2]]]);
//# sourceMappingURL=main.31f87523.chunk.js.map