COPY alias FROM './/1_alias.parquet' (FORMAT 'parquet');
COPY "user" FROM './/0_user.parquet' (FORMAT 'parquet');
