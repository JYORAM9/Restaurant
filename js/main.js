var btn = document.getElementById("btn");
var lats =[];
var lngs =[];
var namess=[];

btn.addEventListener("click",function(){
	var ourRequest = new XMLHttpRequest();

	ourRequest.open('GET','https://raw.githubusercontent.com/JYORAM9/Restaurant/master/RestaurantData.json');
	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	};
ourRequest.send();
});

var category = document.getElementById("Category");
//var type = document.getElementById("Type");

function renderHTML(data){
      var Restaurant_info = document.getElementById("Restaurant-info");
			Restaurant_info.innerHTML = "";
      // creates a <table> element and a <tbody> element
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");

      var header = tbl.createTHead();
      var row = header.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      cell0.innerHTML = "<b>Restaurant Name </b>";
      cell1.innerHTML = "<b>Address</b>";
      cell2.innerHTML = "<b>Website </b>";
      cell3.innerHTML = "<b>Show Map</b>";
      cell4.innerHTML = "<b>Order Here</b>";

    	// creating all cells

      j=0;

      for (var i = 0; i < data.length; i++) {
        		if(data[i].Category == category.value)
        		{
							// creates a table row
      			var row = document.createElement("tr");

      			var cell3 = document.createElement("td");
      			var Name = document.createTextNode(data[i].Name);
      			var cell4 = document.createElement("td");
      			var Address = document.createTextNode(data[i].Address);
      			var cell5 = document.createElement("td");
            var cell6 = document.createElement("td");
            var cell7 = document.createElement("td");
            //website link
            var a = document.createElement('a');
            var linkText = document.createTextNode("Click Here");
            a.appendChild(linkText);
            a.href =data[i].Website;
            //show map column
            var m = document.createElement("BUTTON");
            var t = document.createTextNode("Show Map");

            j=j+1;
            m.value =j ;
            m.setAttribute("id", "m");
            m.appendChild(t);

            //website link
            var o = document.createElement('a');
            var linkText = document.createTextNode("Order Here");
            o.appendChild(linkText);
            o.href ="#";

      			cell3.appendChild(Name);
      			cell4.appendChild(Address);
      			cell5.appendChild(a);
            cell6.appendChild(m);
            cell7.appendChild(o);
      			row.appendChild(cell3);
      			row.appendChild(cell4);
      			row.appendChild(cell5);
            row.appendChild(cell6);
            row.appendChild(cell7);
      			// add the row to the end of the table body
      			tblBody.appendChild(row);
	}
}
// put the <tbody> in the <table>
tbl.appendChild(tblBody);
// appends <table> into <body>
Restaurant_info.appendChild(tbl);
// sets the border attribute of tbl to 5;
tbl.setAttribute("border", "5");

var  allButton = document.querySelectorAll("#m");
for(var i=0; i<allButton.length;i++)
{
	allButton[i].addEventListener("click",initMap);
}

for (var i = 0; i < data.length; i++)
{

	if(data[i].Category == category.value)
	{
	        var lat= data[i].geo_shape.coordinates[1];
	        var lng= data[i].geo_shape.coordinates[0];
				 	var name = data[i].Name;
	        lats.push(lat);
	        lngs.push(lng);
					namess.push(name);
	}
}

	function initMap(e){

			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					var plat=position.coords.latitude;
					var plng = position.coords.longitude;
					addMarker(plat,plng);
			});}
        var options ={
            zoom :10,
            center:{lat:34.7304,lng:-86.5861}
          }

          var map = new google.maps.Map(document.getElementById('map'),options);

					
				  var imagefood = 'https://raw.githubusercontent.com/JYORAM9/Restaurant/master/food.png';
          var imageperson = 'https://raw.githubusercontent.com/JYORAM9/Restaurant/master/current.png';

					var value = e.target.value;
					var lat = lats[value-1];
					var lng = lngs[value-1];
          var marker = new google.maps.Marker({
            position:{lat:lat,lng:lng},
            map:map,
            icon:imagefood,
            animation: google.maps.Animation.BOUNCE
          });

    function addMarker(plat,plng){
      var marker = new google.maps.Marker({
        position:{lat:plat,lng:plng},
        map:map,
        icon:imageperson,
        animation: google.maps.Animation.BOUNCE});}

				nam = namess[value-1];
       var infoWindow = new google.maps.InfoWindow({
			   content:nam
       });

       marker.addListener('click', function(){
         infoWindow.open(map, marker);
       });
     }
    }




//var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//var labelIndex = 0;
