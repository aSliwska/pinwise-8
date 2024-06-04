import React, { useState } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const ImageWithDefault = (props: {
  className?: string | undefined,
  style?: React.CSSProperties | undefined
  src: string | StaticImport,
  alt: string,
  width?: number | `${number}` | undefined,
  height?: number | `${number}` | undefined,
  priority?: boolean | undefined,
  defaultSrc : string,
}) => {
  const { src, defaultSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(defaultSrc);
      }}
    />
  );
};

export default ImageWithDefault;