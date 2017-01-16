import SimpleHTTPServer
import SocketServer
from SocketServer import ThreadingMixIn

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

class ThreadedHTTPServer(ThreadingMixIn, SimpleHTTPServer):
    """Handle requests in a separate thread."""

httpd = SocketServer.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()

