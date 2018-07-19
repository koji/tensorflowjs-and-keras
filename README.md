# Tensorflowjs and Keras

## setup
```zsh
$ pip install tensorflowjs
```

## convert Keras model to Tensorflowjs model with command
```zsh
$ tensorflowjs_converter --input_format keras models/mobilenet_v2.h5 models4js/mobilenet_v2
```


## convert Keras model to Tensorflowjs model
```zsh
for VGG16
$ python keras2tensorflow_forVGG16.py

for MobileNet V2
$ python keras2tensorflow_formobilenet.py
```
In terms of mobilenet_v2, if you got an error, you would need to update Keras
```zsh
$ pip install -U keras
```
model.json is a meta-data file.  


 
## How to try this
```zsh

clone this repo
$ git clone https://github.com/sleepy-maker/tensorflowjs-and-keras.git

$ cd image_classification/app

$ npm install

$ node server.js

```

#### demo
https://sleepy-maker.github.io/tensorflowjs-and-keras/image_classification/app/public/  

## ToDo
- [ ] Add a function which allows users to select a model(VGG16/MobileNet)
- [ ] Optimize model loading process  
- [ ] Add webcam function  
- [ ] Add new functions  
