/*global $:false, jQuery:false, devel: true */

var WEREWOLF = (function () {
    'use strict';
    var i;

    function loadCard(cardname) {
      var cardViewer = $(".cardViewer"),
      viewerRow = $(".cardViewerRow"),
      path = "html-content/" + cardname + ".html";

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
      path = "html-content/" + housename + ".html";

      houseViewer.load(path, function (response, status, xhr) {
          // onComplete here
          viewerRow.show(150, function () {
              $("html, body").animate({ scrollTop: $(".houseViewerRow").offset().top }, "slow");
          });
      });
    }

  $(document).ready(function(e) {
      try {
        var cardOptions = {
          visibleRows: 4,
          rowHeight:200,
          on: {
            change: function(data) {
              var val = data.value;
              if (val != "") {
                loadCard(val);
              }
            }
          }
        };
        var houseOptions = {
          visibleRows: 4,
          rowHeight:200,
          on: {
            change: function(data) {
              var val = data.value;
              if (val != "") {
                loadHouse(val);
              }
            }
          }
        };
        $("#cardMenu").msDropdown(cardOptions);
        $("#houseMenu").msDropdown(houseOptions);
      } catch(e) {
          alert(e.message);
      }
  });
}());

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
