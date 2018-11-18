webpackJsonp([1],{"707r":function(e,t,s){var r={"./icon-islands.svg":"VI6K","./icon-leader.svg":"zOpd","./icon-naval.svg":"oS/3","./icon-treasury.svg":"XA/F","./icon-wonder.svg":"pyiD"};function a(e){return s(n(e))}function n(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}a.keys=function(){return Object.keys(r)},a.resolve=n,e.exports=a,a.id="707r"},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var n=s("VU/8")({name:"App"},a,!1,function(e){s("s347")},null,null).exports,o=s("/ocq"),c=s("fZjL"),i=s.n(c),l=s("woOf"),d=s.n(l),u=s("DtRx"),p=s.n(u),m=s("+Uzz"),h={name:"Animated-Num",props:{value:{type:Number,required:!0}},data:function(){return{tweenTime:.5,tweenedNumber:0}},computed:{animatedValue:function(){return this.tweenedNumber.toFixed(0)}},watch:{value:function(e,t){m.a.to(this.$data,this.tweenTime,{tweenedNumber:e})}}},f={render:function(){var e=this.$createElement;return(this._self._c||e)("span",[this._v(this._s(this.animatedValue))])},staticRenderFns:[]},v={name:"Main",components:{AnimatedNum:s("VU/8")(h,f,!1,null,null,null).exports},data:function(){return{games:[],players:[{name:"Mew",id:p()()},{name:"Woof",id:p()()}],defaultScore:{military:0,treasury:0,wonder:0,civilian:0,commercial:0,guilds:0,science:0,leader:0,city:0,armada:0},scoreBoard:[],hasIconHeader:["treasury","wonder","leader","armada"]}},methods:{generateScoreBoard:function(){var e=this;this.scoreBoard={},this.players.forEach(function(t){e.scoreBoard[t.id]={name:t.name,total:0},e.scoreBoard[t.id].score=d()({},e.defaultScore)})},updateScore:function(e){var t=e.target.getAttribute("player"),s=e.target.getAttribute("score-type");this.scoreBoard[t].score[s]=e.target.value,this.scoreBoard[t].total=this.getPlayerSumScore(t),this.$forceUpdate()},getPlayerSumScore:function(e){var t=this.scoreBoard[e].score,s=0;return i()(this.defaultScore).forEach(function(e){s+=parseInt(t[e])}),s},addPlayer:function(){var e=p()(),t="Player "+(this.players.length+1);this.players.push({id:e,name:t}),this.scoreBoard[e]={name:t,total:0,score:d()({},this.defaultScore)},this.$forceUpdate()},selectAllText:function(e){e.target.setSelectionRange(0,e.target.value.length)},getImgSrc:function(e){return s("707r")("./icon-"+e+".svg")}},created:function(){this.generateScoreBoard()}},_={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"scoreboard-wrapper"},[s("table",{staticClass:"scoresheet"},[s("thead",{staticClass:"header"},[s("tr",{staticClass:"scoresheet__row"},[s("th",{staticClass:"scoresheet__cell scoresheet__cell--player-name"}),e._v(" "),e._l(e.players,function(t){return s("th",{key:t.id,staticClass:"scoresheet__cell scoresheet__cell--player-name"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"player.name"}],staticClass:"header__namebox",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||e.$set(t,"name",s.target.value)}}})])}),e._v(" "),e.players.length<8?s("th",[s("a",{staticClass:"button--add-player",on:{click:e.addPlayer}},[e._v("+ Add player")])]):e._e()],2)]),e._v(" "),s("tbody",{staticClass:"scoresheet"},[e._l(Object.keys(e.defaultScore),function(t){return s("tr",{key:t,class:"scoresheet__row scoresheet__row--"+t},[s("td",{staticClass:"scoresheet__cell scoresheet__cell--first"},["armada"===t?s("span",[s("img",{staticClass:"icon--score-type",attrs:{src:e.getImgSrc("naval")}}),e._v(" "),s("img",{staticClass:"icon--score-type",attrs:{src:e.getImgSrc("islands")}})]):e.hasIconHeader.indexOf(t)>-1?s("span",[s("img",{staticClass:"icon--score-type",attrs:{src:e.getImgSrc(t)}})]):s("span",[s("div",{staticClass:"icon--score-type icon--card"})])]),e._v(" "),e._l(e.players,function(r,a){return s("td",{key:r.id,staticClass:"scoresheet__cell",class:{"scoresheet__cell--even":(a+1)%2==0}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.scoreBoard[r.id].score[t],expression:"scoreBoard[player.id].score[scoreType]"}],staticClass:"scoresheet__scorebox",attrs:{type:"text",player:r.id,"score-type":t},domProps:{value:e.scoreBoard[r.id].score[t]},on:{focus:e.selectAllText,input:[function(s){s.target.composing||e.$set(e.scoreBoard[r.id].score,t,s.target.value)},e.updateScore]}})])})],2)}),e._v(" "),s("tr",{staticClass:"scoresheet__row scoresheet__row--total"},[s("td",{staticClass:"scoresheet__cell scoresheet__cell--first"},[e._v("Σ")]),e._v(" "),e._l(e.players,function(t,r){return s("td",{key:t.id,staticClass:"scoresheet__cell",class:{"scoresheet__cell--even":(r+1)%2==0}},[s("animated-num",{attrs:{value:e.scoreBoard[t.id].total||0}})],1)})],2)],2)])])},staticRenderFns:[]};var g=s("VU/8")(v,_,!1,function(e){s("Z4sO")},"data-v-12a03a6d",null).exports;r.a.use(o.a);var y=new o.a({routes:[{path:"/",name:"Main",component:g}]});r.a.config.productionTip=!1,new r.a({el:"#app",router:y,components:{App:n},template:"<App/>"})},VI6K:function(e,t,s){e.exports=s.p+"static/img/icon-islands.603a79e.svg"},"XA/F":function(e,t,s){e.exports=s.p+"static/img/icon-treasury.7098964.svg"},Z4sO:function(e,t){},"oS/3":function(e,t,s){e.exports=s.p+"static/img/icon-naval.93777ff.svg"},pyiD:function(e,t,s){e.exports=s.p+"static/img/icon-wonder.89b73c3.svg"},s347:function(e,t){},zOpd:function(e,t,s){e.exports=s.p+"static/img/icon-leader.1e8fea1.svg"}},["NHnr"]);
//# sourceMappingURL=app.ad09c65482b4045dc162.js.map