import { View } from 'react-native';
import { NativeBaseProvider, Box, Center, Container, Heading, Text, Button, Image, VStack } from "native-base";

export default function Home({ navigation, route }) {

    return (
        <NativeBaseProvider>

            <Center flex={1} backgroundColor="purple.500">
                <Container>
                    <Heading>
                        <VStack space={10}>
                            <Image alignSelf="center" size={170} borderRadius={100} source={{
                                uri: "http://studio.sinops.es/resources/img/logo-circle.png"
                            }} alt="Alternate Text" />

                            <Box>
                                <Text textAlign="center" marginBottom={2} color="white" fontSize={18} fontWeight="bold">Seja bem vindo ao Sinopses</Text>
                                <Text textAlign="center" color="white" fontSize={18}>Nós faremos uma breve descrição sobre algum filme, série ou desenho animado e você deverá adivinhar!</Text>
                            </Box>

                            <Button onPress={() => navigation.navigate('Jogo')} size="lg" colorScheme="uninstyled" bg="white" borderRadius={70} padding={4}>
                                <Text color="light.700" fontWeight={700} fontSize={18}>Começar</Text>
                            </Button>
                        </VStack>

                    </Heading>

                </Container>
            </Center>

        </NativeBaseProvider>
    );

}