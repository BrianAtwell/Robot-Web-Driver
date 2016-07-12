#!/usr/bin/env python
import os

def getBaseDirectory():
	return os.path.dirname(os.path.realpath(__file__))

def getDirectoryList(curDir, rmDir):
	for dirname, dirnames, filenames in os.walk(curDir):
		# print path to all subdirectories first.
		for subdirname in dirnames:
			print(os.path.join(dirname, subdirname))

		# print path to all filenames.
		for filename in filenames:
			print "<li>"
			curDir=os.path.join(dirname, filename)
			if rmDir and curDir.find(rmDir) == 0 :
				curLink=curDir[len(rmDir):]
				print "<a href=\"/"
				print curLink
				print "\">"
				print curLink
				print "</a>\n"
			else :
				print curDir
			print "</li>\n"

		# Advanced usage:
		# editing the 'dirnames' list will stop os.walk() from recursing into there.
		if '.git' in dirnames:
			# don't go into any .git directories.
			dirnames.remove('.git')

cgiDir=getBaseDirectory()
baseDir = cgiDir[:cgiDir.find("cgi-bin")]

print "Content-type: text/html\n\n"
print "<html>\n"
print "<title>Home of Script</title>"

print "<body>"
print "<div style=\"width: 100%; font-size: 40px; font-weight: bold; text-align: center;\">"
print "Home of Script"
print "</div>\n"

print "<div>Directory:<span class=\"directory\">"
print baseDir
print "</span></div>\n"

print "<div class=\"dirlist\">\n"

print "<ul>\n"

getDirectoryList(cgiDir, baseDir)

getDirectoryList(baseDir+"/html/", baseDir+"/html/")

print "</ul>\n"


print "</div>\n"


print "</body>\n</html>"
