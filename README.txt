To run composer on ddev with craft you must add the --working-dir flag:

ddev composer install --working-dir=/var/www/html/craft

OR, access the DDEV web layer with 

ddev ssh
cd craft
composer install

To run Craft commands you must log in to the web layer first:

ddev ssh
cd craft
php craft clear-caches/all