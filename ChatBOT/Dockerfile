
FROM python:3.10
WORKDIR /code
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt wordnet
EXPOSE 8000
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]
