# textmine.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware 
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Mecab
import re
import os

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 주소 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# Mecab 객체 생성
mecab = Mecab()

# 파일 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data.xlsx")

# 전처리 함수
def preprocess(text):
    # 특수 문자 제거
    text = re.sub(r'[^\w\s]', '', text)
    # 형태소 분석 및 명사 추출
    nouns = mecab.nouns(text)
    return ' '.join(nouns)

# 데이터 로드 및 전처리 함수
def load_and_preprocess_data():
    try:
        df = pd.read_excel(DATA_FILE)
        product_names = df['제품명'].fillna('').tolist()
        preprocessed_names = [preprocess(name) for name in product_names]
        return product_names, preprocessed_names
    except FileNotFoundError:
        print(f"Error: The file {DATA_FILE} was not found.")
        return [], []
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        return [], []

# TF-IDF 벡터화 함수
def vectorize_data(preprocessed_names):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(preprocessed_names)
    return vectorizer, tfidf_matrix

# 전역 변수로 데이터와 모델 저장
product_names, preprocessed_names = load_and_preprocess_data()
vectorizer, tfidf_matrix = vectorize_data(preprocessed_names)

class Query(BaseModel):
    text: str

def find_similar_products(query: str):
    preprocessed_query = preprocess(query)
    query_vec = vectorizer.transform([preprocessed_query])
    cosine_similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    max_similarity_index = cosine_similarities.argmax()
    max_similarity = cosine_similarities[max_similarity_index]
    
    if max_similarity >= 0.3:
        return product_names[max_similarity_index], max_similarity
    else:
        return None, max_similarity

@app.post("/find_similar_products")
async def api_find_similar_products(query: Query):
    try:
        similar_product, similarity = find_similar_products(query.text)
        if similar_product:
            return {"query": query.text, "similar_product": similar_product}
        else:
            return {"query": query.text, "result": "해당하는 제품을 못찾았습니다."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)