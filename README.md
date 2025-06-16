# RecipeSnap - AI Cooking Assistant 🍳

Turn your fridge contents into delicious recipes with AI-powered ingredient detection and recipe recommendations!

## Features 🌟

- 📸 Upload or take photos of your fridge/ingredients
- 🔍 AI-powered ingredient detection
- 📝 Smart recipe recommendations
- 💡 Customizable recipe preferences

## Tech Stack 🛠️

### Frontend
- Next.js 14 with TypeScript
- TailwindCSS for styling
- React Query for state management

### Backend
- FastAPI (Python)
- ML Models:
  - Image Captioning: nlpconnect/vit-gpt2-image-captioning
  - Object Detection: facebook/detr-resnet-50
  - Recipe Generation: mistralai/Mistral-7B-Instruct

## Setup Instructions 🚀

### Prerequisites
- Node.js 18+
- Python 3.9+
- CUDA-compatible GPU (recommended)

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev
```

### Backend Setup
```bash
# Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

## Environment Variables 🔐

Create `.env` files in both frontend and backend directories:

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
MODEL_PATH=./models
CUDA_VISIBLE_DEVICES=0  # If using GPU
```

## API Endpoints 📡

- `POST /api/detect-ingredients`: Upload image and get detected ingredients
- `POST /api/generate-recipe`: Get recipe recommendations based on ingredients

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License 📄

MIT License - feel free to use this project for learning and development!
