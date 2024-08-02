import React from 'react';
import { Box } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import NoImage from '../../../../resources/No_image_available.png';

interface ImageGalleryProps {
  galleryImages?: string[];
  coverImage?: string;
}


const CustomImageGallery: React.FC<ImageGalleryProps> = ({ galleryImages, coverImage }) => {
  const images = [
    {
      original: coverImage || NoImage,
      thumbnail: coverImage || NoImage,
    },
    ...(galleryImages && galleryImages.length > 0
      ? galleryImages.map(image => ({
        original: image,
        thumbnail: image,
      }))
      : [{ original: NoImage, thumbnail: NoImage }]),
  ];

  return (
    <Box>
      <ImageGallery items={images} showPlayButton={false} />
    </Box>
  );
};

export default CustomImageGallery;
