/*global $:false, jQuery:false, devel: true */

var WEREWOLF = (function () {
    'use strict';
    var i;
    
    function loadCard(cardname) {
        var cardViewer = $(".cardViewer"),
            viewerRow = $(".cardViewerRow"),
            path = cardname + ".html";
        
        cardViewer.load(path, function (response, status, xhr) {
            // onComplete here
            viewerRow.show(150, function () {
                $("html, body").animate({ scrollTop: $(".cardViewerRow").offset().top }, "slow");
            });
        });
    }
    
    function loadHouse(housename) {
        var houseViewer = $(".houseViewer"),
            viewerRow = $(".houseViewerRow"),
            path = housename + ".html";
        
        houseViewer.load(path, function (response, status, xhr) {
            // onComplete here
            viewerRow.show(150, function () {
                $("html, body").animate({ scrollTop: $(".houseViewerRow").offset().top }, "slow");
            });
        });
    }
    
    $(function () {
        var cards = $(".card"),
            houses = $(".house");
    
        cards.each(function (cardCount) {
            var card = $(cards[cardCount]),
                html = card[0];
            card.on("click", function () {
                loadCard(card.attr("data"));
            });
        });
        
        
        houses.each(function (houseCount) {
            var house = $(houses[houseCount]),
                html = house[0];
            house.on("click", function () {
                loadHouse(house.attr("data"));
            });
        });
    });
}());