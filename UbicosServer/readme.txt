1) create project "UbicosServer", create app "server" and list in INSTALLED_APPS in settings.py
django-admin startproject UbicosServer
django-admin startapp server

2) created a class base view to accept html from the extension, parse it and then return data to the extension
parsing is done in parser.py file

3) created url pattern both in server/urls.py and urls.py for this post

4) did this, https://stackoverflow.com/questions/22476273/no-access-control-allow-origin-header-is-present-on-the-requested-resource-i

