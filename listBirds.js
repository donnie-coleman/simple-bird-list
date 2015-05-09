function listBirds(root) {
   var feed = root.feed;
   var entries = feed.entry || [];
   var html = ['<ol reversed=\"reversed\">'];
   var previousDate;
   var m_names = [ "January", "February", "March", 
				   "April", "May", "June", "July", "August", "September", 
				   "October", "November", "December"];
   var DATE_COL = 1;
   var BIRD_COL = 2;
   var TITLE_ROW = 1;
   var length = entries.length

   for (var i = length-1; i >= 0; i--) {
    var entry = entries[i];
    var column = entry.gs$cell.col;
	var row = entry.gs$cell.row;
	 
	if(column != BIRD_COL || row == TITLE_ROW) {
		continue;
	}
	
	var content = entry.content.$t;
	var date = entries[i-1].content.$t;
	
	if(date && previousDate != date){
		var d = new Date(date);
		if(isNaN(d)){
			continue;
		}
		previousDate = date;
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		html.push('<strong>', m_names[curr_month],' ', curr_date, '</strong>');
	}
	
	html.push('<li>', content, '</li>');	
   }

   html.push('</ol>');
   document.getElementById("birdList").innerHTML = html.join("");
 }