from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from matplotlib import pyplot as plt

# SQLAlchemy 엔진 생성
engine = create_engine("mysql+pymysql://ssafyHC:ssafy2024@127.0.0.1/esg_db")

# 세션 생성기
Session = sessionmaker(bind=engine)

# 데이터 가져오기
query = "SELECT * FROM esg_data WHERE sp_global_e_percentile IS NOT NULL"
df = pd.read_sql(query, engine)

# 데이터 준비
x = df[['sp_global_e_score']].values  # 독립 변수
y = df['sp_global_e_percentile'].values  # 종속 변수

# 회귀 모델 생성 및 학습
model = LinearRegression()
model.fit(x, y)

# 회귀 결과 출력
slope = model.coef_[0]
intercept = model.intercept_
print(f"회귀 계수 (slope): {slope}")
print(f"절편 (intercept): {intercept}")

# R^2 점수 출력 (모형의 설명력)
r_squared = model.score(x, y)
print(f"R^2 점수: {r_squared}")

'''
회귀 계수 (slope): 0.8262639868883132
절편 (intercept): 27.138792734226953
R^2 점수: 0.9068486753198876
sp_global_e_percentile = slope * sp_global_e_score + intercept
'''

y_pred = model.predict(x)

# SSE (Sum of Squared Errors): 오차제곱합
SSE = np.sum((y - y_pred) ** 2)

# MSE (Mean Squared Error): 오차 평균 제곱합 SSE/n
MSE = np.mean((y - y_pred) ** 2)

# RMSE (Root Mean Squared Error)
RMSE = np.sqrt(MSE)

# MAE (Mean Absolute Error): 평균 절대 오차
MAE = np.mean(np.abs(y - y_pred))

# Adjusted R^2 계산
n = len(y)  # 데이터 포인트의 수
p = x.shape[1]  # 독립 변수의 수
adjusted_r_squared = 1 - (1 - r_squared) * ((n - 1) / (n - p - 1))

# 잔차 분석 시각화
residuals = y - y_pred

plt.figure(figsize=(10, 5))
plt.scatter(y_pred, residuals, alpha=0.7)
plt.axhline(y=0, color='r', linestyle='--')
plt.xlabel('Predicted Values')
plt.ylabel('Residuals')
plt.title('Residual Analysis')
plt.show()

'''
평균값: 64.97058823529412
회귀 계수 (기울기): 0.8262639868883132
절편: 27.138792734226953
R^2 (결정계수): 0.9068486753198876
Adjusted R^2: 0.9039376964236341
SSE (Sum of Squared Errors): 599.663028054574
RMSE (Root Mean Squared Error): 4.19966044865035
MAE: 3.861086690840859
'''

# 예측값 계산
df['predicted_percentile'] = model.predict(x)

# 보정 점수 계산
df['adjusted_score'] = df['sp_global_e_score'] + (df['sp_global_e_percentile'] - df['predicted_percentile'])

# 결과 출력
print(df)

# 보정 점수를 데이터베이스에 업데이트
try:
    session = Session()  # 세션 시작
    for index, row in df.iterrows():
        # 업데이트 전 값을 확인하는 쿼리
        select_sql = text("""
            SELECT adjusted_score 
            FROM esg_data 
            WHERE company_name = :company_name
        """)
        result = session.execute(select_sql, {'company_name': row['company_name']})
        original_value = result.fetchone()

        if original_value is not None:
            print(f"Original value for {row['company_name']}: {original_value[0]}")  # 인덱스를 사용해 접근

        # 업데이트 실행
        update_sql = text("""
            UPDATE esg_data
            SET adjusted_score = :adjusted_score
            WHERE company_name = :company_name
        """)
        update_result = session.execute(update_sql, {
            'adjusted_score': row['adjusted_score'],
            'company_name': row['company_name']
        })

        # 업데이트 결과 확인
        print(f"Updated company: {row['company_name']}, Rows affected: {update_result.rowcount}")

        # 업데이트 후 값 확인
        result_after = session.execute(select_sql, {'company_name': row['company_name']})
        updated_value = result_after.fetchone()
        if updated_value is not None:
            print(f"Updated value for {row['company_name']}: {updated_value[0]}")  # 인덱스를 사용해 접근

    session.commit()  # 트랜잭션 커밋
except Exception as e:
    print(f"Error during database update: {e}")
    session.rollback()  # 오류가 발생하면 롤백
finally:
    session.close()  # 세션 종료
