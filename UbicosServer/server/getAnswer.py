from bs4 import BeautifulSoup
import json

class getAnswerBrainly:
    def extractAnswer(self, html_data):


        soup = BeautifulSoup(html_data, 'html.parser')

        question_dict = {}
        answer_dict = {} #store info about each question
        answer_list = []

        #get question related info
        for tag in soup.find_all("meta"):
            if tag.get("property", None) == "og:subject":
                question_dict['subject'] = tag.get("content", None)
            elif tag.get("property", None) == "og:author_nick":
                question_dict['question_author'] = tag.get("content", None)
            elif tag.get("property", None) == "og:author_rank":
                question_dict['author_rank'] = tag.get("content", None)

        #get the question content

        title = soup.find('h1', class_ = "sg-text sg-text--regular sg-text--headline js-question-heading")
        #print(title.text)
        question_dict['question_content'] = title.text


        # <div class = js-answers-wrapper> contains lists of answers (if any) for a particular question
        #get the div element that has answer info related div children
        div_answers_wrapper = soup.find_all('div', class_ = "js-answers-wrapper")
        print("here :: ",len(div_answers_wrapper)) #length=1; because only one div is present with this class
        #print(div_answers_wrapper)

        #get the direct children which is the answer nodes
        div_answer_list = div_answers_wrapper[0].findChildren(recursive=False)
        #print(len(answer_list))

        for answer in div_answer_list:
            author = answer.select('li a')
            #print(author[0].text.strip())
            answer_dict['answer_author'] = author[0].text.strip()

            answer_dict['answer_content'] = answer.find('div', class_ = "brn-answer__text sg-text js-answer-content").text.strip()

            answer_list.append(answer_dict.copy())



        question_dict['answers'] = answer_list

        print(json.dumps(question_dict))

        return json.dumps(question_dict)
