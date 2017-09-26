import requests
from bs4 import BeautifulSoup
import json

class parser:
    def html_parse(self, html_data):
        soup = BeautifulSoup(html_data, 'html.parser')
        #print(soup.prettify()) #prints the byte content in html format

        question_dict = {} #store info about each question
        question_list = [] #store each question object

        div_brn_stream = soup.find_all('div', class_ ="brn-stream")
        #print(len(div_brn_stream)) #length=1; because only one div is present with this class

        #finds all the article in the above div and store it into article_list
        for article in div_brn_stream:
            article_list = article.find_all('article', class_ ="task brn-stream-question")
            #print(article_list)

        #prints number of questions present in the page
        print(len(article_list))

        for article in article_list:
            #for every article the design of the div and other elements are the same
            tag_div = article.find_all('div', class_ = 'sg-content-box__title')
            #returns a list of one element, so need to access it using index 0
            tag_a = tag_div[0].find_all('a')
            #print(tag_a)
            for a in tag_a:
                #get username
                if 'profile' in a['href']:
                    #print(a['title'])
                    username = a['title']
                #get question subject
                elif 'subject' in a['href']:
                    #print(a.text.strip())
                    question_subject = a.text.strip()

            tag_div = article.find_all('div', class_ = 'sg-content-box__content')
            tag_a = tag_div[0].find_all('a')
            for a in tag_a:
                if 'question' in a['href']:
                    #get question id
                    #print(a['href'].split('/')[2])
                    question_id = a['href'].split('/')[2]
                    #get question text
                    #print(a.text.strip())
                    question_text = a.text.strip()


            #print("-----------------------------------------------------------")
            question_dict['username'] = username
            question_dict['question_subject'] = question_subject
            question_dict['question_id'] = question_id
            question_dict['question_text'] = question_text

            question_list.append(question_dict.copy()) #https://stackoverflow.com/questions/23724136/appending-a-dictionary-to-a-list-in-a-a-loop-python

        #print(json.dumps(question_list))
        return json.dumps(question_list)
