var util = require('util'), _ = require('underscore'), request = require('request'), cheerio = require('cheerio'), VError = require('verror');
var Citi = (function () {
    function Citi(clientId, token, server, port, timeout) {
        this.clientId = clientId;
        this.token = token;
        this.server = server;
        this.port = port;
        this.timeout = timeout;
        //path: {corporate: string = '/corporatepayments/v1/'};
        this.path = '/corporatepayments/v1/';
        this.server = server || 'https://citimobilechallenge.anypresenceapp.com';
        this.port = port || 443;
        this.timeout = timeout || 20000;
    }
    Citi.prototype.executeRequest = function (method, action, queryString, body, callback) {
        var functionName = 'Citi.executeRequest';
        var url = this.server + ':' + this.port + this.path + action;
        var requestDesc = util.format('%s request to url %s with query string %s and body %s', method, url, JSON.stringify(queryString), JSON.stringify(body));
        if (method != 'login' && !this.token) {
            var error = new VError('%s failed %s as token is null. You need to login before calling this API', functionName, requestDesc);
            return callback(error, null);
        }
        var options = {
            url: url,
            auth: { 'bearer': this.token },
            method: method,
            qs: queryString,
            headers: { "User-Agent": "Citi Mobile Challenge Javascript API Client" },
            timeout: this.timeout,
            json: body };
        request(options, function (err, response, data) {
            var error = null; // default to no errors
            if (err) {
                error = new VError(err, '%s failed %s', functionName, requestDesc);
                error.name = err.code;
            }
            else if (response.statusCode != 200) {
                error = new VError(err, '%s failed %s, HTTP status code %s', functionName, requestDesc, response.statusCode);
                error.name = response.statusCode;
            }
            else if (!_.isObject(data)) {
                //TODO: remove this hack as request should be parsing the body of the response into a Javascript object
                // try and JSON parse it even though request should have done this
                try {
                    var json = JSON.parse(data);
                    return callback(null, json);
                }
                catch (e) {
                    error = new VError(err, '%s could not JSON parse response body from %s\nResponse body: %s', functionName, requestDesc, data);
                }
                // try and parse HTML body form response
                var $ = cheerio.load(data);
                var responseBody = $('body').text();
                if (responseBody) {
                    error = new VError(err, '%s could not parse response body from %s\nResponse body: %s', functionName, requestDesc, responseBody);
                    error.name = responseBody;
                }
                else {
                    error = new VError(err, '%s could not parse json or HTML response from %s', functionName, requestDesc);
                }
            }
            callback(error, data);
        });
    };
    Citi.prototype.login = function (username, password, callback) {
        this.executeRequest('POST', 'login', 
        // query string
        { client_id: this.clientId }, 
        // body
        {
            "username": username,
            "password": password
        }, function (err, data) {
            if (data && data.token) {
                this.token = data.token;
            }
            callback(err, this.token);
        });
    };
    Citi.prototype.getCorporateAccounts = function (callback) {
        this.executeRequest('GET', 'accounts', { client_id: this.clientId }, null, callback);
    };
    Citi.prototype.addCorporatePayment = function (callback, newPayment) {
        this.executeRequest('POST', 'payments', { client_id: this.clientId }, newPayment, callback);
    };
    Citi.prototype.getCorporatePayments = function (callback, limit, offset) {
        var queryString = { client_id: this.clientId };
        if (limit) {
            queryString.limit = limit;
        }
        if (offset) {
            queryString.offset = offset;
        }
        this.executeRequest('GET', 'payments', queryString, null, callback);
    };
    return Citi;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Citi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNpdGkudHMiXSwibmFtZXMiOlsiQ2l0aSIsIkNpdGkuY29uc3RydWN0b3IiLCJDaXRpLmV4ZWN1dGVSZXF1ZXN0IiwiQ2l0aS5sb2dpbiIsIkNpdGkuZ2V0Q29ycG9yYXRlQWNjb3VudHMiLCJDaXRpLmFkZENvcnBvcmF0ZVBheW1lbnQiLCJDaXRpLmdldENvcnBvcmF0ZVBheW1lbnRzIl0sIm1hcHBpbmdzIjoiQUFHQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQ3RCLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ3pCLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQzVCLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFL0I7SUFLSUEsY0FDV0EsUUFBZ0JBLEVBQ2hCQSxLQUFjQSxFQUNkQSxNQUFlQSxFQUNmQSxJQUFhQSxFQUNiQSxPQUFnQkE7UUFKaEJDLGFBQVFBLEdBQVJBLFFBQVFBLENBQVFBO1FBQ2hCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFTQTtRQUNkQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFTQTtRQUNmQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFTQTtRQUNiQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFTQTtRQVIzQkEsdURBQXVEQTtRQUN2REEsU0FBSUEsR0FBV0Esd0JBQXdCQSxDQUFDQTtRQVNwQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsSUFBSUEsZ0RBQWdEQSxDQUFDQTtRQUN6RUEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsSUFBSUEsR0FBR0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUVPRCw2QkFBY0EsR0FBdEJBLFVB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QUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUN4RUEsQ0FBQ0E7SUFDTE4sV0FBQ0E7QUFBREEsQ0FBQ0EsQUE1SEQsSUE0SEM7QUE1SEQ7c0JBNEhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9ub2RlLTAuMTAuZC50c1wiIC8+XG5pbXBvcnQgKiBhcyBDaXRpSW50ZXJmYWNlcyBmcm9tIFwiLi9jaXRpSW50ZXJmYWNlc1wiXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuICAgIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG4gICAgcmVxdWVzdFx0PSByZXF1aXJlKCdyZXF1ZXN0JyksXG4gICAgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKSxcbiAgICBWRXJyb3IgPSByZXF1aXJlKCd2ZXJyb3InKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2l0aVxue1xuICAgIC8vcGF0aDoge2NvcnBvcmF0ZTogc3RyaW5nID0gJy9jb3Jwb3JhdGVwYXltZW50cy92MS8nfTtcbiAgICBwYXRoOiBzdHJpbmcgPSAnL2NvcnBvcmF0ZXBheW1lbnRzL3YxLyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNsaWVudElkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyB0b2tlbj86IHN0cmluZyxcbiAgICAgICAgcHVibGljIHNlcnZlcj86IHN0cmluZyxcbiAgICAgICAgcHVibGljIHBvcnQ/OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyB0aW1lb3V0PzogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJ2h0dHBzOi8vY2l0aW1vYmlsZWNoYWxsZW5nZS5hbnlwcmVzZW5jZWFwcC5jb20nO1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0IHx8IDQ0MztcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dCB8fCAyMDAwMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWN1dGVSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBhY3Rpb246IHN0cmluZywgcXVlcnlTdHJpbmc6IGFueSwgYm9keTogYW55LCBjYWxsYmFjazogKGVycm9yOiBhbnksIGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9ICdDaXRpLmV4ZWN1dGVSZXF1ZXN0JztcblxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlciArICc6JyArIHRoaXMucG9ydCArIHRoaXMucGF0aCArIGFjdGlvbjtcblxuICAgICAgICBjb25zdCByZXF1ZXN0RGVzYyA9IHV0aWwuZm9ybWF0KCclcyByZXF1ZXN0IHRvIHVybCAlcyB3aXRoIHF1ZXJ5IHN0cmluZyAlcyBhbmQgYm9keSAlcycsXG4gICAgICAgICAgICBtZXRob2QsIHVybCwgSlNPTi5zdHJpbmdpZnkocXVlcnlTdHJpbmcpLCBKU09OLnN0cmluZ2lmeShib2R5KSApO1xuXG4gICAgICAgIGlmIChtZXRob2QgIT0gJ2xvZ2luJyAmJiAhdGhpcy50b2tlbikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVkVycm9yKCclcyBmYWlsZWQgJXMgYXMgdG9rZW4gaXMgbnVsbC4gWW91IG5lZWQgdG8gbG9naW4gYmVmb3JlIGNhbGxpbmcgdGhpcyBBUEknLCBmdW5jdGlvbk5hbWUsIHJlcXVlc3REZXNjKTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgYXV0aDogeydiZWFyZXInOiB0aGlzLnRva2VufSxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgcXM6IHF1ZXJ5U3RyaW5nLFxuICAgICAgICAgICAgaGVhZGVyczoge1wiVXNlci1BZ2VudFwiOiBcIkNpdGkgTW9iaWxlIENoYWxsZW5nZSBKYXZhc2NyaXB0IEFQSSBDbGllbnRcIn0sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgICAgICBqc29uOiBib2R5IH07XG5cbiAgICAgICAgcmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihlcnI6IGFueSwgcmVzcG9uc2U6IGFueSwgZGF0YTogYW55KVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgZXJyb3I6IEVycm9yID0gbnVsbDsgICAvLyBkZWZhdWx0IHRvIG5vIGVycm9yc1xuXG4gICAgICAgICAgICBpZihlcnIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgVkVycm9yKGVyciwgJyVzIGZhaWxlZCAlcycsIGZ1bmN0aW9uTmFtZSwgcmVxdWVzdERlc2MpO1xuICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSBlcnIuY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT0gMjAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IFZFcnJvcihlcnIsICclcyBmYWlsZWQgJXMsIEhUVFAgc3RhdHVzIGNvZGUgJXMnLCBmdW5jdGlvbk5hbWUsIHJlcXVlc3REZXNjLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICBlcnJvci5uYW1lID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHJlcXVlc3Qgd2FzIG5vdCBhYmxlIHRvIHBhcnNlIGpzb24gcmVzcG9uc2UgaW50byBhbiBvYmplY3RcbiAgICAgICAgICAgIGVsc2UgaWYgKCFfLmlzT2JqZWN0KGRhdGEpIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlbW92ZSB0aGlzIGhhY2sgYXMgcmVxdWVzdCBzaG91bGQgYmUgcGFyc2luZyB0aGUgYm9keSBvZiB0aGUgcmVzcG9uc2UgaW50byBhIEphdmFzY3JpcHQgb2JqZWN0XG4gICAgICAgICAgICAgICAgLy8gdHJ5IGFuZCBKU09OIHBhcnNlIGl0IGV2ZW4gdGhvdWdoIHJlcXVlc3Qgc2hvdWxkIGhhdmUgZG9uZSB0aGlzXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBqc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBWRXJyb3IoZXJyLCAnJXMgY291bGQgbm90IEpTT04gcGFyc2UgcmVzcG9uc2UgYm9keSBmcm9tICVzXFxuUmVzcG9uc2UgYm9keTogJXMnLCBmdW5jdGlvbk5hbWUsIHJlcXVlc3REZXNjLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB0cnkgYW5kIHBhcnNlIEhUTUwgYm9keSBmb3JtIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChkYXRhKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQm9keSA9ICQoJ2JvZHknKS50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VCb2R5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgVkVycm9yKGVyciwgJyVzIGNvdWxkIG5vdCBwYXJzZSByZXNwb25zZSBib2R5IGZyb20gJXNcXG5SZXNwb25zZSBib2R5OiAlcycsIGZ1bmN0aW9uTmFtZSwgcmVxdWVzdERlc2MsIHJlc3BvbnNlQm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSByZXNwb25zZUJvZHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IFZFcnJvcihlcnIsICclcyBjb3VsZCBub3QgcGFyc2UganNvbiBvciBIVE1MIHJlc3BvbnNlIGZyb20gJXMnLCBmdW5jdGlvbk5hbWUsIHJlcXVlc3REZXNjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgY2FsbGJhY2s6IChlcnJvcjogYW55LCB0b2tlbjogc3RyaW5nKSA9PiB2b2lkKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5leGVjdXRlUmVxdWVzdCgnUE9TVCcsICdsb2dpbicsXG4gICAgICAgICAgICAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICAgICAgIHsgY2xpZW50X2lkIDogdGhpcy5jbGllbnRJZCB9LFxuICAgICAgICAgICAgLy8gYm9keVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiIDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIsIGRhdGEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS50b2tlbikgeyB0aGlzLnRva2VuID0gZGF0YS50b2tlbjsgfVxuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCB0aGlzLnRva2VuKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENvcnBvcmF0ZUFjY291bnRzKGNhbGxiYWNrOiAoZXJyb3I6IGFueSwgYWNjb3VudHM6IFtDaXRpSW50ZXJmYWNlcy5jb3Jwb3JhdGVBY2NvdW50c10pID0+IHZvaWQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KCdHRVQnLCAnYWNjb3VudHMnLCB7IGNsaWVudF9pZCA6IHRoaXMuY2xpZW50SWQgfSwgbnVsbCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGFkZENvcnBvcmF0ZVBheW1lbnQoY2FsbGJhY2s6IChlcnJvcjogYW55LCBhZGRlZFBheW1lbnQ6IENpdGlJbnRlcmZhY2VzLmNvcnBvcmF0ZUFjY291bnRQYXltZW50KSA9PiB2b2lkLCBuZXdQYXltZW50OiBDaXRpSW50ZXJmYWNlcy5jb3Jwb3JhdGVBY2NvdW50UGF5bWVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZXhlY3V0ZVJlcXVlc3QoJ1BPU1QnLCAncGF5bWVudHMnLCB7IGNsaWVudF9pZCA6IHRoaXMuY2xpZW50SWQgfSwgbmV3UGF5bWVudCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGdldENvcnBvcmF0ZVBheW1lbnRzKGNhbGxiYWNrOiAoZXJyb3I6IGFueSwgcGF5bWVudHM6IFtDaXRpSW50ZXJmYWNlcy5jb3Jwb3JhdGVBY2NvdW50UGF5bWVudF0pID0+IHZvaWQsIGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgcXVlcnlTdHJpbmc6IGFueSA9IHsgY2xpZW50X2lkIDogdGhpcy5jbGllbnRJZCB9O1xuXG4gICAgICAgIGlmIChsaW1pdCkgeyBxdWVyeVN0cmluZy5saW1pdCA9IGxpbWl0OyB9XG4gICAgICAgIGlmIChvZmZzZXQpIHsgcXVlcnlTdHJpbmcub2Zmc2V0ID0gb2Zmc2V0OyB9XG5cbiAgICAgICAgdGhpcy5leGVjdXRlUmVxdWVzdCgnR0VUJywgJ3BheW1lbnRzJywgcXVlcnlTdHJpbmcsIG51bGwsIGNhbGxiYWNrKTtcbiAgICB9XG59Il19