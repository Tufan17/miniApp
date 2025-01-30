import { Center } from '@mantine/core';
import { RingLoader } from './RingLoader.jsx';
import { createTheme } from '@mantine/core';
import { MantineProvider, Loader } from '@mantine/core';
const theme = createTheme({
    components: {
      Loader: Loader.extend({
        defaultProps: {
          loaders: { ...Loader.defaultLoaders, ring: RingLoader },
          type: 'ring',
        },
      }),
    },
  });
const LoaderComponent = () => {
  return (
    <Center className='w-full h-full bg-gray-200'>
         <MantineProvider theme={theme}>
      <Loader />
    </MantineProvider>
    </Center>
  );
}

export default LoaderComponent;