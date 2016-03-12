# grim-vault-6103
```
messanger for tenzor

Данный проект синхронизирован с heroku
если делаешь  push в master изменения автоматически передаются на heroku
я предлогаю делать это только teemlead-у 
остальным писать в ветки fronted и backend

github: https://github.com/messengerTeem/grim-vault-6103.git
heroku for master: http://grim-vault-6103.herokuapp.com/login/
heroku for develop: http://gory-wizard-7830.herokuapp.com/login/

###########################INIT################################

для подключения к git нужно заригестрироваться на github и прислать мне email
или добавляйтесь сами в организацию messengerTeem
когда вы подтвердите участие проект будет доступен для чтения/записи

у себя делаете 
git remote add someName https://github.com/messengerTeem/grim-vault-6103.git 
git clone someName 
(ввести пароль) 
cd grim-vault-6103 
(change something) 
git add * 
git commit -m "мой комент"
git push someName master #это добавит изменения на github и heroku
заходим на  http://grim-vault-6103.herokuapp.com/login/
############ MESSENGER ##########
на сайте http://grim-vault-6103.herokuapp.com/login/ вводите либо
login: Ivanov
Pass: 123
or 
Login: Petrov
Pass: 123
############WORK##########
html файлы лежат в grim-vault-6103/mysite/templates
обработчики ajax в grim-vault-6103/messenger/ajax.py
обработчики страниц в grim-vault-6103/messenger/view.py
БД в grim-vault-6103/messenger/models.py
#######STATIC FILES#####
для использования статических файлов поместить их в папку static/my_app
(my_app создаете свою, но обязательно в static)
затем в файле *.html пишите
{% load staticfiles %}
<img src="{% static "my_app/myexample.png" %}" alt="My image"/>
Пример смотри в login.html
```
