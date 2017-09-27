'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */


define([], function(){

    var methods = {};

    //User Plain Text
    methods.userplaintext = (data) => {
    
        let html = `<li class="list-group-item chat-user-dialog">
            <div class="media-left pull-right">
                <a href="javascript:void(0);" class="avatar-list-img">
                <img class="img-responsive" src="${data.senderAvatar}">
                </a>
            </div>
            <div class="media-body">
                <h3 class="list-group-item-heading">${data.senderName}</h3>
                <span class="list-group-item-text">${data.payload}</span>	
                <p class="mute"><small>sent at ${data.time}</small></p>
            </div>
        </li>`;
    
        return html;
    }
    
    //Plain Text Template
    methods.plaintext = (data) => {
        let html = `<li class="list-group-item">
            <div class="media-left">
                <a href="javascript:void(0);" class="avatar-list-img">
                <img class="img-responsive" src="${data.senderAvatar}">
                </a>
            </div>
            <div class="media-body">
                <h3 class="list-group-item-heading">${data.senderName}</h3>
                <span class="list-group-item-text">${data.payload}</span>	
                <p class="mute"><small>sent at ${data.time}</small></p>
            </div>
        </li>`;
    
        return html;
    }
    //Card Template
    methods.card = (data) => {
        let html;
        let cardButtons= "";
        let cardBody;
        for(let i in data.payload){
         cardBody = `<li class="list-group-item">
            <div class="pmd-card pmd-card-default pmd-z-depth">
                <!-- Card header -->
                <div class="pmd-card-title">
                    <div class="media-left">
                        <a class="avatar-list-img" href="javascript:void(0);">
                            <img src="${data.senderAvatar}" class="img-responsive">
                        </a>
                    </div>
                    <div class="media-body media-middle">
                        <h3 class="pmd-card-title-text">${data.senderName}</h3>
                    </div>
                </div>`
                
                if(data.payload[i].imageUrl != "" && data.payload[i].imageUrl != undefined){ 
                    cardBody +=` <div class="pmd-card-media">
                    <img src="${data.payload[i].imageUrl}" width="1184" height="666" class="img-responsive">
                    </div>`
                }
                
                cardBody += `<div class="pmd-card-title">
                    <h2 class="pmd-card-title-text">${data.payload[i].title}</h2>
                    <span class="pmd-card-subtitle-text">${data.payload[i].subtitle}</span>	
                </div>`
                if(data.buttons && data.payload[i].type == 1){
                    console.log("Buttons"+data);
                    cardButtons=`<div class="pmd-card-actions">`
                    for(var j=0 ; j < data.payload[i].buttons.length; j++ ){
                        cardButtons +=` <button type="button" class="btn btn-primary cardresponsepayload" data-cardpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                    }
                    cardButtons+=`</div>`
                }
             html=cardBody+cardButtons+`</div></li>`;
        }
        return html;
    }
    
    //Quick Replies Template
    methods.quickreplies =(data)=>{
        var quickRepliesHtml =`<li class="list-group-item">
        <div class="media-left">
            <a href="javascript:void(0);" class="avatar-list-img">
            <img class="img-responsive" src="${data.senderAvatar}">
            </a>
        </div>
        <div class="media-body">
        <h3 class="list-group-item-heading">${data.senderName}</h3>`;
        
        for(let i in data.payload){
            if(data.payload[i].platform =="facebook"){
            quickRepliesHtml +=`<p>${data.payload[i].payload.facebook.text}</p>`
            for (var j = 0; j < data.payload[i].payload.facebook.quick_replies.length; j++){
                quickRepliesHtml +=`<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info QuickreplybtnPayload" data-quickRepliesPayload="${data.payload[i].payload.facebook.quick_replies[j].payload
                }">${data.payload[i].payload.facebook.quick_replies[j].title}</button>`
             }
            }
            }
        quickRepliesHtml +=`<p class="mute"><small>sent at ${data.time}</small></p></div></li>`
        return quickRepliesHtml;
    }
    
    methods.carousel =(data, uniqueId)=>{
        var carousel =`<li class="list-group-item">
        <div id="${uniqueId}" class="carousel slide pmd-card pmd-card-default pmd-z-depth" data-ride="false">
        <!-- Carousel items -->
            <div class="carousel-inner">`;
            var index = 0;
            for(let i in data.payload){
               
                if(data.payload[i].type==1){
                carousel +=`<div class="item ${(index == 0) ? 'active': '' }">    
                    <div class="row">
                        <div class="col-md-3">
                            <a href="#" class="thumbnail">
                                <img src="${data.payload[i].imageUrl}" alt="Image" style="max-width:100%;">
                            </a>
                            <h3>${data.payload[i].title}<p>
                            <p>${data.payload[i].subtitle}</p>`
                              if(data.buttons && data.payload[i].type == 1){
                               for (var j = 0; j < data.payload[i].buttons.length; j++){
                                carousel +=`<button type="button" class="btn btn-primary btn pmd-btn-outline caroselresponsepayload" data-carouselpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                              }
                            }
                            carousel += `</div>
                    </div><!--.row-->
                </div> <!--.item-->`;
                index = 1;
            }
        }

		carousel +=` </div><!--.carousel-inner-->
		<a data-slide="prev" href="#${uniqueId}" class="left carousel-control">‹</a>
		<a data-slide="next" href="#${uniqueId}" class="right carousel-control">›</a>
	  </div><!--.Carousel--></li>`;

        return carousel;
    }

// airline Boarding pass
        methods.airline_boardingpass =(data, uniqueId)=>{
            console.log(JSON.stringify(data));
        let airlineBoardingPassTemplate =`<li class="list-group-item">
        <div id="${uniqueId}" class="carousel slide pmd-card pmd-card-default pmd-z-depth" data-ride="false">
        <!-- Carousel items -->
            <div class="carousel-inner">`;
            var index = 0;
            for(let i in data.payload){
               
                if(data.payload[i].type==4){
                carousel +=`<div class="item ${(index == 0) ? 'active': '' }">    
                    <div class="row">
                        <div class="col-md-3">
                            <a href="#" class="thumbnail">
                                <img src="${data.payload[i].imageUrl}" alt="Image" style="max-width:100%;">
                            </a>
                            <h3>${data.payload[i].title}<p>
                            <p>${data.payload[i].subtitle}</p>`
                              if(data.buttons && data.payload[i].type == 4){
                               for (var j = 0; j < data.payload[i].buttons.length; j++){
                                carousel +=`<button type="button" class="btn btn-primary btn pmd-btn-outline caroselresponsepayload" data-carouselpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                              }
                            }
                            carousel += `</div>
                    </div><!--.row-->
                </div> <!--.item-->`;
                index = 1;
            }
        }

		carousel +=` </div><!--.carousel-inner-->
		<a data-slide="prev" href="#${uniqueId}" class="left carousel-control">‹</a>
		<a data-slide="next" href="#${uniqueId}" class="right carousel-control">›</a>
	  </div><!--.Carousel--></li>`;

        return airline_boardingpass;
    }



    return methods;
});