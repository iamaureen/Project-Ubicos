from .parser import parser
from rest_framework.views import APIView
from django.http import HttpResponse

# Create your views here.
class htmlParse(APIView):
    def post(self, request, format=None):
        html_data = request.data
        parsed_data = parser.html_parse(self,html_data)
        print('from views.py', parsed_data)
        return HttpResponse(parsed_data)

#user web interaction log
class userLog(APIView):
    def post(self, request, format = None):
        log_data = request.data
        print(log_data)
        return HttpResponse(log_data)
