Parse stdin as [W3C extended log file format](http://www.w3.org/TR/WD-logfile.html) and print out json lines.

* Url decode each field value
* The field `cs-uri-query` is turned into it's own nested json object
* Include the preceding log file directives in every entry (because we can)
* Include a `raw` field with the original log line (also because we can)

This is obviously excessively verbose, but will compress well.

Combine with a tool like [jq](http://stedolan.github.io/jq/) to make it very easy to query your logs.

Example usage:

    npm install 
    cat sample-input.txt | node parse-extended-log-file.js | jq '.'

Output:

    {
      "date": "2014-05-23",
      "time": "01:13:12",
      "x-edge-location": "LAX1",
      "sc-bytes": "2390282",
      "c-ip": "192.0.2.202",
      "cs-method": "GET",
      "cs(Host)": "d111111abcdef8.cloudfront.net",
      "cs-uri-stem": "/soundtrack/happy.mp3",
      "sc-status": "304",
      "cs(Referer)": "www.unknownsingers.com",
      "cs(User-Agent)": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
      "cs-uri-query": {
        "a": "b",
        "c": "d"
      },
      "cs(Cookie)": "zip=50158",
      "x-edge-result-type": "Hit",
      "x-edge-request-id": "xGN7KWpVEmB9Dp7ctcVFQC4E-nrcOcEKS3QyAez--06dV7TEXAMPLE==",
      "x-host-header": "d111111abcdef8.cloudfront.net",
      "cs-protocol": "http",
      "cs-bytes": "-",
      "time-taken": "0.002",
      "raw": "2014-05-23 01:13:12 LAX1 2390282 192.0.2.202 GET d111111abcdef8.cloudfront.net /soundtrack/happy.mp3 304 www.unknownsingers.com Mozilla/4.0%20(compatible;%20MSIE%207.0;%20Windows%20NT%205.1) a=b&c=d zip=50158 Hit xGN7KWpVEmB9Dp7ctcVFQC4E-nrcOcEKS3QyAez--06dV7TEXAMPLE== d111111abcdef8.cloudfront.net http - 0.002",
      "directives": {
        "Version": "1.0",
        "Fields": "date time x-edge-location sc-bytes c-ip cs-method cs(Host) cs-uri-stem sc-status cs(Referer) cs(User-Agent) cs-uri-query cs(Cookie) x-edge-result-type x-edge-request-id x-host-header cs-protocol cs-bytes time-taken"
      }
    }