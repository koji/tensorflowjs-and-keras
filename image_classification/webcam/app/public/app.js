// webcam
let reader = new FileReader();
const video = document.getElementById('video');
const media = navigator.mediaDevices.getUserMedia({
            video: true,
            //video: { facingMode: "environment" }, // back camera
            //video: { facingMode: "user" },// front camera
            audio: false, // if audio is needed, this should be true
        });
media.then((stream) => {
    video.srcObject = stream;
    reader.readAsDataURL(video);
});


    


$("#model-selector").change(() => {
    let modelName = $("#model-selector").val();
    loadModel(modelName);
});

let model;
// load model
async function loadModel(name) {
    // show indicator
    $(".progress-bar").show();
    model = undefined;
    model = await tf.loadModel(`./models/${name}/model.json`);
    $('.progress-bar').hide();
};


$('#predict').click(async function () {
    let image = $('#video').get(0);
    let modelName = $("#model-selector").val();

    // preprocessing
    let tensor = preprocessImage(image, modelName);

    // red, green, blue
    let indices = [
        tf.tensor1d([0], "int32"),
        tf.tensor1d([1], "int32"),
        tf.tensor1d([2], "int32")
    ];

    let predictions = await model.predict(tensor).data();

    //let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability: p,
                className: IMAGENET_CLASSES[i]
            };
        }).sort((a, b) => {
            return b.probability - a.probability;
        }).slice(0, 5);
    $('#prediction-list').empty();
    top5.forEach((p) => {
        $('#prediction-list').append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });
});


function preprocessImage(image, modelName) {
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    if (modelName == "VGG16") {
        let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
        return tensor.sub(meanImageNetRGB)
            .reverse(2)
            .expandDims();
    } else if (modelName == "MobileNet") {
        let offset = tf.scalar(127.5);
        return tensor.sub(offset)
            .div(offset)
            .expandDims();
    } else {
        throw new Error("unknow model is selected");
    }

}
