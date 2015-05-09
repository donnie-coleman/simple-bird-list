var listBirds = function(root) {
   	var DATE_COL = 1;
	var BIRD_COL = 2;
	var LOC_COL = 3;
	var LIFE_COL = 6;
	var TITLE_ROW = 1;
   	var m_names = [ "January", "February", "March", 
				   "April", "May", "June", "July", "August", "September", 
				   "October", "November", "December"];
				
   	var feed = root.feed;
   	var entries = feed.entry || [];
	var length = entries.length;

   	var html = ['<ol reversed=\"reversed\">'];
    var liferRow;
    var previousDate;

   for (var i = length-1; i >= 0; i--) {
    	var entry = entries[i];
	    var column = entry.gs$cell.col;
		var row = entry.gs$cell.row;
		var content = entry.content.$t;

		if(column == LIFE_COL && (content == 'lifeBird' || content == 'lifebird' || content == 'lifer' || content == 'life bird')){
			liferRow = row;
		}

		if(column != BIRD_COL || row == TITLE_ROW) {
			continue;
		}

		var dateEntry = entries[i-1]
		var hasDateColumn = (dateEntry && dateEntry.gs$cell.col == DATE_COL)

		if(hasDateColumn){
			var date = dateEntry.content.$t;
			if(previousDate != date){
				var d = new Date(date);
				if(!isNaN(d)){
					var curr_date = d.getDate();
					var curr_month = d.getMonth();
					html.push('<strong>', m_names[curr_month],' ', curr_date, '</strong>');
				}

				previousDate = date;
			}
		}
		if(row == liferRow){
			content = content+"!";
		}
		html.push('<li>', content, '</li>');	
   }

   html.push('</ol>');
   document.getElementById("birdList").innerHTML = html.join("");
}