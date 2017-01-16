import SimpleHTTPServer
import SocketServer
from SocketServer import ThreadingMixIn

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

class ThreadedHTTPServer(ThreadingMixIn, SimpleHTTPServer):
    """Handle requests in a separate thread."""

if __name__ == '__main__':
    server = ThreadedHTTPServer(('localhost', 8000), Handler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever()
