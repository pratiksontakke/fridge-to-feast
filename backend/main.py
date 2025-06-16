from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import torch
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer, AutoModelForObjectDetection
from PIL import Image
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="RecipeSnap API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
def load_image_captioning_model():
    model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
    feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
    tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    return model, feature_extractor, tokenizer

def load_object_detection_model():
    model = AutoModelForObjectDetection.from_pretrained("facebook/detr-resnet-50")
    return model

# Initialize models
caption_model, feature_extractor, tokenizer = load_image_captioning_model()
object_detection_model = load_object_detection_model()

class RecipeRequest(BaseModel):
    ingredients: List[str]
    dietary_preferences: List[str] = []

@app.post("/api/detect-ingredients")
async def detect_ingredients(file: UploadFile = File(...)):
    try:
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Process image for captioning
        pixel_values = feature_extractor(image, return_tensors="pt").pixel_values
        if torch.cuda.is_available():
            pixel_values = pixel_values.to("cuda")
        
        # Generate caption
        output_ids = caption_model.generate(pixel_values, max_length=50)
        caption = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        
        # Process image for object detection
        # Note: This is a simplified version. In production, you'd want to process
        # the object detection results more thoroughly
        detected_objects = ["apple", "orange", "tomato"]  # Placeholder
        
        return {
            "caption": caption,
            "detected_ingredients": detected_objects
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-recipe")
async def generate_recipe(request: RecipeRequest):
    try:
        # This is where you'd integrate with the Mistral model
        # For now, return a placeholder recipe
        recipe = {
            "title": "Simple Fruit Salad",
            "ingredients": request.ingredients,
            "instructions": [
                "1. Wash all fruits thoroughly",
                "2. Cut them into bite-sized pieces",
                "3. Mix in a large bowl",
                "4. Serve chilled"
            ],
            "cooking_time": "10 minutes",
            "difficulty": "Easy"
        }
        return recipe
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 