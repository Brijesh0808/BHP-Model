//jss file acts as an interface b/w frontend html page and backend flask server for delievering values

function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  //getting values ofall vars from page and storing in variables.
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  //var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  var url = "https://banglore-prop-price-pred.herokuapp.com/predict_home_price";

//making a post call to the url for price prediction.
  $.post(url, {

      Size_In_Sqft: parseFloat(sqft.value),
      BHK: bhk,
      N_bath: bathrooms,
      Location: location.value

      // total_sqft: parseFloat(sqft.value),
      // bhk: bhk,
      // bath: bathrooms,
      // location: location.value
  },function(data, status) {                //Here we get o/p of post call(i.e. estimated price) in data variable
      console.log(data.Net_Price);
      estPrice.innerHTML = "<h2>" + data.Net_Price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  //var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  var url = "https://banglore-prop-price-pred.herokuapp.com/get_location_names";

  //making get call to the url. So in return we will get all the locations. 'data' var will have the response stored.
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {

        // Like in dict, we get data.locations. {locations: .....}
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();


          //itterating and appending those locations in drop down of frntend html page
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

/* This means the function which will be called on loading of page. Function here is onPageLoad */
window.onload = onPageLoad;