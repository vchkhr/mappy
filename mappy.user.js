// ==UserScript==
// @name            MAPPY
// @namespace       https://github.com/vchkhr/mappy/
// @version         1.1
// @author          vchkhr
// @description     With MAPPY you can switch from one map service to another with just one click
// @icon            https://raw.githubusercontent.com/vchkhr/mappy/main/img/logo.png
// @updateURL       https://raw.githubusercontent.com/vchkhr/mappy/main/mappy.user.js
// @downloadURL     https://raw.githubusercontent.com/vchkhr/mappy/main/mappy.user.js
// @match           https://www.google.com/maps*
// @match           https://www.google.com.ua/maps*
// @match           https://www.google.ua/maps*
// @match           https://www.google.ru/maps*
// @match           https://www.google.by/maps*
// @match           https://www.google.kz/maps*
// @match           https://www.mapillary.com/app*
// @match           https://mapcreator.here.com/*
// @match           https://mpro.maps.yandex.ru/*
// @match           https://n.maps.yandex.ru/*
// @match           https://wego.here.com/?map=*
// @match           https://yandex.com/maps/*
// @match           https://yandex.ru/maps/*
// @match           https://yandex.ua/maps/*
// @match           https://yandex.by/maps/*
// @match           https://yandex.kz/maps/*
// @match           https://www.openstreetmap.org/#map=*
// ==/UserScript==

