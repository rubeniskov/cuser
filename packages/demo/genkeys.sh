#!/usr/bin/env bash
######################
# Become a Certificate Authority
######################

# Generate private key
[ ! -f myCA.key ] && openssl genrsa -des3 -out myCA.key 2048
# Generate root certificate
[ ! -f myCA.pem ] && openssl req -x509 -new -nodes -key myCA.key -sha256 -days 825 -out myCA.pem

######################
# Create CA-signed certs
######################

NAME=localhost # Use your own domain name
# Generate a private key
[ ! -f $NAME.key ] && openssl genrsa -out $NAME.key 2048
# Create a certificate-signing request
[ ! -f $NAME.csr ] && openssl req -new -key $NAME.key -out $NAME.csr
# Create a config file for the extensions
>$NAME.ext cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $NAME # Be sure to include the domain name here because Common Name is not so commonly honoured by itself
DNS.2 = bar.$NAME # Optionally, add additional domains (I've added a subdomain here)
EOF
# Create the signed certificate
[ ! -f $NAME.crt ] && openssl x509 -req -in $NAME.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial \
-out $NAME.crt -days 825 -sha256 -extfile $NAME.ext
