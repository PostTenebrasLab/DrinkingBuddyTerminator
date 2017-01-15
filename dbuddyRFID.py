# need https://github.com/svvitale/nxppy
# install with : sudo pip install nxppy or sudo pip3 install nxppy

import nxppy
import time
import webbrowser

server_url = ''

mifare = nxppy.Mifare()

# Print card UIDs as they are detected
while True:
    try:
        uid = mifare.select()
        print(uid)
    except nxppy.SelectError:
        # SelectError is raised if no card is in the field.
        pass
    
    webbrowser.open('http://www.google.com')
    # webbrowser.open(server_url + '?login=' + str(uid))
    time.sleep(5)