(function() {
	'use strict';
	window.mapRouterVersion = 1.0;
	console.log("MAPPY - info - version: " + mapRouterVersion);

	window.currentURL = window.location.href;
	window.currentService = "";
	window.currentServiceType = "";
	window.buttonsMarginTop = 0;
	window.buttonsMarginRight = 0;
	window.buttonsMarginLeft = 0;

	if (currentURL.indexOf("mpro.maps.yandex.ru") >= 0) {
		window.currentService = "YandexYedinaiaKarta";
		window.currentServiceType = "editor";
		window.buttonsMarginTop = 6.5;
		window.buttonsMarginRight = 48;
	} else if (currentURL.indexOf("n.maps.yandex.ru") >= 0) {
		window.currentService = "YandexNarodnaiaKarta";
		window.currentServiceType = "editor";
		window.buttonsMarginTop = 6.5;
		window.buttonsMarginRight = 48;
	} else if (currentURL.indexOf("google") >= 0) {
		if (currentURL.indexOf("/maps") >= 0) {
			window.currentService = "GoogleMaps";
			window.currentServiceType = "map";
			window.buttonsMarginTop = 20.4;
			window.buttonsMarginRight = 119;
		}
	} else if (currentURL.indexOf("mapcreator.here.com") >= 0) {
		window.currentService = "HEREMapCreator";
		window.currentServiceType = "editor";
		window.buttonsMarginTop = 14;
		window.buttonMarginLeft = 285;
	} else {
		window.currentServiceType = "unknown";
	}

	console.log("MAPPY - info - current service: " + currentService + "; current servie type: " + currentServiceType + "; buttonns margin top: " + buttonsMarginTop + "; button margin right: " + buttonsMarginRight + "; button margin left: " + buttonsMarginLeft);

	if (currentServiceType == "unknown") {
		console.log("MAPPY - error - not supported service");
	} else {
		var buttonsStyle = "position: absolute; top: " + buttonsMarginTop + "px; z-index: 999999999; height: 20px; cursor: pointer; border: 0px; border-radius: 3px;";
		var buttonAlt = "MAPPY - open in ";

		var buttonGoogleMaps = document.createElement("img");
		buttonGoogleMaps.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/GoogleMaps.png";
		buttonGoogleMaps.title = buttonAlt + "Google Maps";
		buttonGoogleMaps.style.cssText = "display: none;";
		buttonGoogleMaps.onclick = redirectGoogleMaps;
		document.body.appendChild(buttonGoogleMaps);

		var buttonGoogleStreetView = document.createElement("img");
		buttonGoogleStreetView.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/GoogleStreetView.png";
		buttonGoogleStreetView.title = buttonAlt + "Google Street View";
		buttonGoogleStreetView.style.cssText = "display: none;";
		buttonGoogleStreetView.onclick = redirectGoogleStreetView;
		document.body.appendChild(buttonGoogleStreetView);

		var buttonHEREWeGo = document.createElement("img");
		buttonHEREWeGo.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/HEREWeGo.png";
		buttonHEREWeGo.title = buttonAlt + "HERE WeGo";
		buttonHEREWeGo.style.cssText = "display: none;";
		buttonHEREWeGo.onclick = redirectHEREWeGo;
		document.body.appendChild(buttonHEREWeGo);

		var buttonMapillary = document.createElement("img");
		buttonMapillary.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/Mapillary.png";
		buttonMapillary.title = buttonAlt + "Mapillary";
		buttonMapillary.style.cssText = "display: none;";
		buttonMapillary.onclick = redirectMapillary;
		document.body.appendChild(buttonMapillary);

		var buttonYandexKarty = document.createElement("img");
		buttonYandexKarty.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/YandexKarty.png";
		buttonYandexKarty.title = buttonAlt + "Яндекс.Карты";
		buttonYandexKarty.style.cssText = "display: none;";
		buttonYandexKarty.onclick = redirectYandexKarty;
		document.body.appendChild(buttonYandexKarty);

		var buttonVisicom = document.createElement("img");
		buttonVisicom.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/Visicom.png";
		buttonVisicom.title = buttonAlt + "Визиком";
		buttonVisicom.style.cssText = "display: none;";
		buttonVisicom.onclick = redirectVisicom;
		document.body.appendChild(buttonVisicom);

		var buttonTwoGis = document.createElement("img");
		buttonTwoGis.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/TwoGis.png";
		buttonTwoGis.title = buttonAlt + "2GIS";
		buttonTwoGis.style.cssText = "display: none;";
		buttonTwoGis.onclick = redirectTwoGis;
		document.body.appendChild(buttonTwoGis);

		var buttonHEREMapCreator = document.createElement("img");
		buttonHEREMapCreator.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/HEREMapCreator.png";
		buttonHEREMapCreator.title = buttonAlt + "HERE Map Creator";
		buttonHEREMapCreator.style.cssText = "display: none;";
		buttonHEREMapCreator.onclick = redirectHEREMapCreator;
		document.body.appendChild(buttonHEREMapCreator);

		var buttonYandexNarodnaiaKarta = document.createElement("img");
		buttonYandexNarodnaiaKarta.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/YandexNarodnaiaKarta.png";
		buttonYandexNarodnaiaKarta.title = buttonAlt + "Яндекс.Народня Карта";
		buttonYandexNarodnaiaKarta.style.cssText = "display: none;";
		buttonYandexNarodnaiaKarta.onclick = redirectYandexNarodnaiaKarta;
		document.body.appendChild(buttonYandexNarodnaiaKarta);

		var buttonYandexYedinaiaKarta = document.createElement("img");
		buttonYandexYedinaiaKarta.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/YandexYedinaiaKarta.png";
		buttonYandexYedinaiaKarta.title = buttonAlt + "Яндекс.Единая Карта";
		buttonYandexYedinaiaKarta.style.cssText = "display: none;";
		buttonYandexYedinaiaKarta.onclick = redirectYandexYedinaiaKarta;
		document.body.appendChild(buttonYandexYedinaiaKarta);

		var buttonSupport = document.createElement("img");
		buttonSupport.src = "https://raw.githubusercontent.com/vchkhr/mappy/main/img/services/Support.png";
		buttonSupport.title = "Get help";
		buttonSupport.style.cssText = "display: none;";
		buttonSupport.onclick = redirectSupport;
		document.body.appendChild(buttonSupport);

		setTimeout(function(){

			if (currentService == "YandexYedinaiaKarta") {
				buttonSupport.style.cssText = buttonsStyle;
				buttonSupport.style.right = buttonsMarginRight + 0 + "px";

				buttonYandexNarodnaiaKarta.style.cssText = buttonsStyle;
				buttonYandexNarodnaiaKarta.style.right = buttonsMarginRight + 30 + "px";

				buttonHEREMapCreator.style.cssText = buttonsStyle;
				buttonHEREMapCreator.style.right = buttonsMarginRight + 60 + "px";

				buttonTwoGis.style.cssText = buttonsStyle;
				buttonTwoGis.style.right = buttonsMarginRight + 90 + "px";

				buttonVisicom.style.cssText = buttonsStyle;
				buttonVisicom.style.right = buttonsMarginRight + 120 + "px";

				buttonYandexKarty.style.cssText = buttonsStyle;
				buttonYandexKarty.style.right = buttonsMarginRight + 150 + "px";

				buttonMapillary.style.cssText = buttonsStyle;
				buttonMapillary.style.right = buttonsMarginRight + 180 + "px";

				buttonHEREWeGo.style.cssText = buttonsStyle;
				buttonHEREWeGo.style.right = buttonsMarginRight + 210 + "px";

				buttonGoogleStreetView.style.cssText = buttonsStyle;
				buttonGoogleStreetView.style.right = buttonsMarginRight + 240 + "px";

				buttonGoogleMaps.style.cssText = buttonsStyle;
				buttonGoogleMaps.style.right = buttonsMarginRight + 270 + "px";
			} else if (currentService == "GoogleMaps") {
				buttonSupport.style.cssText = buttonsStyle;
				buttonSupport.style.right = buttonsMarginRight + 0 + "px";

				buttonYandexYedinaiaKarta.style.cssText = buttonsStyle;
				buttonYandexYedinaiaKarta.style.right = buttonsMarginRight + 30 + "px";

				buttonYandexNarodnaiaKarta.style.cssText = buttonsStyle;
				buttonYandexNarodnaiaKarta.style.right = buttonsMarginRight + 60 + "px";

				buttonHEREMapCreator.style.cssText = buttonsStyle;
				buttonHEREMapCreator.style.right = buttonsMarginRight + 90 + "px";

				buttonTwoGis.style.cssText = buttonsStyle;
				buttonTwoGis.style.right = buttonsMarginRight + 120 + "px";

				buttonVisicom.style.cssText = buttonsStyle;
				buttonVisicom.style.right = buttonsMarginRight + 150 + "px";

				buttonYandexKarty.style.cssText = buttonsStyle;
				buttonYandexKarty.style.right = buttonsMarginRight + 180 + "px";

				buttonMapillary.style.cssText = buttonsStyle;
				buttonMapillary.style.right = buttonsMarginRight + 210 + "px";

				buttonHEREWeGo.style.cssText = buttonsStyle;
				buttonHEREWeGo.style.right = buttonsMarginRight + 240 + "px";
			} else if (currentService == "HEREMapCreator") {
				buttonSupport.style.cssText = buttonsStyle;
				buttonSupport.style.left = buttonMarginLeft + 270 + "px";

				buttonYandexYedinaiaKarta.style.cssText = buttonsStyle;
				buttonYandexYedinaiaKarta.style.left = buttonMarginLeft + 240 + "px";

				buttonYandexNarodnaiaKarta.style.cssText = buttonsStyle;
				buttonYandexNarodnaiaKarta.style.left = buttonMarginLeft + 210 + "px";

				buttonTwoGis.style.cssText = buttonsStyle;
				buttonTwoGis.style.left = buttonMarginLeft + 180 + "px";

				buttonVisicom.style.cssText = buttonsStyle;
				buttonVisicom.style.left = buttonMarginLeft + 150 + "px";

				buttonYandexKarty.style.cssText = buttonsStyle;
				buttonYandexKarty.style.left = buttonMarginLeft + 120 + "px";

				buttonMapillary.style.cssText = buttonsStyle;
				buttonMapillary.style.left = buttonMarginLeft + 90 + "px";

				buttonHEREWeGo.style.cssText = buttonsStyle;
				buttonHEREWeGo.style.left = buttonMarginLeft + 60 + "px";

				buttonGoogleStreetView.style.cssText = buttonsStyle;
				buttonGoogleStreetView.style.left = buttonMarginLeft + 30 + "px";

				buttonGoogleMaps.style.cssText = buttonsStyle;
				buttonGoogleMaps.style.left = buttonMarginLeft + 0 + "px";
			}

		},2000)

		function redirect() {
			console.log("MAPPY - info - destination service: " + destinationService);

            if (currentService == "YandexYedinaiaKarta") {
                console.log("MAPPY - info - getting coordinates");
                window.currentURL = window.location.href;
                var coord1 = currentURL.split("?ll=");
                var coord2 = coord1[1];
                var coord3 = coord2.split("&l=");
                var coord4 = coord3[0];
                var coord5 = coord4.split("&z=");
                window.destinationCoordZ = coord5[1];
                var coord6 = coord5[0];
                var coord7 = coord6.split("%2C");
                window.destinationCoordX = coord7[1];
                window.destinationCoordY = coord7[0];
            } else if (currentService == "GoogleMaps") {
                console.log("MAPPY - info - getting coordinates");
                window.currentURL = window.location.href;
                var coord1 = currentURL.split("maps/@");
                var coord2 = coord1[1];
                var coord3 = coord2.split("/");
                var coord4 = coord3[0];
                if (coord4.indexOf("m") >= 0) {
                    console.log("MAPPY - info - Google Maps opened not in StreetView");
                    var coord5 = coord4.split("m");
                    var coord6 = coord5[0];
                    var coord7 = coord6.split(",");
                    window.destinationCoordX = coord7[0];
                    window.destinationCoordY = coord7[1];
                    window.destinationCoordZ = coord7[2];
                } else {
                    console.log("MAPPY - info - Google Maps opened in StreetView");
                    var coord5 = coord4.split(",");
                    window.destinationCoordX = coord5[0];
                    window.destinationCoordY = coord5[1];
                    window.destinationCoordZ = 200;
                }
            } else if (currentService == "HEREMapCreator") {
                console.log("MAPPY - info - getting coordinates");
                window.currentURL = window.location.href;
                var coord1 = currentURL.split("editor/");
                var coord2 = coord1[1];
                var coord3 = coord2.split(",");
                window.destinationCoordX = coord3[0];
                window.destinationCoordY = coord3[1];
                window.destinationCoordZ = coord3[2];
            }

            console.log("MAPPY - info - coordinates: " + destinationCoordX + " / " + destinationCoordY + " / " + destinationCoordZ);

            if (destinationService == "GoogleStreetView") {
                if (destinationCoordZ == 21) {
                    destinationCoordZ = 30;
                } else if (destinationCoordZ == 20) {
                    destinationCoordZ = 55;
                } else if (destinationCoordZ == 19) {
                    destinationCoordZ = 100;
                } else if (destinationCoordZ == 18) {
                    destinationCoordZ = 200;
                } else if (destinationCoordZ == 17) {
                    destinationCoordZ = 420;
                } else if (destinationCoordZ == 16) {
                    destinationCoordZ = 835;
                } else if (destinationCoordZ == 15) {
                    destinationCoordZ = 1680;
                } else {
                    destinationCoordZ = 3360;
                }
            } else {
                if ((destinationCoordZ >= 30) && (destinationCoordZ <= 55)) {
                    destinationCoordZ = 20;
                } else if (destinationCoordZ <= 100) {
                    destinationCoordZ = 19;
                } else if (destinationCoordZ <= 200) {
                    destinationCoordZ = 18;
                } else if (destinationCoordZ <= 420) {
                    destinationCoordZ = 17;
                } else if (destinationCoordZ <= 835) {
                    destinationCoordZ = 16;
                } else if (destinationCoordZ <= 1680) {
                    destinationCoordZ = 15;
                } else {
                    destinationCoordZ = 14;
                }
            }

            window.destinationURL = "#";

            if (destinationService == "OpenStreetView") {
                destinationURL = "https://www.openstreetmap.org/#map=" + destinationCoordZ + "/" + destinationCoordX + "/" + destinationCoordY + "";
            } else if (destinationService == "HEREWeGo") {
                destinationURL = "https://wego.here.com/?map=" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + ",satellite&l=sat,satellite";
            } else if (destinationService == "GoogleMaps") {
                destinationURL = "https://www.google.com/maps/@" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + "z";
            } else if (destinationService == "GoogleStreetView") {
                destinationURL = "https://www.google.com/maps/@" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + "m/data=!3m1!1e3";
            } else if (destinationService == "HEREMapCreator") {
                destinationURL = "https://mapcreator.here.com/mapcreator/" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + ",0,0,satellite.here?lang=en";
            } else if (destinationService == "Mapillary") {
                destinationURL = "https://www.mapillary.com/app?lat=" + destinationCoordX + "&lng=" + destinationCoordY + "&z=" + destinationCoordZ + "";
            } else if (destinationService == "GoogleStreetView") {
                destinationURL = "http://maps.google.com/maps?q=&layer=c&cbll=" + destinationCoordX + "," + destinationCoordY + "";
            } else if (destinationService == "YandexYedinaiaKarta") {
                destinationURL = "https://mpro.maps.yandex.ru/?ll=" + destinationCoordY + "%2C" + destinationCoordX + "&z=" + destinationCoordZ + "&l=mp%23sat&branch=0&activity=editor";
            } else if (destinationService == "YandexKarty") {
                destinationURL = "https://yandex.ru/maps/?ll=" + destinationCoordY + "%2C" + destinationCoordX + "&z=" + destinationCoordZ + "&l=sat";
            } else if (destinationService == "YandexNarodnaiaKarta") {
                destinationURL = "https://n.maps.yandex.ru/#!/?z=" + destinationCoordZ + "&ll=" + destinationCoordY + "%2C" + destinationCoordX + "&l=nk%23sat";
            } else if (destinationService == "Visicom") {
                destinationURL = "https://maps.visicom.ua/c/" + destinationCoordY + "," + destinationCoordX + "," + destinationCoordZ + "/a/0,1,2,3,4,5,6,7?lang=ru";
            } else if (destinationService == "TwoGis") {
                destinationURL = "https://2gis.ua/?m=" + destinationCoordY + "%2C" + destinationCoordX + "%2F" + destinationCoordZ;
            } else if (destinationService == "Support") {
                destinationURL = "https://github.com/vchkhr/mappy";
            } else {
                console.log("MAPPY - error - destination service unknown");
            }

			console.log("destinationURL: " + destinationURL);

			console.log("Redirecting");
			window.open(destinationURL, '_blank');
			console.log("Redirected");

		}

		function redirectGoogleMaps() {
			window.destinationService = "GoogleMaps";
			redirect();
		}

		function redirectGoogleStreetView() {
			window.destinationService = "GoogleStreetView";
			redirect();
		}

		function redirectYandexYedinaiaKarta() {
			window.destinationService = "YandexYedinaiaKarta";
			redirect();
		}

		function redirectYandexNarodnaiaKarta() {
			window.destinationService = "YandexNarodnaiaKarta";
			redirect();
		}

		function redirectYandexKarty() {
			window.destinationService = "YandexKarty";
			redirect();
		}

		function redirectHEREMapCreator() {
			window.destinationService = "HEREMapCreator";
			redirect();
		}

		function redirectHEREWeGo() {
			window.destinationService = "HEREWeGo";
			redirect();
		}

		function redirectMapillary() {
			window.destinationService = "Mapillary";
			redirect();
		}

		function redirectVisicom() {
			window.destinationService = "Visicom";
			redirect();
		}

		function redirectTwoGis() {
			window.destinationService = "TwoGis";
			redirect();
		}

		function redirectSupport() {
			window.destinationService = "Support";
			redirect();
		}

	}

})();
