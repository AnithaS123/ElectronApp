'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */


define([], function () {

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
        let cardButtons = "";
        let cardBody;
        for (let i in data.payload) {
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

            if (data.payload[i].imageUrl != "" && data.payload[i].imageUrl != undefined) {
                cardBody += ` <div class="pmd-card-media">
                    <img src="${data.payload[i].imageUrl}" width="1184" height="666" class="img-responsive">
                    </div>`
            }

            cardBody += `<div class="pmd-card-title">
                    <h2 class="pmd-card-title-text">${data.payload[i].title}</h2>
                    <span class="pmd-card-subtitle-text">${data.payload[i].subtitle}</span>	
                </div>`
            if (data.buttons && data.payload[i].type == 1) {
                console.log("Buttons" + data);
                cardButtons = `<div class="pmd-card-actions">`
                for (var j = 0; j < data.payload[i].buttons.length; j++) {
                    cardButtons += ` <button type="button" class="btn btn-primary cardresponsepayload" data-cardpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                }
                cardButtons += `</div>`
            }
            html = cardBody + cardButtons + `</div></li>`;
        }
        return html;
    }

    //Quick Replies Template
    methods.quickreplies = (data) => {
        var quickRepliesHtml = `<li class="list-group-item">
        <div class="media-left">
            <a href="javascript:void(0);" class="avatar-list-img">
            <img class="img-responsive" src="${data.senderAvatar}">
            </a>
        </div>
        <div class="media-body">
        <h3 class="list-group-item-heading">${data.senderName}</h3>`;

        for (let i in data.payload) {
            if (data.payload[i].platform == "facebook") {
                quickRepliesHtml += `<p>${data.payload[i].payload.facebook.text}</p>`
                for (var j = 0; j < data.payload[i].payload.facebook.quick_replies.length; j++) {
                    quickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info QuickreplybtnPayload" data-quickRepliesPayload="${data.payload[i].payload.facebook.quick_replies[j].payload
                        }">${data.payload[i].payload.facebook.quick_replies[j].title}</button>`
                }
            }
        }
        quickRepliesHtml += `<p class="mute"><small>sent at ${data.time}</small></p></div></li>`
        return quickRepliesHtml;
    }

    methods.carousel = (data, uniqueId) => {
        var carousel = `<li class="list-group-item">
        <div id="${uniqueId}" class="carousel slide pmd-card pmd-card-default pmd-z-depth" data-ride="false">
        <!-- Carousel items -->
            <div class="carousel-inner">`;
        var index = 0;
        for (let i in data.payload) {

            if (data.payload[i].type == 1) {
                carousel += `<div class="item ${(index == 0) ? 'active' : ''}">    
                    <div class="row">
                        <div class="col-md-3">
                            <a href="#" class="thumbnail">
                                <img src="${data.payload[i].imageUrl}" alt="Image" style="max-width:100%;">
                            </a>
                            <h3>${data.payload[i].title}<p>
                            <p>${data.payload[i].subtitle}</p>`
                if (data.buttons && data.payload[i].type == 1) {
                    for (var j = 0; j < data.payload[i].buttons.length; j++) {
                        carousel += `<button type="button" class="btn btn-primary btn pmd-btn-outline caroselresponsepayload" data-carouselpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                    }
                }
                carousel += `</div>
                    </div><!--.row-->
                </div> <!--.item-->`;
                index = 1;
            }
        }

        carousel += ` </div><!--.carousel-inner-->
		<a data-slide="prev" href="#${uniqueId}" class="left carousel-control">‹</a>
		<a data-slide="next" href="#${uniqueId}" class="right carousel-control">›</a>
	  </div><!--.Carousel--></li>`;

        return carousel;
    }

    // airline Boarding pass

    methods.airlineBoarding = (data) => {
        let html;
        let cardButtons = "";
        for (let i in data.payload) {
            if (data.payload[i].hasOwnProperty("platform")) {
                for (let j in data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass) {
                    console.log(data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j]);
                    let termialLabel = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].auxiliary_fields[0].label;
                    let termialValue = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].auxiliary_fields[0].value;
                    let gateLabel = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].secondary_fields[1].label;
                    let gateValue = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].secondary_fields[1].value;
                    let passengersName = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].passenger_name;
                    let passengersSeatLabel = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].secondary_fields[2].label;
                    let passengersSeatValue = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].secondary_fields[2].value;
                    let flightNumber = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.flight_number;
                    let boardingValue = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].secondary_fields[0].value;
                    let departsValue = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.flight_schedule.departure_time;
                    let departCity = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.departure_airport.city;
                    let departCode = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.departure_airport.airport_code;
                    let arrivalCity = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.arrival_airport.city;
                    let arrivalCode = data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.boarding_pass[j].flight_info.arrival_airport.airport_code;

                    let arrName = passengersName.replace('/', ' ');

                    let departTime = departsValue.slice('T');
                    console.log(departTime);

                    html = `<div class="pmd-card pmd-card-inverseblue pmd-z-depth">
    <!-- Card header -->
    <div class="container panel-heading">
        <div class="row airlinePadding">
            <div class="col-xs-6">
                <a href="javascript:void(0);" class="avatar-list-img">
            <img width="40" height="40" src="https://previews.123rf.com/images/sn333g/sn333g1504/sn333g150400033/39063712-Avi-n-icono-de-vuelo-o-avi-n-logo-despegue-vector-s-mbolo-azul-Foto-de-archivo.jpg">
        </a>
            </div>
            <div class="col-xs-3">
                <h3 class="pmd-card-title-text">${termialLabel}</h3>
                <span class="pmd-card-subtitle-text">${termialValue}</span>
            </div>
            <div class="col-xs-3">
                <h3 class="pmd-card-title-text">${gateLabel}</h3>
                <span class="pmd-card-subtitle-text">${gateValue}</span>
            </div>
        </div>
        <hr style="margin:0px">
        <div class="row airlinePadding">
            <div class="col-xs-9">
                <h3 class="pmd-card-title-text">Passenger</h3>
            </div>
            <div class="col-xs-3">
                <h3 class="pmd-card-title-text">${passengersSeatLabel}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-9">
                <span class="pmd-card-subtitle-text">${arrName}</span>
            </div>
            <div class="col-xs-3">
                <span class="pmd-card-subtitle-text">${passengersSeatValue}</span>
            </div>
        </div>
        <hr style="margin:0px">
        <div class="row airlinePadding ">
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Flight</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Boards</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Departs</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">${flightNumber}</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">${boardingValue}</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">${departsValue}</span>
            </div>
        </div>
          <div class="row airlinePadding">
            <div class="col-xs-9">
                <h3 class="pmd-card-title-text">${arrivalCity}</h3>
            </div>
            <div class="col-xs-3">
                <h3 class="pmd-card-title-text">${departCity}</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-5">
                <h2 class="pmd-display2" style="margin:0">${arrivalCode}</h2>
            </div>
            <div class="col-xs-4">
                <i class="material-icons pmd-lg">flight</i>
            </div>
            <div class="col-xs-3">
                <h2 class="pmd-display2" style="margin:0">${departCode}</h2>
            </div>
        </div>
    </div>
<div class="pmd-card-actions col-xs-12" style="text-align:center">
            <button class="btn pmd-btn-flat airlinePadding pmd-ripple-effect btn-primary " type="button">View Boarding Pass</button>
        </div>
</div>`;
                }
            }
        }
        return html;

    }
    // -------------------------------------------------------------------------------

    // airline Checkin

    methods.airlineCheckin = (data) => {
        let html;
        let cardButtons = "";
        for (let i in data.payload) {
            if (data.payload[i].hasOwnProperty("platform")) {
                for (let j in data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.flight_info) {
                    html = `<div class="pmd-card  pmd-z-depth airlinePadding">
    <!-- Card header -->
    <div class="container panel-heading">
        <div class="row pmd-card-inverseblue airlinePadding">
            <div class="col-xs-7">
                <a href="javascript:void(0);" class="avatar-list-img">
            <img width="40" height="40" src="https://previews.123rf.com/images/sn333g/sn333g1504/sn333g150400033/39063712-Avi-n-icono-de-vuelo-o-avi-n-logo-despegue-vector-s-mbolo-azul-Foto-de-archivo.jpg">
        </a>
            </div>
            
            <div class="col-xs-5">
                <h3 class="pmd-card-title-text">Booking Number</h3>
                <span class="pmd-card-subtitle-text">D0FQTK</span>
            </div>
        </div>
        <hr style="margin:0px">
        <div class="row airlinePadding ">
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Flight</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Boards</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Departs</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">KL0605</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">9:50 AM</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">11:20 AM</span>
            </div>
        </div>
          <div class="row airlinePadding">
            <div class="col-xs-8">
                <h3 class="pmd-card-title-text">Amesterdam</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">San Francisco</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-5">
                <h2 class="pmd-display2" style="margin:0">AMS</h2>
            </div>
            <div class="col-xs-3">
                <i class="material-icons pmd-lg">flight</i>
            </div>
            <div class="col-xs-4">
                <h2 class="pmd-display2" style="margin:0">SFO</h2>
            </div>
        </div>
    </div>
<div class="pmd-card-actions col-xs-12" style="text-align:center">
            <button class="btn pmd-btn-flat pmd-ripple-effect btn-primary" type="button">Checkin</button>
        </div>
</div>`;
                }
            }
        }
        return html;

    }
    // -------------------------------------------------------------------------------
    // Airline flight update
    methods.airlineFlightUpdate = (data) => {
        let html;
        let cardButtons = "";
        for (let i in data.payload) {
            console.log('this is flight update first for loop');
            if (data.payload[i].hasOwnProperty("platform")) {
            console.log('this is flight update first if ');
                
                // for (let j in data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.update_flight_info) {
                console.log(data.payload[i].payload.facebook.attachment.payload.message.attachment.payload.update_flight_info);
                html = `<div class="pmd-card  pmd-z-depth airlinePadding">
    <!-- Card header -->
    <div class="container panel-heading">
        <div class="row pmd-card-inverse airlinePadding">
            <div class="col-xs-7">
                <a href="javascript:void(0);" class="avatar-list-img">
            <img width="40" height="40" src="https://previews.123rf.com/images/sn333g/sn333g1504/sn333g150400033/39063712-Avi-n-icono-de-vuelo-o-avi-n-logo-despegue-vector-s-mbolo-azul-Foto-de-archivo.jpg">
        </a>
            </div>
            
            <div class="col-xs-5">
                <h3 class="pmd-card-title-text">Flight Status</h3>
                <span class="pmd-card-subtitle-text text-color-red">Delayed</span>
            </div>
        </div>
        <hr style="margin:0px">
        <div class="row airlinePadding ">
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Flight</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Departs</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">Arrives</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text">KL0605</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text text-color-red">9:50 AM</span>
            </div>
            <div class="col-xs-4">
                <span class="pmd-card-subtitle-text text-color-red">11:20 AM</span>
            </div>
        </div>
          <div class="row airlinePadding">
            <div class="col-xs-8">
                <h3 class="pmd-card-title-text">Amesterdam</h3>
            </div>
            <div class="col-xs-4">
                <h3 class="pmd-card-title-text">San Francisco</h3>
            </div>
        </div>
        <div class="row  ">
            <div class="col-xs-5">
                <h2 class="pmd-display2" style="margin:0">AMS</h2>
            </div>
            <div class="col-xs-3">
                <i class="material-icons pmd-lg">flight</i>
            </div>
            <div class="col-xs-4">
                <h2 class="pmd-display2" style="margin:0">SFO</h2>
            </div>
        </div>
    </div>

</div>`;
            }
        }
        return html;

    }
    // -------------------------------------------------------------------------------

    return methods;
});