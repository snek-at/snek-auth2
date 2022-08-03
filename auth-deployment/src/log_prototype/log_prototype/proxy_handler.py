'''
Setup the proxy handler with `python3 -m log_prototype.proxy_handler`
'''

from .proxy import ProxyServer, ProxyMessage


def function_handler(message: ProxyMessage):
    import pandas as pd
    import pyarrow.parquet as pq
    import pyarrow as pa
    import json
    import os

    file_path = './log_prototype/log.parquet'
    if message.fnName == 'log':
        df = pd.json_normalize(message.data, max_level=0)
        if os.stat(file_path).st_size == 0:
            df.to_parquet(file_path)
        else:
            df2 = pd.read_parquet(file_path)
            df3 = pd.concat([df2, df])
            df3.to_parquet(file_path)

        print(pd.read_parquet(file_path))
        return "Success"

    return 'Unknown function'


ProxyServer().handle(function_handler)