# שלב בסיס - אימג' פייתון רשמי
FROM python:3.10-slim


# העתקת הקבצים לקונטיינר
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# הרצת האפליקציה
CMD ["python", "hello.py"]
