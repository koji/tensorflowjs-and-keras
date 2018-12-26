# VGG16 version
import keras
import tensorflowjs as tfjs

# load keras model
vgg16 = keras.applications.vgg16.VGG16()
# convert model from keras to tensorflowjs
tfjs.converters.save_keras_model(vgg16, './models4tfjs/VGG16')
