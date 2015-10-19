from django.db import models

# Create your models here.
class users(models.Model):
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    status = models.BooleanField(default=False)

class recivers(models.Model):
    user =models.OneToOneField(users)
    #models.ForeignKey(users)
    #mes=models.CharField(max_length=100)

class messages(models.Model):
    sender=models.ForeignKey(users)
    reciver=models.ForeignKey(recivers) 
    mes=models.CharField(max_length=100)    
    time=models.DateTimeField(auto_now=True)


