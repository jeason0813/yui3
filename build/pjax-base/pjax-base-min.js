YUI.add("pjax-base",function(g){var e=g.config.win,a=c(),f=g.ClassNameManager.getClassName("pjax"),b="navigate";function c(){var h=(e&&e.location.pathname.split("/"))||[];h.pop();return h.join("/");}function d(){}d.prototype={_regexUrl:/^((?:https?:\/\/|\/\/)[^\/]+)?([^?#]*)(.*)$/i,initializer:function(){this._pjaxRoot=a;this.publish(b,{defaultFn:this._defNavigateFn});this._pjaxBindUI();},destructor:function(){this._pjaxEvents&&this._pjaxEvents.detach();},getContent:function(k){var j={},h=this.get("contentSelector"),m=g.Node.create(k||""),i=this.get("titleSelector"),l;if(h){j.node=g.one(m.all(h).toFrag());}else{j.node=m;}if(i){l=m.one(i);if(l){j.title=l.get("text");}}return j;},load:function(h){this.save(this._resolveUrl(h));if(this.get("scrollToTop")&&g.config.win){setTimeout(function(){g.config.win.scroll(0,0);},1);}},_getRoot:c,_normalizePath:function(q){var n="..",k="/",l,m,p,j,h,o;if(!q){return q;}j=q.split(k);o=[];for(l=0,m=j.length;l<m;++l){h=j[l];if(h===n){o.pop();}else{if(h){o.push(h);}}}p=o.join(k);if(q.charAt(q.length-1)===k){p+=k;}return p;},_pjaxBindUI:function(){if(this.html5){this._pjaxEvents=g.one("body").delegate("click",this._onLinkClick,this.get("linkSelector"),this);}},_resolvePath:function(i){var h=this._pjaxRoot;if(!i){return h;}return this._normalizePath(h+"/"+i);},_resolveUrl:function(i){var h=this;return i.replace(this._regexUrl,function(j,k,m,l){return(k||"")+h._resolvePath(m)+(l||"");});},_defNavigateFn:function(h){this.load(h.url);},_onLinkClick:function(i){var h=i.currentTarget.get("href");if(i.button!==1||i.ctrlKey||i.metaKey){return;}if(!this.hasRoute(this.removeRoot(h))){return;}i.preventDefault();this.fire(b,{originEvent:i,url:h});}};d.ATTRS={contentSelector:{value:null},linkSelector:{value:"a."+f,writeOnce:"initOnly"},scrollToTop:{value:true},titleSelector:{value:"title"}};g.PjaxBase=d;},"@VERSION@",{requires:["classnamemanager","controller","node-event-delegate"]});