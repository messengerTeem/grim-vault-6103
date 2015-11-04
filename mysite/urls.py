from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.views import login, logout
#06.10.2015
from dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:


    #url(r'^login/$', login,name='reg',{'template_name':'login.html'}),
    #url(r'^logout/$', logout,{'next_page':'login.html'}),
    #url(r'^logout/reg', login,{'template_name':'login.html'}),
    #url(r'^myTest', 'messenger.views.test'),
    
    #url(r'^logout/$', 'messenger.views.login',name='login'),
    url(r'^login/$', 'messenger.views.login'),
    url(r'^profile/$', 'messenger.views.checkMess'),
    #06.10.2015
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
    url(r'^test/$', 'messenger.views.test'),
    #url(r'^testList/$', 'messenger.views.testList'),
    #url(r'^$', include('mysite.cesar.urls')),
)
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += staticfiles_urlpatterns()