# VGG16 version
import keras
import tensorflowjs as tfjs

# load keras model
mobilenet = keras.applications.mobilenetv2.MobileNetV2()
# convert model from keras to tensorflowjs
tfjs.converters.save_keras_model(mobilenet, './models4tfjs/MmobileNet')
