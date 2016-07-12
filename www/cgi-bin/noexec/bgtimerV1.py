#!/usr/bin/env python

from socket import *
import thread
import time
 
BUFF = 1024
HOST = '127.0.0.1'# must be input parameter @TODO
PORT = 10000 # must be input parameter @TODO
MAXSPLIT = 50

def gen_response():
    return 'this_is_the_return_from_the_server'
	
def 
 
def handler(clientsock,addr):
	attrib=['posx':None, 'posy':None]
    while 1:
        data = clientsock.recv(BUFF)
        print 'data:' + repr(data)
        if not data: break
		pairList=data.split(',',MAXSPLIT)
		for pair in pairList:
			items=pair.split(':')
			numItems=len(items)
			if numItems == 2:
				items[0]=strip(item[0])
				items[1]=strip(items[1])
        clientsock.send(gen_response())
        print 'sent:' + repr(gen_response())
        clientsock.close()
 
if __name__=='__main__':
    ADDR = (HOST, PORT)
    serversock = socket(AF_INET, SOCK_STREAM)
    serversock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    serversock.bind(ADDR)
    serversock.listen(5)
    while 1:
        print 'waiting for connection...'
        clientsock, addr = serversock.accept()
        print '...connected from:', addr
        thread.start_new_thread(handler, (clientsock, addr))