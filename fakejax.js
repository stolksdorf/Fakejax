(function( $ ){

	$.fakejax = {
		_endpoints : []
	};

	var endpointObj = function(params){
		var endpoint = {};

		endpoint.url = params.url;
		endpoint.response = params.response;
		endpoint.type = params.type;
		endpoint.delay = params.delay || 'fast';

		if(endpoint.delay === 'fast'){
			endpoint.delay = Math.floor((Math.random()*700)+500);
		}
		if(endpoint.delay === 'slow'){
			endpoint.delay = Math.floor((Math.random()*4000)+1500);
		}

		//Convert the endpoint into a regex to match on variables
		var variableNames  = [];
		variableNames = hunt(endpoint.url, '[', ']');
		var tempUrl = endpoint.url;
		for(var i =0 ; i < variableNames.length;i++){
			tempUrl = tempUrl.replace('[' + variableNames[i] + ']', '(\\w+)');
		}
		var endpointRegex = new RegExp(tempUrl + '$', 'g');

		endpoint.isMatch = function(request){
			if(request.url.search(endpointRegex) === -1){
				return false;
			}
			if(request.type !== endpoint.type && typeof endpoint.type !== 'undefined'){
				return false;
			}
			return true;
		};

		var getUrlData = function(request){
			endpointRegex.lastIndex = 0;
			var variableValues = endpointRegex.exec(request.url).slice(1);
			var result = {};
			for(var i =0 ; i < variableValues.length;i++){
				result[variableNames[i]] = variableValues[i];
			}
			return result;
		};

		endpoint.sendResponse = function(request){
			setTimeout(function(){
				var successVal = endpoint.response;
				if(typeof successVal === 'function'){
					successVal = successVal(getUrlData(request), request.data);
				}
				if(typeof request.success === 'function'){
					request.success(successVal);
				}
				if(typeof request.complete === 'function'){
					request.complete(successVal);
				}
			}, endpoint.delay);
			return endpoint;
		};
		return endpoint;
	};

	$.fakejax.add = function(params){
		$.fakejax._endpoints.push(new endpointObj(params));
	};

	$.fakejax.ajax = function(arg1, arg2) {
		var request = {};
		if(typeof arg2 !== 'undefined'){
			request = arg2;
			request.url = arg1;
		} else {
			request = arg1;
		}

		//TODO: Un-Underscore
		var foundEndpoint = _.find($.fakejax._endpoints, function(endpointObj){
			return endpointObj.isMatch(request);
		});

		if(typeof foundEndpoint !== 'undefined'){
			foundEndpoint.sendResponse(request);
			return;
		}
		if(typeof request.error === 'function'){
			request.error('Could not find endpoint');
		}
	};

	/**
	 * Takes a string and returns an array of all the substrings that exist between the two delimiters
	 * @return {[type]}        [description]
	 */
	var hunt = function(target, startDelimiter, endDelimiter){
		var i = 0;
		var result = [];
		while(1){
			var s = target.indexOf(startDelimiter, i);
			var e = target.indexOf(endDelimiter, s);
			if(s === -1 || e === -1 || e >= target.length){
				break;
			}
			result.push(target.substring(s + startDelimiter.length,e));
			i = e;
		}
		return result;
	};

})( jQuery );
