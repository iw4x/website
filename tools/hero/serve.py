#!/usr/bin/env python3
# Serve the visibility pass page and save what it reports back.
#
#   serve.py <dir> <port> <outdir>
#
# Besides the files in <dir>, the page can post to /shot/<name> to have
# the body saved as <outdir>/<name> and to /log to have it printed. It
# posts to /done once it has finished.
#
# The point of /done is GET /wait, which blocks until it arrives. We run
# the page in headless Firefox, whose --screenshot mode exits on the load
# event. So the page includes an image from /wait, which keeps the load
# event pending until the page is done rendering.
#
import http.server, sys, os, threading, urllib.parse
root, port, shots = sys.argv[1], int(sys.argv[2]), sys.argv[3]
done = threading.Event()
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s, *a, **k): super().__init__(*a, directory=root, **k)
    def log_message(s, *a): pass
    def end_headers(s):
        s.send_header('Cache-Control', 'no-store'); super().end_headers() # Bundles change between runs.
    def do_GET(s):
        if s.path.startswith('/wait'):
            done.wait(float(os.environ.get('WAIT', '120'))); done.clear()
            s.send_response(200); s.send_header('Content-Type','image/gif'); s.end_headers()
            s.wfile.write(b'GIF89a\x01\x00\x01\x00\x00\x00\x00;'); return
        super().do_GET()
    def do_POST(s):
        n = int(s.headers.get('Content-Length', 0)); body = s.rfile.read(n)
        p = urllib.parse.urlparse(s.path).path
        if p.startswith('/shot/'):
            open(os.path.join(shots, os.path.basename(p)), 'wb').write(body)
        elif p == '/log':
            sys.stdout.write(body.decode(errors='replace') + '\n'); sys.stdout.flush()
        elif p == '/done':
            done.set()
        s.send_response(204); s.end_headers()
http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
