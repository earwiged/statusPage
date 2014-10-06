

   if(typeof jQuery == 'undefined'){
        var oScriptElem = document.createElement('script');
        oScriptElem.type = "text/javascript";
        oScriptElem.src = "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
        document.body.insertBefore(oScriptElem, document.body.firstChild);
    }
	
	// Only do anything if jQuery isn't defined
if (typeof jQuery == 'undefined') {

	if (typeof $ == 'function') {
		// warning, global var
		thisPageUsingOtherJSLibrary = true;
	}
	
	function getScript(url, success) {
	
		var script     = document.createElement('script');
		     script.src = url;
		
		var head = document.getElementsByTagName('head')[0],
		done = false;
		
		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function() {
		
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			
			done = true;
				
				// callback function provided as param
				success();
				
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
				
			};
		
		};
		
		head.appendChild(script);
	
	};
	
	getScript('//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {
	
		if (typeof jQuery=='undefined') {
			console.log("Error, Stil can't define");	
		} else {
			// jQuery loaded! Make sure to use .noConflict just in case
			Show();
		}
	});
} else { // jQuery was already loaded
	Show();
};

function Show() { 
	
		var Powered = ''; 	

		
	jQuery('.StatusCake').append('<table width="100%" id="StatusTable"><thead id="StatusHeader"><tr id="StatusHeaderRow"><th>Status</th><th>Name</th><th></th></tr></thead></table>'); 
	jQuery('.StatusCake').append('<span id="DataTableSpan"></span>'); 


	jQuery.getJSON('https://www.statuscake.com/App/Workfloor/PublicReportHandler.php?PublicID=' + PublicID + '&callback=?', function(data) {

		jQuery.each(data.Dates, function(key, val) {
						jQuery('#StatusHeaderRow').append('<th class="AlignCentre">' + val + '</th>');
		}); 



	}); 

	
}

	function LoadData(TestID,Name) { 
		jQuery.getJSON("https://www.statuscake.com/App/Workfloor/GroupData.php?callback=?&VID=" + TestID,function(data) {
			
		jQuery('#DataTableSpan').html('<span class="title"><div class="text">' + Name +'</div></span><table width="100%" id="DataTable"><thead id="StatusHeader"><tr id="StatusHeaderRow"><th>Status</th><th>From</th><th>To</th><th>Period</th></tr></thead></table>'); 
			
			jQuery.each(data['Periods'], function(key, val) {
				
							
				// What Style To Use
				if (val['Status'] == "Up") { 
					var color = "StatusGreen"; 
				} else { 
					var color = "StatusRed"; 
				}
				
				jQuery('#DataTable').append("<tr>" + 
								 "<td class='"+color+"'>" + val['Status'] + "</td>" + 
								 "<td>" + val['Start'] + "</td>" + 
								 "<td>" + val['End'] + "</td>" + 
								 "<td>" + val['Period'] + "</td>" + 
								 "</tr>"); 
			}); 
		});
	}