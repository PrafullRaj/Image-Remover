document.getElementById("imageUpload").addEventListener("change", function(){
    const formData = new FormData();
    formData.append('image', this.files[0]);

    fetch('/removebg', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('File type not supported or other error occurred.');
        }
        return response.blob();
    })
    .then(image => {
        const imageUrl = URL.createObjectURL(image);
        document.getElementById("previewImage").src = imageUrl;
        document.getElementById("downloadLink").href = imageUrl;
        document.getElementById("downloadLink").style.display = 'block';
    })
    .catch(error => {
        console.error('There was an error uploading the image:', error);
    });
});
