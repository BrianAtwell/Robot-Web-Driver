#!/usr/bin/env python

import json
import cgi
import cgitb; cgitb.enable()  # for troubleshooting

class Point:
    """ Point class represents and manipulates x,y coords. """

    def __init__(self):
        """ Create a new point at the origin """
        self.x = 0
        self.y = 0

#Global point pos
pos = Point()

#Get position from from
def getPosition():
	global pos
	form = cgi.FieldStorage()
	pos.x = form.getvalue('posx')
	pos.y = form.getvalue('posy')

#Check and run background process
#def checkBg():
	
	
#Print the JSON to the webpage
def printJSON():
	print "Content-Type: application/json "
	print "\n\n"
	#print "Cache-Control: no-cache, no-store, must-revalidate, max-age=3600\n\n"

	print json.dumps({'posx': pos.x, 'posy': pos.y})


getPosition()
printJSON()