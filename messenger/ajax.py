from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from messenger.models import *




@dajaxice_register
def updateHistory(request,activeUserName):
    '''update messages history'''
    #get user object with name activeUserName
    activeUser=users.objects.get(name=activeUserName)
    #find messages for this user
    m =messages1.objects.filter(reciver=activeUser)
    l=zip([mm.mes for mm in m],[mm.sender.name for mm in m])
    #send it back
    return simplejson.dumps({'m':l})


@dajaxice_register
def sendMessage(request,activeUserName,reciver,message):
    '''create message in dataBase
    activeUserName,reciver is a stting's'''

    status = 'done'
    activeUser=users.objects.get(name=activeUserName)
    if len(message)!=0 and len(reciver)!=0:
        try:
            #trying save a message
            reciverObject=users.objects.get(name=reciver)
            #r = recivers.objects.get(user=reciverUser)
            #create an record 
            m = messages1(sender=activeUser,reciver=reciverObject,mes=message)
            m.save()
        except users.DoesNotExist:
            print('reciver not exist')
            status='error: reciver not exist'
    return simplejson.dumps({'status':status})

@dajaxice_register
def showAllUsers(request):
    m = users.objects.filter()
    l = [mm.name for mm in m]
    #send it back
    return simplejson.dumps({'m':l})
	
	

@dajaxice_register
def mult(request,a,b):
    res=int(a)*int(b)
    return simplejson.dumps({'res':str(res)})

@dajaxice_register
def multiply(request, a, b):
    dajax = Dajax()
    result = int(a) * int(b)
    dajax.assign('#result','value',str(result))
    return dajax.json()

@dajaxice_register
def sayhello(request):
    return simplejson.dumps({'message':'Hello World'})


