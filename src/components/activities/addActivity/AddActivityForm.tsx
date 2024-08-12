import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ActivityType } from '../../../api/services/activities/service/types.ts';
import { useCreateActivity } from '../../../hooks/activities/useCreateActivity/useCreateActivity.ts';
import {beautifyActivityType} from '../../../utils/kindToButyType.ts';

const AddActivityForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate: createActivity } = useCreateActivity();
  const toast = useToast();

  const handleFormSubmit = async (data) => {
    if (data.date && data.time) {
      const [hours, minutes] = data.time.split(':');
      const dateTime = new Date(data.date);
      dateTime.setHours(parseInt(hours, 10));
      dateTime.setMinutes(parseInt(minutes, 10));
      data.dateTime = format(dateTime, 'yyyy-MM-dd HH:mm');
    }

    const createActivityRequest = {
      title: data.title,
      description: data.description,
      country: data.country,
      city: data.city,
      street: data.street,
      numberOfHouse: data.numberOfHouse,
      kindOfActivity: data.type,
      dateOfPlace: data.dateTime,
      coverImage: data.coverImage[0],
      galleryImages: Array.from(data.galleryImages),
    };

    createActivity(createActivityRequest, {
      onSuccess: () => {
        toast({
          title: 'Activity added.',
          description: 'Your activity has been added successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        reset();
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Box p={8} bg="white" borderRadius="md" boxShadow="md" width="100%" maxW="1200px">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <FormControl id="title" isInvalid={errors.title}>
              <FormLabel>
                Title <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                placeholder="Activity Title"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <Box color="red.500">{errors.title.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl id="description" isInvalid={errors.description}>
              <FormLabel>
                Description <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => <ReactQuill theme="snow" {...field} />}
              />
              {errors.description && <Box color="red.500">{errors.description.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="country" isInvalid={errors.country}>
              <FormLabel>
                Country <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                placeholder="Country"
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <Box color="red.500">{errors.country.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="city" isInvalid={errors.city}>
              <FormLabel>
                City <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                placeholder="City"
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <Box color="red.500">{errors.city.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="street" isInvalid={errors.street}>
              <FormLabel>
                Street <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                placeholder="Street"
                {...register('street', { required: 'Street is required' })}
              />
              {errors.street && <Box color="red.500">{errors.street.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="numberOfHouse" isInvalid={errors.numberOfHouse}>
              <FormLabel>
                House Number <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                placeholder="House Number"
                {...register('numberOfHouse', { required: 'House Number is required' })}
              />
              {errors.numberOfHouse && <Box color="red.500">{errors.numberOfHouse.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="coverImage" isInvalid={errors.coverImage}>
              <FormLabel>
                Cover Image <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Button as="label" variant="primary" htmlFor="coverImageInput" colorScheme="teal">
                Choose Cover Image
              </Button>
              <Input
                id="coverImageInput"
                type="file"
                accept="image/*"
                {...register('coverImage', { required: 'Cover Image is required' })}
                display="none"
              />
              {errors.coverImage && <Box color="red.500">{errors.coverImage.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="galleryImages" isInvalid={errors.galleryImages}>
              <FormLabel>
                Gallery Images <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Button as="label" variant="primary" htmlFor="galleryImagesInput" colorScheme="teal">
                Choose Gallery Images
              </Button>
              <Input
                id="galleryImagesInput"
                type="file"
                accept="image/*"
                multiple
                {...register('galleryImages', { required: 'Gallery Images are required' })}
                display="none"
              />
              {errors.galleryImages && <Box color="red.500">{errors.galleryImages.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="type" isInvalid={errors.type}>
              <FormLabel>
                Type <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Select
                placeholder="Select Activity Type"
                {...register('type', { required: 'Type is required' })}
              >
                {Object.keys(ActivityType).map((type) => (
                  <option key={type} value={type}>
                    {beautifyActivityType(ActivityType[type])}
                  </option>
                ))}
              </Select>
              {errors.type && <Box color="red.500">{errors.type.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="date" isInvalid={errors.date}>
              <FormLabel>
                Date <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                type="date"
                {...register('date', { required: 'Date is required' })}
                min={new Date().toISOString().split('T')[0]} // Ensure the date is today or later
              />
              {errors.date && <Box color="red.500">{errors.date.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="time" isInvalid={errors.time}>
              <FormLabel>
                Time <Box as="span" color="red.500">*</Box>
              </FormLabel>
              <Input
                type="time"
                {...register('time', { required: 'Time is required' })}
              />
              {errors.time && <Box color="red.500">{errors.time.message}</Box>}
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button type="submit" variant="primary" width="full" colorScheme="teal">
              Add Activity
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default AddActivityForm;