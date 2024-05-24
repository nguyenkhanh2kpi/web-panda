from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# @csrf_exempt
# def find_related_strings(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body.decode('utf-8'))
#             query = data['query']
#             data_items = data['data']
#             names = [item['name'] for item in data_items]
#             vectorizer = TfidfVectorizer()
#             all_documents = [query] + names
#             tfidf_matrix = vectorizer.fit_transform(all_documents)
#             cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
#             top_indices = cosine_similarities.argsort()[-4:][::-1]
#             top_related_items = [data_items[i] for i in top_indices]

#             return JsonResponse(top_related_items, safe=False)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)
#     else:
#         return JsonResponse({'error': 'Invalid request method.'}, status=405)
@csrf_exempt
def find_related_strings(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            query = data['query']
            data_items = data['data']
            names = [item['name'] for item in data_items]
            vectorizer = TfidfVectorizer()
            all_documents = [query] + names
            tfidf_matrix = vectorizer.fit_transform(all_documents)
            cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

            # Sắp xếp các chỉ số của danh sách dựa trên độ tương đồng từ cao đến thấp
            sorted_indices = cosine_similarities.argsort()[::-1]

            # Sắp xếp danh sách các mục dựa trên thứ tự đã sắp xếp
            sorted_related_items = [data_items[i] for i in sorted_indices]

            return JsonResponse(sorted_related_items, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
    
@csrf_exempt
def find_similar_resumes_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            query = data['query']
            resumes = data['resumes']
            
            similar_resumes_by_city = resumes
            similar_resumes_by_school = resumes
            similar_resumes_by_major = resumes
            similar_resumes_by_application_position = resumes
            
            if 'city' in query and query['city'] != '':
                similar_resumes_by_city = find_similar_resumes(query, resumes,'city',0.6)
            
            if 'school' in query and query['school'] != '':
                similar_resumes_by_school = find_similar_resumes(query, resumes,'school',0.3)
                
            if 'major' in query and query['major'] != '':
                similar_resumes_by_major = find_similar_resumes(query, resumes,'major',0.3)
                
            if 'applicationPosition' in query and query['applicationPosition'] != '':
                similar_resumes_by_application_position = find_similar_resumes(query, resumes,'applicationPosition',0.05)
            
     
            common_resumes = [resume for resume in similar_resumes_by_city if resume in similar_resumes_by_school and resume in similar_resumes_by_major and resume in similar_resumes_by_application_position]
            
            return JsonResponse(common_resumes, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)



def find_similar_resumes(query, resumes, fields, threshold):
    query_position = query[fields].lower()
    all_positions = [resume[fields].lower() for resume in resumes]
    all_positions.append(query_position)  
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_positions)
    cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    similar_indices = [i for i, sim in enumerate(cosine_similarities) if sim > threshold]
    similar_resumes = [resumes[i] for i in similar_indices]
    return similar_resumes



