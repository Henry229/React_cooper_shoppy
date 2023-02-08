import React, { useState } from 'react';
import Button from '../components/ui/Button';
// import ImageUploader from '../api/image_uploader';

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  // const imageUploader = new ImageUploader();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // const onUpload = async (e) => {
  //   const uploaded = await imageUploader.upload(e.target.files[0]);
  // };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <h1>Register NewProduct</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='images/*'
          name='file'
          required
          onChange={handleChange}
        />
        {/* <button>Choose File</button> */}
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='ProductName'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='Price'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='Category'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description}
          placeholder='Description'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='Options(should be separated by comma)'
          required
          onChange={handleChange}
        />
        <Button text={'Register Product'} />
      </form>
    </section>
  );
};

export default NewProduct;
