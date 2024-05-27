from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .chatbot_vi import chatbot_response, chatbot_response_with_tag
from django.http import HttpResponse

@csrf_exempt
def chatbot_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data['message']
        response = chatbot_response(message)
        return JsonResponse({'response': response})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})

@csrf_exempt
def chatbot_api1(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data['message']
        response = chatbot_response_with_tag(message)
        return JsonResponse({'response': response})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})

