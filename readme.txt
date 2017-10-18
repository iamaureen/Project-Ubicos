1. git clone https://github.com/iamaureen/Project-Ubicos.git

2.a. Install python 3.6
link: https://www.python.org/downloads/release/python-360/

2.b. Install django
link: https://overiq.com/django/1.10/creating-django-project/

2.c. Install rest framework using this
pip install djangorestframework

2.d. Install pip install django-cors-headers (for this project)

3. open cmd, and go to the folder where "UbicosServer" is 
4. enter command python manage.py runserver
<server should start running>

5. install the extension in chrome
link: https://stackoverflow.com/questions/24577024/install-chrome-extension-not-in-the-store

6.In the chrome extension page, there is a option Inpect Views:background page (inactive) -click it
a console will open (this is different from regular browser console)

7. Open brainly.com in the browser, click on the broswer extension 
(server is running from step 5)
(refresh the browser if you don't see any output, then click on the extension again)

8. you should see a json with the information: username, question subj, question id and question
 text

9. copy the response and paste it in https://jsonlint.com/ to view nicely

