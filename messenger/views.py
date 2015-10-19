from django.shortcuts import render
#from django.shortcuts import render
from messenger.models import users,recivers,messages
 
# Create your views here.
#def testList(request):
#    return render(request,'messenger.html')

def test(request):
    return render(request,'ajax.html')

#def test(request):
#    return render(request,'loginFail.html',{'next':request.path})

def checkMess(request):
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
            reciverUser=users.objects.get(name=reciverUserName)
            r = recivers.objects.get(user=reciverUser)
            m = messages(sender=activeUser,reciver=r,mes=message)
            m.save()
        except users.DoesNotExist:
            print('reciver not exist')
        
    m=messages.objects.filter(reciver=recivers.objects.get(user=activeUser))
    return render(request,'profile.html',{'mess':m,'activeUserName':activeUser.name})
    
def login(request):
    text='authorization'
    if request.method=='POST':
        try:
            user=users.objects.get(name=request.POST['username'])
            if user.password==request.POST['password']:
                user.status=True
                user.save()
                print('status is:')
                print(users.objects.get(name=request.POST['username']).status)
                return render(request,'messenger.html',{'activeUserName':user.name})
            else:
                text='Password incorect. Try again'
                print(text)
        except users.DoesNotExist:
            text='user not exist. Try again'
            print(text)
    return render(request,'login.html',{'text':text})
            
            
