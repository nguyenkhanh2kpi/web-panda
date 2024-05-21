from django.contrib import admin
from django.urls import path
from chatapi.views import chatbot_api,chatbot_api1

urlpatterns = [
    path('chatbot/admin/', admin.site.urls),
    path('chatbot/chat', chatbot_api1), 
]


