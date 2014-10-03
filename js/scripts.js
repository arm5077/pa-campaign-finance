$(document).ready(function() {      
   

 //parse url
 var pathname = window.location.pathname; //get current url
 var split = pathname.split("/"); //treat it like a string, break it up where the /'s are
 //console.log(split[2]);
 
 //case statement
 switch(split[2]) { //the second item in the array will be the type of page this will be
    case "candidates":
        $('#bycandidate').addClass('active'); //make the dropdown menu active on the correct item
		var candName = decodeURIComponent(split[3]); //grab the candidate name from the url
		console.log(toTitleCase(candName));
        break;
    case "counties":
      $('#bycounty').addClass('active');
	  var countyName = split[3];
		console.log("one more tiiiiiiiiiime");
		console.log("we're gonna celebrate");
	break;
	
	case "race":
		var race = split[3];
		var container = $("#main");
		var thinDivider = $("<div class='thin-divider'></div>");
		
		$.getJSON("api/candidates", function(canData){
			
			var results = canData.results;
			console.log(results);
			
			var totalCandidateContrib = 0;
			//var allCandidateContrib;
			var colWidth;
			var candidateBlock;
			/*var candidateImg;
			var candidateName;
			var candidateLabel;
			var candidateTotal;*/
			
			if(results.length <= 2){
					colWidth = 6;
				}else{
					colWidth = 4;
				};
			
			$.each( results, function(i, item) {
				candidateContrib = parseFloat(results[i].total);
				candidateContrib = Math.round(candidateContrib);
				candidateContrib = candidateContrib.numberFormat(0);
				totalCandidateContrib += candidateContrib;
				
				var img = results[i].img;
				var name = results[i].name;
				var party = results[i].party;
				if (party == "DEM"){
					party = "Democrat";
				}else if(party == "REP"){
					party = "Republican"
				}
				
				candidateBlock = $("<div class='col-lg-" + colWidth + " col-md-" + colWidth + " col-sm-" + colWidth + " block'>");
				candidateImg = $("<div class='banner-image' id='candidateImg'></div>").appendTo(candidateBlock);
				candidateImg.attr("style", "background-image:url('../img/" + img + "'); background-size: cover; ");
				candidateName = $("<h2>" + name + " <small>" + party + "</small></h2>").appendTo(candidateBlock);
				candidateLabel = $("<label>Total contributed to " + name + "</label>").appendTo(candidateBlock);
				candidateTotal = $("<h2 class='jumbo'>$" + candidateContrib + "</h2>").appendTo(candidateBlock);				
			});
			
			console.log(parseFloat(results[0].total) + parseFloat(results[1].total));
			
			allCandidateContrib = "$" + candidateContrib;
			
			var projectIntro = $("<div class='row' id='project-intro'></div>").appendTo(container);
			
			var introText = $("\
			<div class='col-lg-5 col-md-5 col-sm-5 lead'> \
				<p>Causa similis loquor tation scisco. Ratis camur decet eu. Quibus et feugait ut gravis consequat duis. Quis jugis minim quis uxor dignissim. Comis vereor nimis. Wisi delenit feugait.</p>").appendTo(projectIntro);
			
			var totalContrib = $("<div class='col-lg-7 col-md-7 col-sm-7'></div>").appendTo(projectIntro);
			
			var totalContribAmt = $("<label>TOTAL CONTRIBUTIONS TO ALL CANDIDATES</label><h2 class='ultra-mega'>" + allCandidateContrib + "</h2>").appendTo(totalContrib);
			
			thinDivider.appendTo(container);
			
			var candidateVScandidate = $("<div class='row' id='candidate-vs-candidate'>").appendTo(container);
			
			results.push(candidateBlock).appendTo(candidateVScandidate);



			
						
			
			
			
						
		}) // end case race getJSON api/candidates
		break;
	case "contributors":
       $('#bycontributor').addClass('active');
	   var contribID = split[3];
	   
	   $.getJSON("/api/contributors/" + contribID, function(data){
	   		
	   		//var need = "{need variable}";
	   		
	   		
		   	//intro row
				var container = $("#main");
				introRow = $("<div></div>").appendTo(container);	
				introRow.addClass("row intro-row");
				
				var introLabel = $("<label>CONTRIBUTOR</label>");
				introLabel.appendTo(introRow);
				
				var jumbotron = $("<div></div>").appendTo(introRow);
				jumbotron.addClass("jumbotron");
				
				var contribName = data.results[0].contributor;
				console.log(data.results);
				
				var headerAmt = $("<h1>" + contribName + "</h1><div class='thin-divider'></div>");
				headerAmt.appendTo(jumbotron);
				
				var contribJob = data.results[0].occupation;
				var contribEmp = data.results[0].empName;
				
				//console.log(contribJob.length);
				
				var contribTitle = "";
				if((contribJob.length > 0) && (contribEmp.length > 0)){
					contribTitle = "<small>" + contribJob + ", " + contribEmp + "</small>";
				}else if ((contribJob.length > 0) && (contribEmp.length == 0)){
					contribTitle = "<small>" + contribJob + "</small>";
				}else if ((contribJob.length == 0) && (contribEmp.length > 0)){
					contribTitle = ", <small>" + contribEmp + "</small>"; 
				}else {
					contribTitle = "";
				};
				$(contribTitle).appendTo(headerAmt);
				
				
				var thinDivider = $("<div class='thin-divider'></div>");
				thinDivider.appendTo(jumbotron);
	   
	   
				// top totals row
				var topTotals = $("<div class='row top-totals'></div>").appendTo(container);
				
				var topTotalsLeft = $("<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12 block first'></div>").appendTo(topTotals);
				
				// Location block	
				var locationCity = data.results[0].city;
				var locationCounty = data.results[0].county;
				var topTotalsLeftLocationBlock = $("<div class='row'> \
														<div class='col-lg-12 col-md-12 col-sm-12'> \
															<label>LOCATION</label><h3>" + locationCity + "</h3> \
															<p><a href='/a/counties/" + locationCounty + "'>" + locationCounty + " County</a></p> \
														</div> \
													</div> \
													<div class='thin-divider'></div>"
													).appendTo(topTotalsLeft);
	   
				thinDivider.appendTo(topTotalsLeft);
	   
				//Top contributed block
				var topTotalsContrib = $("<div class='row'></div>").appendTo(topTotalsLeft);
				var topTotalsContribCol12 = $("<div class='col-lg-12 col-md-12 col-sm-12'></div>").appendTo(topTotalsContrib);
	   
				var contributionTotal = data.results[0].amount;
				var topTotalsContribLabel = $("<label>TOTAL CONTRIBUTED</label><h3>" + toDollars(contributionTotal) + "</h3>").appendTo(topTotalsContribCol12);
				
				//Candidate breakdown table
				var topTotalsContribCandidate = $("<div class='row'></div>").appendTo(topTotalsContribCol12);
				var topTotalsContribCandidateCol12 = $("<div class='col-lg-12 col-md-12 col-sm-12'></div>").appendTo(topTotalsContribCandidate);
				var topTotalsContribCandidateTable = $("<table class='horizontal-bar-graph'></table>").appendTo(topTotalsContribCandidateCol12);
				
				
				
				
				//Corbett_Wolf variables and logic 
				var wolfContributionAmt = "";
				var wolfContributionNum = "";
				var results = data.results[0].beneficiaries;
				$.each(results, function(i, item){
					if(results[i].filerid == "20130153"){
						wolfContributionAmt = results[i].amount;
						wolfContributionNum = results[i].contributions;
					}else {
						wolfContributionAmt = "0";
						wolfContributionNum = "0";
					}
				});
				
				var corbettContributionAmt = "";
				var corbettContributionNum = "";
				var results = data.results[0].beneficiaries;
				$.each(results, function(i, item){
					if(results[i].filerid == "2009216"){
						corbettContributionAmt = results[i].amount;
						corbettContributionNum = results[i].contributions;
					}else {
						corbettContributionAmt = "0";
						corbettContributionNum = "0";
					}
				});
				
				var wolfBarWidth = "";
				var corbettBarWidth = "";
				if(wolfContributionAmt > corbettContributionAmt){
					wolfBarWidth = "100";
					corbettBarWidth = (corbettContributionAmt)/(wolfContributionAmt);
				}else if(corbettContributionAmt > wolfContributionAmt){
					corbettBarWidth = "100";
					wolfBarWidth = (wolfContributionAmt)/(corbettContributionAmt);
				} else{
					corbettBarWidth = "100";
					wolfBarWidth = "100";
				};
				
				
				//Corbett row --> need to make graphic length respect amt donated 
				var topTotalsCorbettRow = $("<tr><td><strong>Corbett</strong></td><td><div class='bar republican' style='width:" + corbettBarWidth +"%; color:#000000;'></div><span style='overflow:visible;'>" + corbettContributionAmt + " (" + corbettContributionNum + " contributions)" + "</span></td></tr>").appendTo(topTotalsContribCandidateTable);
				
				
				//Wolf row --> need to make graphic length respect amt donated
				var topTotalsWolfRow = $("<tr><td><strong>Wolf</strong></td><td><div class='bar democrat' style='width:" + wolfBarWidth + "%; color:#000000;'></div><span style='overflow:visible;'>" + wolfContributionAmt + " (" + wolfContributionNum + " contributions)" + "</span></td></tr>").appendTo(topTotalsContribCandidateTable);
				
				//Overtime
				var topTotalsOvertime = $("<div class='col-lg-8 col-md-8 col-sm-8 col-xs-12 block last'>").appendTo(topTotals);
				var topTotalsOvertimeGraph = $("<h3>Contributions over time</h3><div id='timechart' style='width:100%; height:400px'></div>").appendTo(topTotalsOvertime);
				makeTimeChart("timechart", "contributors", contribID, "2013-01-01", "2014-11-01");
	   
	   
				thinDivider.appendTo(container);
				
				container.append(thinDivider);
				
				container.append('<div class="row tabular"> \
									<div class="col-lg-12 col-md-12 col-sm-12"> \
										<h3>All donations by ' + contribName +'</h3> \
										<form class="form-inline pull-right"> \
											<input type="search" class="form-control" placeholder="Search"> \
											<button type="submit" class="btn btn-default">Submit</button> \
										</form> \
										<table class="table table-hover sortable"> \
											<thead> \
												<tr> \
													<th>Date</th>\
													<th>Candidate/PAC</th> \
													<th>Amount</th> \
												</tr> \
											</thead> \
											<tbody></tbody> \
										</table> \
									</div> \
								</div> ');
				
				//get contributor data
				$.getJSON("/api/contributions/contributors/" + contribID, function(data){
					
					$.each(data.results, function(i, result){
						$('.tabular tbody').append("<tr><td><a href='/a/contributions/" + result.id + "'>" + result.date + "</a></td><td>" + result.name + "</td><td>" + toDollars(result.contribution) + "</td></tr>");
					});
					
				});	   

			});
	   
	   
	   
	   
	 
	   
	   
	   
	   
        break;
		case "contributions":
         $('#bycontributor').addClass('active');
		  var contributionID = split[3];
        
			$.getJSON("/api/contributions/" + contributionID, function(data){
				var contribName = data.results[0].contributor;
				var contribID = data.results[0].contributorid;
				var contributionAmt = "$" + data.results[0].contribution;
				
				var conDateRaw = data.results[0].date;
				var d = new Date(conDateRaw);
				var con_date = d.getDate(conDateRaw);
				var con_month = d.getMonth(conDateRaw);
				var con_year = d.getFullYear(conDateRaw);
				var contributionDate = con_month + "/" + con_date + "/" + con_year;
				
				var filerID = data.results[0].filerid;
				
				$.getJSON("/api/contributors/" + contribID, function(data){
					 var locationCity = data.results[0].city;
					 var locationZip = data.results[0].zip;
					 var locationState = data.results[0].state;
					 locationZip = locationZip.substring(0,5);
					 var locationAddress = data.results[0].address;
						
					$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + locationCity + "&components=postal_code:" + locationZip, function(geodata){	
						console.log(geodata);
						
						var contribLAT = geodata.results[0].geometry.location.lat;
						var contribLNG = geodata.results[0].geometry.location.lng;
						/*var geoResults = geodata.results;
						$.each(geoResults, function(g, location){
							if(geoResults[g].address_components[4].short_name == locationZip){
								contribLAT = geoResults[g].geometry.location.lat;
								contribLNG = geoResults[g].geometry.location.lng;
							}	
						});*/
						
					 function initializeGmap() {	
						  var mapOptions = {
						    center: { lat: contribLAT, lng: contribLNG},
						    zoom: 8,
						    disableDefaultUI: true,
						    scrollwheel: false,
						    draggable: false
						  };
						  var Gmap = new google.maps.Map(document.getElementById('map-canvas'),
						      mapOptions);
						  
						  var addressMarker = new google.maps.Marker({
						    position: { lat: contribLAT, lng: contribLNG},
						    map: Gmap,
						    title:locationCity
							});
						}

						
				
				
						$.getJSON("/api/candidates/", function(data){
													
							var candidateName = "";
							var results = data.results;
							$.each(results, function(i, item){
								if(results[i].filerid == filerID){
									candidateName = results[i].name;
								}
							});
							
							
							//intro row
							var container = $("#main");
							introRow = $("<div></div>").appendTo(container);	
							introRow.addClass("row intro-row");
							
							var introLabel = $("<label>CONTRIBUTION</label>");
							introLabel.appendTo(introRow);
							
							var jumbotron = $("<div></div>").appendTo(introRow);
							jumbotron.addClass("jumbotron");
							
							var headerAmt = $("<h1>" + contributionAmt + "</h1>");
							headerAmt.appendTo(jumbotron);
							
							var thinDivider = $("<div class='thin-divider'></div>");
							thinDivider.appendTo(jumbotron);
							
							
							//donation info row
							contributionRow = $("<div></div>").appendTo(container);
							contributionRow.addClass("row");
							
							var colmd5 = "col-md-5";
							var collg7 = "col-lg-7";
							var colmd7 = "col-md-7";
							var colsm7 = "col-sm-7";
							
							contributionColumn = $("<div class='col-md-7 contrib-items block'></div>").appendTo(contributionRow);
							
							var h3 = "<h3></h3>";
							
							var contribItem = $(h3).appendTo(contributionColumn);
							contribItem.addClass("donor-item");
							var contribLabel = $("<strong>Contributor: </strong>").appendTo(contribItem);
							var contribLink = $("<a>" + contribName + "</a>").appendTo(contribItem);
							contribLink.attr("href", "/a/contributors/" + contribID);
							
							var candidateItem = $(h3).appendTo(contributionColumn);
							candidateItem.addClass("candidate-item");
							var candidateLabel = $("<strong>Candidate: </strong>").appendTo(candidateItem);
							var candidateLink = $("<a>" + candidateName + "</a>").appendTo(candidateItem);
							candidateLink.attr("href", "/a/candidates/" + candidateName);
							
							var dateItem = $(h3).appendTo(contributionColumn);
							dateItem.addClass("date-item");
							var dateLabel = $("<strong>Date: </strong>").appendTo(dateItem);
							var dateData = $("<span>" + contributionDate + "</span>").appendTo(dateItem);
							
							
							var locationItem = $(h3).appendTo(contributionColumn);
							locationItem.addClass("location-item");
							var locationLabel = $("<strong>Location: </strong>").appendTo(locationItem);
							var locationData = $("<span>" + locationCity + ", " + locationState + " " + locationZip + "</span>").appendTo(locationItem);
							
							mapColumn = $("<div class='col-lg-5 col-md-5 col-sm-5 block'></div>").appendTo(contributionRow);
							mapColumn.append("<div id='map-canvas' style='width:100%; border:1px solid lightgray; height:190px'></div>");
							initializeGmap();
	
							//$(Gmap).appendTo(mapColumn);
							//console.log(map);
							
							//var countyMap = $("<img class='sm_county_map' src='/img/allegheny-map.png' alt='Allegheny County locator map'>").appendTo(mapColumn);
							
						
						});
					
					});
					
				
				});
				
			});
		
		
		
		
		break;
    default:
        //default //code block
}
 
	  
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

