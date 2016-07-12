#!/usr/bin/python

import cgitb
cgitb.enable(display=0, logdir="/mnt/tank/log/error.log")

form = cgi.FieldStorage()

if "posx" not in form or "posy" not in form:
	print "HTTP/1.1 400 Bad Request\r\n"
    print "<H1>Error</H1>"
    print "Please supply 'posx' and 'posy' variables."
    return
	
print "Success! posx: <span id='spanposx'>"+form["posy"].value+"</span> posy: <span id='spanposy'>"+form["posy"].value+"</span>"