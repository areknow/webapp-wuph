$(function() {
  
  //check status
  getStatus();
  
  //init ptr
  WebPullToRefresh.init({
    loadingFunction: switchHouseStatus,
    distanceToRefresh: 90,
    resistance: 3
  });
  
});


// pull to refresh function
var switchHouseStatus = function() {
  return new Promise(function(resolve, reject) {
    if (true) {
      resolve();
      switchStatus();
    } else {
      reject();
    }
  });
};

// switch status
var hungry = false;
function switchStatus() {
  if (hungry) {
    hungry = false;
    setToFed(getFeedTime());
    changeFeedTime();
  }
  else {
    hungry = true;
    setToHungry();
  }
}




// feeding status functions
function getStatus() {
  $.ajax({
    type: 'POST',
    url: 'php/check-status.php',
    cache: false,
    dataType: 'json',
    success: function(result) {
      if (result.status == "hungry") {
        hungry = true;
        setToHungry();
      } else {
        hungry = false;
        setToFed(result.time);
      }
    }
  });
}
function changeStatus(status) {
  $.ajax({
    type: 'POST',
    url: 'php/change-status.php',
    cache: false,
    data: {status:status},
    success: function(result) {
      console.log(result);
    }
  });
}






// feeding time functions
function getFeedTime() {
  var jqXHR = $.ajax({
    type: 'POST',
    url: 'php/check-time.php',
    async: false
  });
  return jqXHR.responseText;
}
function changeFeedTime() {
  $.ajax({
    type: 'POST',
    url: 'php/change-time.php',
    cache: false,
    data: {status:status},
    success: function(result) {
      console.log(result);
    }
  });
}





// UI update functions
function setToFed(time) {
  $('#content').addClass('fed');
  $('#content').removeClass('hungry');
  setTimeout(function() {
    $('.status').html("Animals fed at "+time).hide(0).fadeIn("slow");
  }, 1000);
  changeStatus('fed');
}
function setToHungry() {
  $('#content').addClass('hungry');
  $('#content').removeClass('fed');
  setTimeout(function() {
    $('.status').html("Animals are hungry").hide(0).fadeIn("slow");
  }, 1000);
  changeStatus('hungry');
}