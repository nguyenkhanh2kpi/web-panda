from django.contrib import admin
from django.urls import path
from chatapi.views import chatbot_api,chatbot_api1
from job.views import find_related_strings,find_similar_resumes_view

urlpatterns = [
    path('chatbot/admin/', admin.site.urls),
    path('chatbot/chat', chatbot_api1), 
    path('chatbot/find-related-strings', find_related_strings, name='find_related_strings'),
    path('chatbot/find-related-resume', find_similar_resumes_view, name='find_related_resume'),
]


