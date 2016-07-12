import socket
import time
import sys

lastUpdateTime=0
isUpdated=0
BUFF = 1024
HOST = '127.0.0.1'# must be input parameter @TODO
PORT=10000

attrib = ['posx':None, 'posy':None]

#Process data from the network
# return 1 if "new" data was processed
# return 0 if no data was processed
def processData(data):
	global attrib
	hasAttrib=0
	
	pairList=data.split(',')
	for pair in pairList:
		items=pair.split(':')
		numItems=len(items)
		if numItems == 2:
			items[0]=strip(item[0])
			items[1]=strip(items[1])
			if items[0] == 'posx':
				attrib['posx']=float(items[1])
				hasAttrib=1
			if items[0] == 'posy':
				attrib['posy']=float(items[1])
				hasAttrib=1
	return hasAttrib
	

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = (HOST, PORT)
print >>sys.stderr, 'starting up on %s port %s' % server_address
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

while True:
    # Wait for a connection
    print >>sys.stderr, 'waiting for a connection'
    connection, client_address = sock.accept()
	
	try:
        print >>sys.stderr, 'connection from', client_address

        # Receive the data in small chunks and retransmit it
        while True:
            data = connection.recv(BUFF)
            print >>sys.stderr, 'received "%s"' % data
            if data:
                print >>sys.stderr, 'sending data back to the client'
				hasData=processData(data)
				replyData="STATUS:NODATA"
				if hasData == 1:
					replyData="STATUS:SUCCESS"
                connection.sendall(replyData)
            else:
                print >>sys.stderr, 'no more data from', client_address
                break
            
    finally:
        # Clean up the connection
        connection.close()