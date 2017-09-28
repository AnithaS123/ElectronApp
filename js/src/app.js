'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */

define(['jquery', 'settings', 'apiService', 'utils'], function ($, config, apiService, utils) {

	$(function () {

		var chatKeyPressCount = 0;

		if (config.accessToken && config.chatServerURL) {
			var processor = apiService();
		}

		if (!processor) {
			throw new Error("Message processing manager is not defined!");
		}

		var msg_container = $("ul#msg_container");
		if (msg_container.find('li').length == 0) {
			msg_container.siblings("h1").removeClass('hidden');
		} else {
			msg_container.siblings("h1").addClass('hidden');
			msg_container.removeClass('hidden');
		}

		//Chatbox Send message
		$("#btn-input").keypress(function (e) {
			if (e.which == 13) {
				var text = $(this).val();
				if (text !== "") {
					$(this).val('');
					//Calling ApiaiService call
					processor.askBot(text, function (error, html) {
						if (error) {
							alert(error); //change into some inline fancy display, show error in chat window.
						}
						if (html) {
							if (msg_container.hasClass('hidden')) { // can be optimimzed and removed from here

								msg_container.siblings("h1").addClass('hidden');
								msg_container.removeClass('hidden');
							}
							//Binding response HTML to chat window
							msg_container.append(html);
							//utils.scrollSmoothToBottom($('div.chat-body'));
							// console.log(html);
							if (chatKeyPressCount != 0) {
								var wtf = $('div.chat-body');
								var height = wtf[0].scrollHeight;
								wtf.scrollTop(height);
							}
							else {
								var height = 0;
								height = parseInt($('div.chat-body').height());
								$('div.chat-body').animate({ scrollTop: height });
							}
							chatKeyPressCount = chatKeyPressCount + 1;
						}
					});
					e.preventDefault();
				}
			}
		});

		// $(document).on('click', '.btnPayload', function (e) {
		//     var payloadInput = $(this).data().quickrepliespayload;
		//     processor.askBot(payloadInput, function (error, html) {
		//         if (error) {
		//             Console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
		//         }
		//         if (html) {
		//             msg_container.append(html);

		//         }
		//     });
		//     e.preventDefault();
		// });

		// const remote = require('electron').remote;
		// $(document).on('click', '#btnMinimize', function (e) {
		//     var window = remote.getCurrentWindow();
		//     window.minimize();
		// })

		// $(document).on('click', '#btnClose', function (e) {
		//     var window = remote.getCurrentWindow();
		//     if (confirm('Are you sure want to exit')) {
		//         window.close();
		//     }
		// })        

		//Quick Replies payload button Click
		$(document).on('click', '.QuickreplybtnPayload', function (e) {
			var payloadInput = $(this).data().quickrepliespayload;
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);

				}
			});
			e.preventDefault();
		});

		$(document).on('click', '.cardresponsepayload', function (e) {
			var payloadInput = $(this).data().cardpayloadbutton;
			console.log('Button Payload' + payloadInput);
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);

				}
			});
			e.preventDefault();
		});

		$(document).on('click', '.caroselresponsepayload', function (e) {
			var payloadInput = $(this).data().carouselpayloadbutton;
			console.log('Button Payload' + payloadInput);
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);

				}
			});
			e.preventDefault();
		});

		// Airline Boarding Pass
		$(document).on('click', '.airlineBoardingButton', function (e) {
			//var payloadInput = $(this).data().airlineBoardingButton;
			var payloadInput = "Airline";
			console.log('Button Payload' + payloadInput);
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);

				}
			});
			e.preventDefault();
		});
		// ----------------------------

		// Airline Checkin
		$(document).on('click', '.airlineCheckinButton', function (e) {
			//var payloadInput = $(this).data().airlineBoardingButton;
			var payloadInput = "Checkin";
			console.log('Button Payload' + payloadInput);
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);

				}
			});
			e.preventDefault();
		});
		// ----------------------------


	});
});