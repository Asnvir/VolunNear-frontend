import {SimpleGrid, Image} from '@chakra-ui/react';

export type ActivityGalleryProps = {
  images: string[];
};

export const ActivityGallery = ({images}: ActivityGalleryProps) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={4}>
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Gallery Image ${index}`}
          borderRadius="md"
        />
      ))}
    </SimpleGrid>
  );
};
