"use strict";

const PHP = true;

function sendRequest(method, url, parameters = {}) {
	let contentType;
	if(method.toUpperCase() == "GET" || PHP){	
		contentType = "application/x-www-form-urlencoded;charset=utf-8";
	}
	else{
		contentType = "application/json; charset=utf-8"
        parameters = JSON.stringify(parameters);
	}
    return $.ajax({
        "url": url,
		"data": parameters,
		"type": method,
		"contentType": contentType, 
        "dataType": "json",
        "timeout": 5000
    });
}

function error(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Data format not correct: " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}