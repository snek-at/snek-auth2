from setuptools import setup

setup(name='log_app',
      version='1.0.0',
      description='Python Distribution Utilities',
      author='Nico Schett',
      author_email='nicoschett@icloud.com',
      url='https://github.com/snek-at',
      packages=['log_prototype'],
      install_requires=['pandas', 'pyarrow', 'fastparquet'],
     )