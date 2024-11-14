FROM python:3.9.7

WORKDIR /app
ENV PYTHONPATH=/app

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app/backend

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
