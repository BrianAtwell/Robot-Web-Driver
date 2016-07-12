#!/usr/bin/env python

DCMotorLibraryFound = True
try:
	from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
except ImportError:
	from Adafruit_MotorHAT_TestDriver import Adafruit_MotorHAT, Adafruit_DCMotor
	DCMotorLibraryFound = False

import time
import atexit
import json
import cgi
import cgitb; cgitb.enable()  # for troubleshooting

MAXSPEED=255
LEFTMOTOR=3
RIGHTMOTOR=4

class Point:
    """ Point class represents and manipulates x,y coords. """

    def __init__(self):
        """ Create a new point at the origin """
        self.x = 0
        self.y = 0
		
class MotorSpeed:
	
	def _init__(self):
		self.speed = 0
		self.dir = 0

class ManageRobot:
	def __init__(self):
		#Global point pos
		self.joyPos = Point()
		# create a default object, no changes to I2C address or frequency
		self.mh = Adafruit_MotorHAT(addr=0x60)
		self.lMotor = self.mh.getMotor(LEFTMOTOR)
		self.rMotor = self.mh.getMotor(RIGHTMOTOR)
		self.leftSpd= MotorSpeed()
		self.rightSpd= MotorSpeed()

	#Get position from from
	def getPosition(self):
		form = cgi.FieldStorage()
		try:
			self.joyPos.x = float(form.getvalue('posx'))
			self.joyPos.y = float(form.getvalue('posy'))
		except TypeError:
			self.joyPos.x = 0
			self.joyPos.y = 0
		
		
	# recommended for auto-disabling motors on shutdown!
	def turnOffMotors(self):
		self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
		self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
		self.mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
		self.mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)
		
	# Converts joyPos to MotorSpeed
	def convertJoyPosToMotorSpeed(self):
		if self.joyPos.y < .1 and self.joyPos.y > -0.1:
			if self.joyPos.x > 0.1:
				#turn right with both in opposite directions
				self.leftSpd.speed=abs(self.joyPos.x)*MAXSPEED
				self.leftSpd.dir=Adafruit_MotorHAT.BACKWARD
				self.rightSpd.speed=abs(self.joyPos.x)*MAXSPEED
				self.rightSpd.dir=Adafruit_MotorHAT.FORWARD
			elif self.joyPos.x < -0.1 :
				#turn left with both in opposite directions
				self.leftSpd.speed=abs(self.joyPos.x)*MAXSPEED
				self.leftSpd.dir=Adafruit_MotorHAT.FORWARD
				self.rightSpd.speed=abs(self.joyPos.x)*MAXSPEED
				self.rightSpd.dir=Adafruit_MotorHAT.BACKWARD
			else :
				self.leftSpd.speed=0
				self.leftSpd.dir=Adafruit_MotorHAT.RELEASE
				self.rightSpd.speed=0
				self.rightSpd.dir=Adafruit_MotorHAT.RELEASE
		else :
			if self.joyPos.y > 0 :
				self.leftSpd.dir=Adafruit_MotorHAT.FORWARD
				self.rightSpd.dir=Adafruit_MotorHAT.FORWARD
				if self.joyPos.x > .1:
					self.leftSpd.speed=abs((1-self.joyPos.x)*self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs(self.joyPos.y)*MAXSPEED
				elif self.joyPos.x < -0.1:
					self.leftSpd.speed=abs(self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs((1+self.joyPos.x)*self.joyPos.y)*MAXSPEED
				else:
					self.leftSpd.speed=abs(self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs(self.joyPos.y)*MAXSPEED
			elif self.joyPos.y < 0 :
				self.leftSpd.dir=Adafruit_MotorHAT.BACKWARD
				self.rightSpd.dir=Adafruit_MotorHAT.BACKWARD
				if self.joyPos.x > .1:
					self.leftSpd.speed=abs(self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs((1-self.joyPos.x)*self.joyPos.y)*MAXSPEED
				elif self.joyPos.x < -0.1:
					self.leftSpd.speed=abs((1+self.joyPos.x)*self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs(self.joyPos.y)*MAXSPEED
				else:
					self.leftSpd.speed=abs(self.joyPos.y)*MAXSPEED
					self.rightSpd.speed=abs(self.joyPos.y)*MAXSPEED
		self.leftSpd.speed=int(self.leftSpd.speed)
		self.rightSpd.speed=int(self.rightSpd.speed)
		
	def updateMotors(self):
		self.lMotor.setSpeed(self.leftSpd.speed)
		self.lMotor.run(self.leftSpd.dir)
		self.rMotor.setSpeed(self.rightSpd.speed)
		self.rMotor.run(self.rightSpd.dir)
				
	#Print the JSON to the webpage
	def printJSON(self):
		print "Content-Type: application/json "
		print "\n\n"
		#print "Cache-Control: no-cache, no-store, must-revalidate, max-age=3600\n\n"

		print json.dumps({'posx': self.joyPos.x, 'posy': self.joyPos.y, 'lmspd': self.leftSpd.speed, 'rmspd': self.rightSpd.speed,
		'lmdir': self.leftSpd.dir, "rmdir": self.rightSpd.dir, "DCMotorLibrary": DCMotorLibraryFound})
	
	def run(self):
		self.getPosition()
		if self.joyPos.x is not None and self.joyPos.y is not None :
			self.convertJoyPosToMotorSpeed()
			self.updateMotors()
			
		self.printJSON()

if __name__ == "__main__":
	mr=ManageRobot()
	mr.run()

