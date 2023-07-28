const sharp = require('sharp');
const fs = require('fs');
const imageBase64 = require('./imagedata.js')


//converting base64 image to buffer
let inputImageBuffer = Buffer.from(imageBase64, 'base64');
const filepath = "./images";


//defining important variables for edgeDetection
const options = {
    lowThreshold: 10,  // Lower threshold for edge detection
    highThreshold: 50, // Higher threshold for edge detection
};

//function to saving data from buffer to folder
function saveImage(inputImageBuffer, filepath, filename){
    fs.writeFile(`${filepath}/${filename}.png`, inputImageBuffer, (err) => {
        if (err) {
            console.log("Error occured while writing image to folder name images from buffer");
            console.log("Error : ", err);
        } else {
            console.log("Image saved successfully");
        }
    });
}


//writing function to implement image filteration(grayscale conversion)
async function grayScaleConvertion(inputImageBuffer) {
    try{
        const outputImageBuffer = await sharp(inputImageBuffer).grayscale().toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
    }catch(err){
        console.log("Error occured while converting image to grayscale");
        console.log("Error : ", err);
        throw err;
    }
}

//writing function to implement image filteration(brightnessAdjustment)
async function brightnessAjdustment(inputImageBuffer, brightnessLevel){
    try{
        const outputImageBuffer = await sharp(inputImageBuffer).modulate({ brightness: brightnessLevel}).toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
        console.log("image brightness adjustment is completed")
    }catch(err){
        console.log("Error occured while converting image to brightness Adjustment");
        console.log("Error : ", err);
        throw err;
    }
}


//writing function to implement image filteration(Blur)
async function blurImage(inputImageBuffer, blurLevel){
    try{
        const outputImageBuffer = await sharp(inputImageBuffer).blur(blurLevel).toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
        console.log("image blur is completed");
    }
    catch(err){
        console.log("Error occured while converting image to blur");
        console.log("Error : ", err);
        throw err;
    }
}


//writing function to implement image filteration(edge detection)




//implementing image transformation(resizing)

async function resizeImage(inputImageBuffer, width, height){
    try{
        const outputImageBuffer = await sharp(inputImageBuffer).resize({width, height, fit : 'contain'}).toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
        console.log("image resize is completed");
    }
    catch(err){
        console.log("Error occured while converting image to resize");
        console.log("Error : ", err);
        throw err;
    }
}


//implementing image transformation(croping)
async function cropImage(inputImageBuffer, info){
    const imageInfo = await sharp(inputImageBuffer).metadata();
    const{leftPercentage, topPercentage, widthPercentage, heightPercentage} = info;
    const {width : imageWidth, height : imageHeight} = imageInfo;


    //handling images such that cropping should not cross the inital size of image thus
    //in below code we are using information about amount of cropping in percentage which has defined in info variable
    const left = Math.floor(leftPercentage * imageWidth);
    const top = Math.floor(topPercentage * imageHeight);
    const width = Math.floor(widthPercentage * imageWidth);
    const height = Math.floor(heightPercentage * imageHeight);
    // console.log(imageInfo);    

    try{
        const outputImageBuffer = await sharp(inputImageBuffer).extract({left, top, width, height}).toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
        console.log("image crop is completed");
    }
    catch(err){
        console.log("Error occured while converting image to crop");
        console.log("Error : ", err);
        throw err;
    }
}


//implementing image transformation(rotation)
async function rotateImage(inputImageBuffer, angle){
    try{
        const outputImageBuffer = await sharp(inputImageBuffer).rotate(angle).toBuffer();
        outputImageBuffer.copy(inputImageBuffer);
        console.log("image rotate is completed");
    }
    catch(err){
        console.log("Error occured while converting image to rotate");
        console.log("Error : ", err);
        throw err;
    }
}

console.log("ello heheheh")



//bellow this point all function are used for testing purpose
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//mainFunction(inputImageBuffer, filepath);


async function mainFunction(inputImageBuffer, filepath){
    //below this point all the filteration function are tested

    // await grayScaleConvertion(inputImageBuffer);
    // await brightnessAjdustment(inputImageBuffer, brightnessLevel);
    // await grayScaleConvertion(inputImageBuffer);
    // await blurImage(inputImageBuffer, blurLevel);
    
    
    
    
    
    //testing brightness adjustment for different levels thus making below variable
    const brightnessLevel = 0.5;
    //testing blur for different levels thus making below variable
    const blurLevel = 4;
    //testing for resize image
    const width = 800;
    const height = 600;
    

    //testing for cropping image 
    const info = {
        leftPercentage : 0.2,
        topPercentage : 0.2,
        widthPercentage : 0.6,
        heightPercentage : 0.6
    }

    //testing for rotation
    const angle = 90;
    await rotateImage(inputImageBuffer, angle);

    await cropImage(inputImageBuffer, info);



    saveImage(inputImageBuffer, filepath, "outputImage");
}
