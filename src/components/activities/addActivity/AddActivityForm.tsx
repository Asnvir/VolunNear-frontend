import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ActivityType} from '../../../api/services/activities/service/types.ts';

const AddActivityForm = ({ onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const toast = useToast();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toast({
      title: "Activity added.",
      description: "Your activity has been added successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} bg="white" borderRadius="md" boxShadow="md" width="100%" maxW="600px" mx="auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4}>
          <FormControl id="title" isInvalid={errors.title}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Activity Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <Box color="red.500">{errors.title.message}</Box>}
          </FormControl>

          <FormControl id="description" isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => <ReactQuill theme="snow" {...field} />}
            />
            {errors.description && <Box color="red.500">{errors.description.message}</Box>}
          </FormControl>

          <FormControl id="country" isInvalid={errors.country}>
            <FormLabel>Country</FormLabel>
            <Input
              placeholder="Country"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && <Box color="red.500">{errors.country.message}</Box>}
          </FormControl>

          <FormControl id="city" isInvalid={errors.city}>
            <FormLabel>City</FormLabel>
            <Input
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <Box color="red.500">{errors.city.message}</Box>}
          </FormControl>

          <FormControl id="street" isInvalid={errors.street}>
            <FormLabel>Street</FormLabel>
            <Input
              placeholder="Street"
              {...register("street", { required: "Street is required" })}
            />
            {errors.street && <Box color="red.500">{errors.street.message}</Box>}
          </FormControl>

          <FormControl id="numberOfHouse" isInvalid={errors.numberOfHouse}>
            <FormLabel>House Number</FormLabel>
            <Input
              placeholder="House Number"
              {...register("numberOfHouse", { required: "House Number is required" })}
            />
            {errors.numberOfHouse && <Box color="red.500">{errors.numberOfHouse.message}</Box>}
          </FormControl>

          <FormControl id="coverImage" isInvalid={errors.coverImage}>
            <FormLabel>Cover Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              {...register("coverImage", { required: "Cover Image is required" })}
            />
            {errors.coverImage && <Box color="red.500">{errors.coverImage.message}</Box>}
          </FormControl>

          <FormControl id="galleryImages" isInvalid={errors.galleryImages}>
            <FormLabel>Gallery Images</FormLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              {...register("galleryImages", { required: "Gallery Images are required" })}
            />
            {errors.galleryImages && <Box color="red.500">{errors.galleryImages.message}</Box>}
          </FormControl>

          <FormControl id="type" isInvalid={errors.type}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select Activity Type"
              {...register("type", { required: "Type is required" })}
            >
              {Object.keys(ActivityType).map((type) => (
                <option key={type} value={type}>
                  {ActivityType[type]}
                </option>
              ))}
            </Select>
            {errors.type && <Box color="red.500">{errors.type.message}</Box>}
          </FormControl>

          <FormControl id="date" isInvalid={errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && <Box color="red.500">{errors.date.message}</Box>}
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Add Activity
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddActivityForm;