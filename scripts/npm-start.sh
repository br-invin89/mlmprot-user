#!/bin/bash

cd /var/www/html/user
yarn run build
yarn cache clean
cp /var/www/html/.htaccess /var/www/html/user/build
