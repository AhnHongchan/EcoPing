from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware 
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Mecab
import re
import os
from collections import Counter
from fastapi.responses import JSONResponse

app = FastAPI(root_path="/py/")

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
        manufacturers = df['제조사/유통사'].fillna('').tolist()  # 제조사/유통사 열 추가
        preprocessed_names = [preprocess(name) for name in product_names]
        return product_names, manufacturers, preprocessed_names  # 제조사/유통사도 반환
    except FileNotFoundError:
        print(f"Error: The file {DATA_FILE} was not found.")
        return [], [], []
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        return [], [], []

# TF-IDF 벡터화 함수
def vectorize_data(preprocessed_names):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(preprocessed_names)
    return vectorizer, tfidf_matrix

# 전역 변수로 데이터와 모델 저장
product_names, manufacturers, preprocessed_names = load_and_preprocess_data()
vectorizer, tfidf_matrix = vectorize_data(preprocessed_names)

# 제품 목록에 대한 입력 데이터 구조
class ProductItem(BaseModel):
    name: str
    price: float
    quantity: int

# 가장 빈도가 높은 최대 3개의 제품명을 찾는 함수
def find_top_frequent_products(product_items):
    product_names = [item.name for item in product_items]
    most_common_products = Counter(product_names).most_common(3)  # 최대 3개의 빈도수 높은 제품명 반환
    return [product[0] for product in most_common_products]  # 제품명만 추출

# 유사한 제품을 찾는 함수
def find_similar_products(query: str):
    preprocessed_query = preprocess(query)
    query_vec = vectorizer.transform([preprocessed_query])
    cosine_similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    max_similarity_index = cosine_similarities.argmax()
    max_similarity = cosine_similarities[max_similarity_index]
    
    if max_similarity >= 0.3:
        return product_names[max_similarity_index], manufacturers[max_similarity_index], max_similarity  # 제조사/유통사 추가
    else:
        return None, None, max_similarity

@app.post("/find_similar_products")
async def api_find_similar_products(products: list[ProductItem]):
    try:
        # 가장 빈도가 높은 최대 3개의 제품명을 찾음
        top_frequent_products = find_top_frequent_products(products)
        
        if top_frequent_products:
            similar_products = []
            for product_name in top_frequent_products:
                # 각 제품명에 대해 유사한 제품 찾기
                similar_product, manufacturer, similarity = find_similar_products(product_name)
                
                if similar_product:
                    similar_products.append({
                        "query": product_name,
                        "similar_product": similar_product,
                        "manufacturer": manufacturer,  # 제조사/유통사 포함
                        "similarity": similarity  # 유사도 추가
                    })
            
            if similar_products:
                return JSONResponse(
                    content={
                        "similar_products": similar_products
                    },
                    status_code=200
                )
            else:
                return JSONResponse(
                    content={
                        "error": "유사한 제품을 찾지 못했습니다."
                    },
                    status_code=404
                )
        else:
            return JSONResponse(
                content={
                    "error": "제품명이 충분하지 않습니다."
                },
                status_code=400
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"서버 오류: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
