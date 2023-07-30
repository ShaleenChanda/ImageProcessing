let inputImageBase64; // Buffer of the input image
let filteration = [];
let transformation = [];

// Writing a function that will wait to load all the DOM elements before executing the code
document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("imageInput");
    const uploadedImage = document.getElementById("uploadedImage");

  // Adding an event listener to the imageInput element
    imageInput.addEventListener("change", function() {
    const file = imageInput.files[0]; // Getting the file from the input element
    if (file) {
      const reader = new FileReader(); // Creating a file reader

    reader.onload = function() {
        inputImageBase64 = reader.result; // Storing the base64 string of the image
        uploadedImage.src = inputImageBase64; // Setting the src of the image element
        //console.log(inputImageBase64)
    };
        
        reader.readAsDataURL(file); // Reading the file as a data URL
    }
});
});


document.addEventListener("DOMContentLoaded", function() {
    const grayscaleCheckbox = document.getElementById("grayscaleCheckbox");

    grayscaleCheckbox.addEventListener("change", function() {
        if (grayscaleCheckbox.checked) {
            // Checkbox is checked, add the grayscale filter object to the array
            filteration.push({ "filter": "grayscale" });
        } else {
            // Checkbox is unchecked, remove the grayscale filter object from the array (if it exists)
            filteration = filteration.filter(filter => filter.filter !== "grayscale");
        }

        // You can do something with the updated filteration array here, like sending it to the backend
       // console.log(filteration);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const blurCheckbox = document.getElementById("blurCheckbox");
    const blurValueInput = document.getElementById("blurValueInput");

    // Adding an event listener to the checkbox
    blurCheckbox.addEventListener("change", function () {
        updateFilterationArray();
    });

    // Adding an event listener to the number input
    blurValueInput.addEventListener("input", function () {
        updateFilterationArray();
    });

    function updateFilterationArray() {
      // Check if the checkbox is checked
        const isChecked = blurCheckbox.checked;
        const blurValue = parseFloat(blurValueInput.value);

      // Find the index of the existing "Blur" filter object in the array
        const blurFilterIndex = filteration.findIndex(
            (filter) => filter.filter === "blur"
    );

        if (isChecked) {
        // If checkbox is checked and "Blur" filter object exists, update its value
        if (blurFilterIndex !== -1) {
            filteration[blurFilterIndex].filterInfo = blurValue;
        } else {
          // If "Blur" filter object doesn't exist, add it to the array
            filteration.push({ filter: "blur", filterInfo: blurValue });
        }
    } else {
        // If checkbox is unchecked, remove the "Blur" filter object from the array (if it exists)
        if (blurFilterIndex !== -1) {
            filteration.splice(blurFilterIndex, 1);
        }
    }

      // You can do something with the updated filteration array here, like sending it to the backend
        console.log(filteration);
    }
    });




document.addEventListener("DOMContentLoaded", function() {
    const brightnessCheckbox = document.getElementById("brightnessCheckbox");
    const brightnessValueInput = document.getElementById("brightnessValueInput");

  // Adding an event listener to the checkbox
    brightnessCheckbox.addEventListener("change", function () {
        updateFilterationArray();
    });

  // Adding an event listener to the number input
    brightnessValueInput.addEventListener("input", function () {
        updateFilterationArray();
    });

    function updateFilterationArray() {
    // Check if the checkbox is checked
        const isChecked = brightnessCheckbox.checked;
        const brightnessValue = parseFloat(brightnessValueInput.value);

    // Find the index of the existing "Brightness" filter object in the array
        const brightnessFilterIndex = filteration.findIndex(
            (filter) => filter.filter === "brightness"
        );

    if (isChecked) {
      // If checkbox is checked and "Brightness" filter object exists, update its value
        if (brightnessFilterIndex !== -1) {
            filteration[brightnessFilterIndex].filterInfo = brightnessValue;
        } else {
        // If "Brightness" filter object doesn't exist, add it to the array
        filteration.push({ filter: "brightness", filterInfo: brightnessValue });
        }
        } else {
            // If checkbox is unchecked, remove the "Brightness" filter object from the array (if it exists)
            if (brightnessFilterIndex !== -1) {
            filteration.splice(brightnessFilterIndex, 1);
        }
    }

    // You can do something with the updated filteration array here, like sending it to the backend
    console.log(filteration);
}
});


document.addEventListener("DOMContentLoaded", function() {
    const cropCheckbox = document.querySelector('.crop-section input[type="checkbox"]');
    const cropInputs = document.querySelectorAll('.crop-section input[type="number"]');

    // Adding an event listener to the checkbox
    cropCheckbox.addEventListener("change", function () {
        updateTransformationArray();
    });

    // Adding event listeners to all the number input elements
    cropInputs.forEach((input) => {
        input.addEventListener("input", function () {
        updateTransformationArray();
    });
    });

    function updateTransformationArray() {
      // Check if the checkbox is checked
        const isChecked = cropCheckbox.checked;

        if (isChecked) {
        // Get the values from the input elements
        const leftPercentage = parseFloat(cropInputs[0].value) / 100;
        const topPercentage = parseFloat(cropInputs[1].value) / 100;
        const widthPercentage = parseFloat(cropInputs[2].value) / 100;
        const heightPercentage = parseFloat(cropInputs[3].value) / 100;

        // Construct the crop transformation object
        const cropObject = {
            "operation": "crop",
            "info": {
            "leftPercentage": leftPercentage,
            "topPercentage": topPercentage,
            "widthPercentage": widthPercentage,
            "heightPercentage": heightPercentage
        }
        };
        const cropObjectIndex = transformation.findIndex((trans) => trans.operation === "crop");
        if(cropObjectIndex !== -1){
            transformation[cropObjectIndex] = cropObject;
        }else{
            // Add the crop transformation object to the transformation array
            transformation.push(cropObject);
        }
        } else {
        // If the checkbox is unchecked, remove the crop transformation object from the array (if it exists)
        transformation = transformation.filter((trans) => trans.operation !== "crop");
        }

      // You can do something with the updated transformation array here, like sending it to the backend
        console.log(transformation);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const resizeCheckbox = document.getElementById("resize-checkbox");
    const resizeWidthInput = document.getElementById("width-input-resize");
    const resizeHeightInput = document.getElementById("height-input-resize");

    // Adding an event listener to the checkbox
    resizeCheckbox.addEventListener("change", function () {
        updateTransformationArray();
    });

    // Adding event listeners to width and height input elements
    resizeWidthInput.addEventListener("input", function () {
        updateTransformationArray();
    });
    resizeHeightInput.addEventListener("input", function () {
        updateTransformationArray();
    });

    function updateTransformationArray() {
      // Check if the checkbox is checked
        const isChecked = resizeCheckbox.checked;

        if (isChecked) {
        // Get the values from the input elements
        const width = parseInt(resizeWidthInput.value);
        const height = parseInt(resizeHeightInput.value);

        // Construct the resize transformation object
        const resizeObject = {
            "operation": "resize",
            "width": width,
            "height": height
        };

        const resizeObjectIndex = transformation.findIndex((trans) => trans.operation === "resize");
        // Add the resize transformation object to the transformation array
        if(resizeObjectIndex !== -1){
            transformation[resizeObjectIndex] = resizeObject;
        }else{
            transformation.push(resizeObject);
        }
        } else {
        // If the checkbox is unchecked, remove the resize transformation object from the array (if it exists)
        transformation = transformation.filter((trans) => trans.operation !== "resize");
        }

      // You can do something with the updated transformation array here, like sending it to the backend
        console.log(transformation);
    }
});




document.addEventListener("DOMContentLoaded", function() {
    const rotateCheckbox = document.getElementById("rotate-check");
    const rotateAngleInput = document.getElementById("rotate-val");


    // Adding an event listener to the checkbox
    rotateCheckbox.addEventListener("change", function () {
        updateTransformationArray();
    });

    // Adding event listeners to width and height input elements
    rotateAngleInput.addEventListener("input", function () {
        updateTransformationArray();
    });


    function updateTransformationArray() {
      // Check if the checkbox is checked
        const isChecked = rotateCheckbox.checked;

        if (isChecked) {
        // Get the values from the input elements
        const angle = parseInt(rotateAngleInput.value);


        // Construct the resize transformation object
        const rotateObject = {
            "operation": "rotate",
            "angle" : angle
        };

        const rotateObjectIndex = transformation.findIndex((trans) => trans.operation === "rotate");
        // Add the resize transformation object to the transformation array
        if(rotateObjectIndex !== -1){
            transformation[rotateObjectIndex] = rotateObject;
        }else{
            transformation.push(rotateObject);
        }
        } else {
        // If the checkbox is unchecked, remove the resize transformation object from the array (if it exists)
        transformation = transformation.filter((trans) => trans.operation !== "rotate");
        }

      // You can do something with the updated transformation array here, like sending it to the backend
        console.log(transformation);
    }
});


document.addEventListener("DOMContentLoaded", function(){

    const editedImage = document.getElementById("editedImage");
    const editButton = document.getElementById("edit-button");

    editButton.addEventListener("click", function() {
        // Check if the image is empty
        if (!inputImageBase64) {
            alert("Please upload an image before editing.");
            return;
        }

        // Check if both filteration and transformation arrays are empty
        if (filteration.length === 0 && transformation.length === 0) {
            alert("Please apply at least one filter or transformation before editing.");
            return;
        }


        const imageData = {
            imageBase64: inputImageBase64,
            filteration: filteration,
            transformation: transformation
        };

        const url = "http://localhost:3000/editImage";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imageData)
        };


        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend
            if (data && data.imageData) {
                // Extract the base64 image data from the response
                const editedBase64 = data.imageData;

                // Update the edited image with the received base64 response
                const editedImage = document.getElementById("editedImage");
                editedImage.src = "data:image/jpeg;base64," + editedBase64;
            } else {
                console.error("Invalid response from the backend.");
            }
        })
        .catch(error => console.error("Error is occuring on frontend: ", error));
    })
})










