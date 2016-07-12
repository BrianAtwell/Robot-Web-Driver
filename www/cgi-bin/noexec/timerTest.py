#!/usr/bin/env python

"""
An echo server that uses threads to handle multiple clients at a time.
Entering any line of input at the terminal will exit the server.
"""

import select
import socket
import sys
import threading

DELAY=5

class TimeThread(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
		self.curTime=0
		self.oldTime=1

	def run(self):
		exit_flag = threading.Event()
		while not exit_flag.wait(timeout=DELAY):
			print "Timer reached: "
			if self.curTime != self.oldTime:
				self.oldTime=self.curTime
				#Set motors to zero
				print "motor zero"
	
	def resetTimer(self):
		self.curTime+=1
		self.curTime=self.curTime%2
		Thread.currentThread().interrupt();
		
	def clearTimer(self):
		self.curTime=self.oldTime
		Thread.currentThread().interrupt();


if __name__ == "__main__":
	t = TimeThread()
	t.start() 
	exit_flag = threading.Event()
	while not exit_flag.wait(timeout=2):
		t.resetTimer()
	t.wait()