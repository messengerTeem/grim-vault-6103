from django.shortcuts import render
from messenger.models import users,messages1
from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.datastructures import MultiValueDictKeyError
# Create your views here.
def logout(request):
    auth.logout(request)
    return render(request,"login.html",{'test':"login again?"})

def registr(request):
    '''This function get username, password, email and create
    entry in django inner table User and in messenger table users
    (latest use for changing message's purpose)
    variabel text used for error messenge's
    '''
    text="" #for error messanges
    if request.method=='POST':
        #for buttom at login.html 
        try:
            request.POST['email']
        except (MultiValueDictKeyError):
            return render(request,'registration.html',{'text':text})
        userName = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        if userName=="" or password=="" or email=="":
            text = "fild's cannot be empty!"
            return render(request,'registration.html',{'text':text})
        try:
            #if user alredy exist
            User.objects.get(username=userName)
            text="user alredy exist!"
        except (User.DoesNotExist):
            #if user alredy have acaunt we logout it
            #it return no error's in other case's
            auth.logout(request)

            #next line's for sync messenger.models and django.contrib.auth.models user's database's
            # in other word's: we create entry in both table's
            #create user in messenger database
            try:
                #for Ivanov and Petrov only (it check if user's exist in messenger database and create it if not)
                users.objects.get(name=userName)
            except (users.DoesNotExist):
                user1=users(name=userName)
                user1.save()

            #create user in django database
            user = User.objects.create_user(username=userName,password=password,email=email)
            user.save()            
           
            #login new user (who we created at line before)
            user2 = auth.authenticate(username=userName,password=password)
            if (user2 is not None) and user2.is_active:
                auth.login(request,user2)
                #and send him in messenger.html
                return render(request,'messenger.html',{'activeUserName':userName})
            else:
                text = "are you bot?"

    #in any other case        
    return render(request,'registration.html',{'text':text})

def checkMess(request):
    #if not request.user.is_authenticated():
    activeUser=users.objects.get(name=request.POST['activeUserName'])
    if(activeUser==None):
        print('User is NULL')
        return render(request,'login.html',{'text':'repeat authorization'})
    print("activeUser.name=")    
    print(activeUser.name)
    reciverUserName=request.POST['user']
    message=request.POST['message']
    print(message)
    if len(message)!=0 and len(reciverUserName)!=0:
        try:
            reciver=users.objects.get(name=reciverUserName)
            m = messages1(sender=activeUser,reciver=reciver,mes=message)
            m.save()
        except users.DoesNotExist:
            print('reciver not exist')
        
    m=messages1.objects.filter(reciver=activeUser)
    return render(request,'profile.html',{'mess':m,'activeUserName':activeUser.name})
 
def login(request):
    '''This function check if user exist in django database and remember his cookies
    (I hope so).
    variable text for eror's messenge's 
    '''
    text=''
    if request.method=='POST':
        userName = request.POST['username']
        password = request.POST['password']
        print("userName=%s"%userName)
        print("password=%s"%password)
        #if user alredy have acaunt we logout it
        #it return no error's in other case's
        auth.logout(request)
        
        #check if user exist
        user=auth.authenticate(username=userName,password=password)
        if (user is not None): 
            if user.is_active:
                auth.login(request,user)
                return render(request,'messenger.html',{'activeUserName':userName})
            else:
                text="user.is_actinv=False"
        else:
            text="user is None"

    return render(request,'login.html',{'text':text})
            
            
