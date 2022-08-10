import pandas as pd
import pyarrow.parquet as pq
import pyarrow as pa
import json
import os

file_path = '../user.parquet'

test = {"user":"cisco","password":"ciscocisco"}

df = pd.json_normalize(test, max_level=0)
if os.stat(file_path).st_size == 0:
    df.to_parquet(file_path)
else:
    df2 = pd.read_parquet(file_path)
    df3 = pd.concat([df2, df])
    df3.to_parquet(file_path)

print(pd.read_parquet(file_path))