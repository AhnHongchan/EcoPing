from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt

engine = create_engine("mysql+pymysql://ssafyHC:ssafy2024@127.0.0.1/esg_db")

Session = sessionmaker(bind=engine)

query = "SELECT * FROM esg_data"
df = pd.read_sql(query, engine)

a = df[['esg_environment']].values 
b = df[['esg_integration']].values
c = df[['sp_global_esg_score']].values
d = df[['sp_global_environment_adjusted_score']].values

final_score = (0.16 * a + 0.04 * b + 0.64 * c + 0.16 * d)

df['final_score'] = final_score

try:
    session = Session()
    for index, row in df.iterrows():
        update_sql = text(
            """
            UPDATE esg_data
            SET final_score = :final_score
            WHERE company_name = :company_name
            """
        )
        update_result = session.execute(update_sql, {
            'final_score': row['final_score'],  # 수정된 부분
            'company_name': row['company_name']
        })

    session.commit()
except Exception as e:  # 오류를 파악하기 위해 Exception 추가
    print(f"오류 발생: {e}")  # 오류 메시지 출력
    session.rollback()
finally:
    session.close()
