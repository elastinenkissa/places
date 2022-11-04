import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [valid, setValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = valid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setValid(true);
      fileIsValid = true;
    } else {
      setValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div style={{ margin: 15 }}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <Upload center={props.center}>
        <Preview hidden={!file}>
          <Image src={previewUrl} alt="Preview" />
        </Preview>
        <Button type="button" onClick={pickImageHandler}>
          UPLOAD IMAGE
        </Button>
      </Upload>
    </div>
  );
};

export default ImageUpload;

const Upload = styled.div`
  ${(props) =>
    props.center &&
    `display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;`}
  }
`;

const Preview = styled.div`
  width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: ${(props) => (props.hidden ? `none` : `flex`)};
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
