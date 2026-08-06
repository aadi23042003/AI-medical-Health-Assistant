🧠 AI Medical Health Assistant

An AI-powered web application that predicts possible diseases based on user-input symptoms and provides severity insights and precautions.

🚀 Features
🩺 Predicts possible diseases based on symptoms
📊 Displays confidence level of prediction
⚠️ Provides severity analysis of the condition
💡 Suggests precautions and basic advice
🎨 Smooth and responsive UI with animations
⚡ Fast API responses using Django REST Framework
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Framer Motion
Backend
Django
Django REST Framework
Machine Learning
Scikit-learn
XGBoost
NumPy
Pandas
🧩 How It Works
User enters symptoms (e.g., fever, headache)
Data is sent to backend API
ML model processes symptoms
Predicts most probable disease
Returns:
Disease name
Confidence score
Severity level
Precautions
📁 Project Structure
AI-Health-Assistant/
│
├── frontend/          # React app
├── backend/           # Django REST API
│   ├── main/
│   │   ├── ml_models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── dataset.csv
│   │   ├── xgboost_model.pkl
│
├── requirements.txt
└── README.md
⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Backend Setup (Django)
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

pip install -r requirements.txt
python manage.py runserver
3. Frontend Setup (React)
cd frontend
npm install
npm run dev
🔌 API Endpoint
POST /api/analytics/
Request:
{
  "symptoms": ["fever", "fatigue"]
}
Response:
{
  "disease": "Flu",
  "confidence": 0.87,
  "severity_score": 15,
  "advice": "Consult a doctor if symptoms persist."
}
📸 Screenshots

Add screenshots of your UI here

⚠️ Disclaimer

This project is for educational purposes only and should not be used as a substitute for professional medical advice.

🌟 Future Improvements
Add authentication system
Improve model accuracy
Deploy on AWS
Add voice input support
Real-time doctor consultation integration
👨‍💻 Author

Aditya Rao

⭐ Contribute

Feel free to fork this repository and contribute!
