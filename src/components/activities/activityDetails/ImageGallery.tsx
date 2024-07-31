import React from 'react';
import { Box } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ImageGalleryProps {
  galleryImages: string[];
  coverImage: string;
}

const CustomImageGallery: React.FC<ImageGalleryProps> = ({ galleryImages, coverImage }) => {
  const images = [
    {
      original: coverImage,
      thumbnail: coverImage,
    },
    ...galleryImages.map(image => ({
      original: image,
      thumbnail: image,
    })),
  ];

  return (
    <Box>
      <ImageGallery items={images}  showPlayButton={false}/>
    </Box>
  );
};

export default CustomImageGallery;
