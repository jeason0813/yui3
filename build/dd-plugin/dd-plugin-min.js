YUI.add("dd-plugin",function(d){var b=function(f){if(d.Widget&&f.host instanceof d.Widget){f.node=f.host.get("boundingBox");f.widget=f.host;}else{f.node=f.host;f.widget=false;}b.superclass.constructor.call(this,f);},a="drag:start",c="drag:drag",e="drag:end";b.NAME="dd-plugin";b.NS="dd";d.extend(b,d.DD.Drag,{_widgetHandles:null,_widget:undefined,_stoppedPosition:undefined,_usesWidgetPosition:function(g){var f=false;if(g){f=(g.hasImpl&&g.hasImpl(d.WidgetPosition))?true:false;}return f;},_checkEvents:function(){if(this._widget){if(this.proxy){if(this._widgetHandles.length>0){this._removeWidgetListeners();}}else{if(this._widgetHandles.length===0){this._attachWidgetListeners();}}}},_removeWidgetListeners:function(){d.Array.each(this._widgetHandles,function(f){f.detach();});this._widgetHandles=[];},_attachWidgetListeners:function(){if(this._usesWidgetPosition(this._widget)){this._widgetHandles.push(this.on(c,this._setWidgetCoords));this._widgetHandles.push(this.on(e,this._updateStopPosition));}},initializer:function(f){this._widgetHandles=[];this._widget=f.widget;this.on(a,this._checkEvents);this._attachWidgetListeners();},_setWidgetCoords:function(i){var h=this._stoppedPosition||i.target.nodeXY,f=i.target.realXY,g=[f[0]-h[0],f[1]-h[1]];if(g[0]!==0&&g[1]!==0){this._widget.set("xy",f);}else{if(g[0]===0){this._widget.set("y",f[1]);}else{if(g[1]===0){this._widget.set("x",f[0]);}}}},_updateStopPosition:function(f){this._stoppedPosition=f.target.realXY;}});d.namespace("Plugin");d.Plugin.Drag=b;},"@VERSION@",{optional:["dd-constrain","dd-proxy"],skinnable:false,requires:["dd-drag"]});