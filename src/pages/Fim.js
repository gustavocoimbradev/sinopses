import { useEffect, useState } from 'react';

import { Dimensions, Keyboard } from 'react-native';
import { NativeBaseProvider, Box, Center, Container, Heading, Text, Button, VStack, HStack, Spinner } from "native-base";

export default function Jogo({ navigation }) {

    const windowWidth = Dimensions.get('window').width;

    const [pontos, setPontos] = useState(0);

    const [carregando, setCarregando] = useState(true);


    useEffect(() => {

        fetch('https://sinops.es/game/api/pontos')
            .then(resultado => resultado.json())
            .then((resultado) => {
                setPontos(resultado.pontos);
            })
            .then(() => setCarregando(false) )
    }, []);


    return (
        <NativeBaseProvider>

            <Center flex={1} backgroundColor="purple.500">

                {carregando ?

                    <HStack space={2} justifyContent="center">
                        <Spinner color="white" size="sm" />
                        <Heading color="white" fontSize="md">
                            Carregando pontuação
                        </Heading>
                    </HStack>

                    :

                    <Container>
                        <VStack space={5}>

                            <Text width={windowWidth - 70} textAlign="center" color="white" fontSize={20} >Você conseguiu um total de</Text>

                            <Box marginBottom={5}>
                                <Text fontSize={40} color="white" textAlign="center" fontWeight="bold">{pontos} ponto(s)</Text>
                            </Box>


                            <Button onPress={() => navigation.navigate('Home')} size="lg" colorScheme="uninstyled" bg="white" borderRadius={70} padding={4}>
                                <Text color="light.700" fontWeight={700} fontSize={18}>
                                    Jogar novamente
                                </Text>
                            </Button>
                        </VStack>


                    </Container>

                }

            </Center>

        </NativeBaseProvider>
    );

}