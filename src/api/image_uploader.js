class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/ddfl8c6gu/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return response.json();
  }
}

export default ImageUploader();
