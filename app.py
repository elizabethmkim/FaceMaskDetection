
from flask import Flask, render_template, request, url_for, redirect, send_from_directory, jsonify
import torchvision.transforms as transforms
from PIL import Image
from werkzeug.utils import secure_filename
import io
import os
import torch
import np
import cv2
from facenet_pytorch import MTCNN, InceptionResnetV1, fixed_image_standardization, training
import gradcam as gcam

app = Flask(__name__, static_folder='static', static_url_path='')
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config["CACHE_TYPE"] = "null"

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
    
@app.route('/predict', methods=['POST'])
def predict(): 
    if request.method == 'POST':
        file = request.files['file']
        img_bytes = file.read()
        class_id, class_name = get_prediction(image_bytes=img_bytes)
        return jsonify({'class_id': class_id, 'class_name': class_name})
   
def transform_image(image_bytes): 
    my_transforms = transforms.Compose([transforms.Resize((256,256)), transforms.ToTensor()])
    img = Image.open(io.BytesIO(image_bytes))
    return my_transforms(img).unsqueeze(0)
    
model = InceptionResnetV1(num_classes=3)
model_path = './model/inceptionResnetV1Params.pt'
model.load_state_dict(torch.load(model_path, map_location = torch.device('cpu')))
model.eval()

class_idx = {'0':'covered', '1':'incorrectly covered', '2':'uncovered'}

def get_prediction(image_bytes): 
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor) 
    _, y_hat = outputs.max(1) 
    predicted_idx = str(y_hat.item()) 

    return predicted_idx, class_idx[predicted_idx]

def use_gradCAM(model,image_path):
    #run_grad(model,image_file_path) should run the function. make sure to pass model correctly
    gcam.run_grad(model,image_path)
    return

@app.route('/')
def initialize():
    return render_template('index.html')

@app.route('/demo.html')
def demo():
    return render_template('demo.html')

import sys
@app.route('/demo.html', methods= ['GET', 'POST'])
def upload_file():
    clearGC()
    if request.method == 'POST':
        f = request.files['file']
        img_bytes = f.read()
        class_id, class_name = get_prediction(image_bytes=img_bytes)
        u_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
        u_path2 = os.path.join('static/gc', secure_filename(f.filename))
        f.save(u_path2)
        npimg = np.fromstring(img_bytes, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        print(type(img), file=sys.stderr)
        use_gradCAM(model, img)
        data =  {'original': f.filename, 'class_id': class_id, 'class_name': class_name}
        return render_template('upload.html', data=data)

import glob
def clearGC(): 
    files = glob.glob('static/gc/*')
    for f in files:
        os.remove(f)

if __name__ == '__main__':
   app.run(debug = True)

