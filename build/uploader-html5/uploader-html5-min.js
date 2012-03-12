YUI.add("uploader-html5",function(d){var a=d.substitute,c=d.Uploader.Queue;function b(e){b.superclass.constructor.apply(this,arguments);}d.UploaderHTML5=d.extend(b,d.Widget,{_fileInputField:null,_uploaderQueue:null,initializer:function(){this.publish("fileselect");this.publish("uploadstart");this.publish("fileuploadstart");this.publish("uploadprogress");this.publish("totaluploadprogress");this.publish("uploadcomplete");this.publish("alluploadscomplete");this.publish("uploaderror");},_ddEventHandler:function(g){g.stopPropagation();g.preventDefault();switch(g.type){case"dragenter":this.fire("dragenter");break;case"dragover":this.fire("dragover");break;case"drop":var f=g._event.dataTransfer.files,e=[];d.each(f,function(i){e.push(new d.FileHTML5(i));});this.fire("fileselect",{fileList:e});var h=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?h.concat(e):e);break;}},_uploadEventHandler:function(e){switch(e.type){case"file:uploadstart":this.fire("fileuploadstart",e);break;case"file:uploadprogress":this.fire("uploadprogress",e);break;case"uploaderqueue:totaluploadprogress":this.fire("totaluploadprogress",e);break;case"file:uploadcomplete":this.fire("uploadcomplete",e);break;case"uploaderqueue:alluploadscomplete":this.fire("alluploadscomplete",e);break;case"uploaderqueue:uploaderror":this.fire("uploaderror",e);break;}},_setMultipleFiles:function(){if(this.get("multipleFiles")===true){this._fileInputField.set("multiple","multiple");}else{this._fileInputField.set("multiple","");}},_bindDropArea:function(f){var e=f||{prevVal:null};if(e.prevVal!==null){e.prevVal.detach("drop",this._ddEventHandler);e.prevVal.detach("dragenter",this._ddEventHandler);e.prevVal.detach("dragover",this._ddEventHandler);}var g=this.get("dragAndDropArea");if(g!==null){g.on("drop",this._ddEventHandler,this);g.on("dragenter",this._ddEventHandler,this);g.on("dragover",this._ddEventHandler,this);}},_bindSelectButton:function(){this.get("selectFilesButton").on("click",this.openFileSelectDialog,this);},_updateFileList:function(g){var f=g.target.getDOMNode().files,e=[];d.each(f,function(i){e.push(new d.FileHTML5(i));});this.fire("fileselect",{fileList:e});var h=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?h.concat(e):e);},openFileSelectDialog:function(){var e=this._fileInputField.getDOMNode();if(e.click){e.click();}},renderUI:function(){var e=this.get("contentBox");var f=this.get("selectFilesButton");f.setStyles({width:"100%",height:"100%"});e.append(this.get("selectFilesButton"));this._fileInputField=d.Node.create(b.HTML5FILE_FIELD);e.append(this._fileInputField);},bindUI:function(){this._bindSelectButton();this._setMultipleFiles();this._bindDropArea();this.after("multipleFilesChange",this._setMultipleFiles,this);this.after("selectFilesButtonChange",this._bindSelectButton,this);this.after("dragAndDropAreaChange",this._bindDropArea,this);this.after("tabIndexChange",function(e){this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"));},this);this._fileInputField.on("change",this._updateFileList,this);this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"));},upload:function(i,g,j){var h=g||this.get("uploadURL"),f=j||this.get("postVarsPerFile"),e=i.get("id");f=f.hasOwnProperty(e)?f[e]:f;if(i instanceof d.FileHTML5){i.on("uploadstart",this._uploadStartHandler,this);i.on("uploadprogress",this._uploadProgressHandler,this);i.on("uploadcomplete",this._uploadCompleteHandler,this);i.on("uploaderror",this._uploadErrorHandler,this);i.startUpload(h,f,this.get("fileFieldName"));}},uploadAll:function(e,f){this.uploadThese(this.get("fileList"),e,f);},uploadThese:function(i,f,h){var g=f||this.get("uploadURL"),e=h||this.get("postVarsPerFile");this._uploaderQueue=new c({simUploads:this.get("simLimit"),errorAction:this.get("errorAction"),fileList:i,uploadURL:g,perFileParameters:e});this._uploaderQueue.on("uploadstart",this._uploadEventHandler,this);this._uploaderQueue.on("uploadprogress",this._uploadEventHandler,this);this._uploaderQueue.on("totaluploadprogress",this._uploadEventHandler,this);this._uploaderQueue.on("uploadcomplete",this._uploadEventHandler,this);this._uploaderQueue.on("alluploadscomplete",this._uploadEventHandler,this);this._uploaderQueue.on("uploaderror",this._uploadEventHandler,this);this._uploaderQueue.startUpload();this.fire("uploadstart");}},{HTML5FILE_FIELD:"<input type='file' style='visibility:hidden; width:0px; height: 0px;'>",SELECT_FILES_BUTTON:"<button type='button' class='yui3-button' role='button' aria-label='{selectButtonLabel}' tabindex='{tabIndex}'>{selectButtonLabel}</button>",TYPE:"html5",NAME:"uploader",ATTRS:{errorAction:{value:"continue",validator:function(f,e){return(f===c.CONTINUE||f===c.STOP||f===c.RESTART_ASAP||f===c.RESTART_AFTER);}},selectButtonLabel:{value:"Select Files"},selectFilesButton:{valueFn:function(){return d.Node.create(a(d.UploaderHTML5.SELECT_FILES_BUTTON,{selectButtonLabel:this.get("selectButtonLabel"),tabIndex:this.get("tabIndex")}));}},dragAndDropArea:{value:null,setter:function(e){return d.one(e);}},multipleFiles:{value:false},appendNewFiles:{value:true},simLimit:{value:2,validator:function(f,e){return(f>=1&&f<=5);}},fileFieldName:{value:"Filedata"},fileList:{value:[]},postVarsPerFile:{value:{}},uploadURL:{value:""}}});d.UploaderHTML5.UploaderQueue=c;},"@VERSION@",{requires:["widget","substitute","node-event-simulate","file-html5","uploader-queue"]});