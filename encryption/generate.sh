#!/bin/sh
# give permissions with 'chmod +x generate.sh'
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
