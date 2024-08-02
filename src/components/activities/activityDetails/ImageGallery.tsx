import React, {useEffect} from 'react';
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

  useEffect(() => {
    const gallerySlides = document.querySelectorAll('.image-gallery-slide img');
    const galleryThumbnails = document.querySelectorAll('.image-gallery-thumbnail img');

    gallerySlides.forEach(img => {
      img.style.borderRadius = '15px'; // Adjust the radius as needed
    });

    galleryThumbnails.forEach(img => {
      img.style.borderRadius = '5px'; // Adjust the radius for thumbnails as needed
    });
  }, [images]);

  return (
    <Box>
      <ImageGallery items={images} showPlayButton={false} />
    </Box>
  );
};

export default CustomImageGallery;
