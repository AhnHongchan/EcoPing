import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt


df = pd.read_csv('esg_rank.csv')

# 독립 변수와 종속 변수 설정 (예: X와 Y로 가정)
X = df[['sp_global_e_score']].values  # 독립 변수
y = df['sp_global_e_percentile'].values  # 종속 변수

# scikit-learn으로 회귀 분석
model = LinearRegression()
model.fit(X, y)

# 회귀 분석 결과
slope = model.coef_[0]
intercept = model.intercept_
r_squared = model.score(X, y)
y_pred = model.predict(X)

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
p = X.shape[1]  # 독립 변수의 수
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

print(f'평균값: {np.mean(X)}')
print(f'회귀 계수 (기울기): {slope}')
print(f'절편: {intercept}')
print(f'R^2 (결정계수): {r_squared}')
print(f'Adjusted R^2: {adjusted_r_squared}')
print(f'SSE (Sum of Squared Errors): {SSE}')
print(f'RMSE (Root Mean Squared Error): {RMSE}')
print(f'MAE: {MAE}')

'''
Adjusted 𝑅^2 : 0.7 이상이면 상당히 좋은 모델로 간주되며, 값이 1에 가까울수록 좋습니다. 그러나 이 값은 종속 변수와 독립 변수 간의 관계가 얼마나 강한지에 따라 크게 달라집니다.
RMSE: 작을수록 좋습니다. 하지만 이 값은 데이터의 실제 단위와 크기에 따라 해석됩니다. 절대적인 숫자보다, 다른 모델의 RMSE와 비교하거나 실제 데이터 값의 크기와 비교하여 상대적으로 평가해야 합니다.
MAE: RMSE와 비슷하게, 작을수록 좋습니다. 이상치에 덜 민감하므로 RMSE와 함께 비교하여 오차의 일반적인 크기를 파악합니다.
잔차 분석: 잔차가 랜덤하게 분포하고 정규성을 가진다면, 모델이 데이터를 적절하게 설명하고 있다는 것을 나타냅니다. 특정 패턴이나 경향이 나타나지 않는 것이 이상적입니다.
'''