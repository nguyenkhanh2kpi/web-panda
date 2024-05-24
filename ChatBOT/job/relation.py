from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Chuỗi cung cấp
query = "java springboot"

# Danh sách 20 chuỗi
data = [
    "springboot tutorial",
    "learn java programming",
    "java spring framework",
    "python machine learning",
    "web development with springboot",
    "java basics for beginners",
    "advanced java techniques",
    "springboot and microservices",
    "introduction to java",
    "building web apps with springboot",
    "springboot security",
    "java multithreading",
    "data structures in java",
    "springboot with docker",
    "java networking",
    "spring framework basics",
    "java design patterns",
    "springboot testing",
    "java lambda expressions",
    "springboot deployment"
]

# Tạo TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

# Kết hợp query và data để tính toán TF-IDF
all_documents = [query] + data
tfidf_matrix = vectorizer.fit_transform(all_documents)

# Tính cosine similarity giữa query và tất cả các chuỗi trong data
cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

# Lấy 4 chuỗi có độ tương đồng cao nhất
top_indices = cosine_similarities.argsort()[-4:][::-1]
top_related_strings = [data[i] for i in top_indices]

print("4 chuỗi liên quan nhất:")
for idx, string in enumerate(top_related_strings):
    print(f"{idx + 1}. {string}")
