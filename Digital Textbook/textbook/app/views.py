from django.http import HttpResponse, Http404
import os


#in the browser: http://127.0.0.1:8000/app/
def index(request):
    return HttpResponse("Working Successfully")

def uploadImage(request):
    #get image from html and save it in the database
    if request.method == "POST":
        # print (request.Files) #gives the name of the <input type='file' name...>
        handle_uploaded_file(request.FILES['gallery_img'], str(request.FILES['gallery_img']))
        return HttpResponse('Success')


def handle_uploaded_file(file, filename):
    if not os.path.exists('upload/'):
        os.mkdir('upload/')

    with open('upload/' + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


