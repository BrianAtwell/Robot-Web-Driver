#!/usr/bin/env python

import cgi
import cgitb; cgitb.enable()  # for troubleshooting

form = cgi.FieldStorage()

posx = form.getvalue('posx')
posy = form.getvalue('posy')

print "Content-type: text/html\n\n"
print "<html>\n"
print "<body>\n"
print "<div style=\"width: 100%; font-size: 40px; font-weight: bold; text-align: center;\">"
print "Python Script Test Page"
print "</div>\n"

print "Success! posx: <span id='spanposx'>%s</span> posy: <span id='spanposy'>%s</span>" % (posx, posy)

print "</body>\n</html>"
