import { useEffect, useState } from 'react';

import { View, KeyboardAvoidingView, Dimensions, Keyboard } from 'react-native';
import { NativeBaseProvider, Spinner, InputRightElement, Input, Box, Center, Container, Heading, Text, Button, Image, VStack, HStack } from "native-base";

export default function Jogo({ navigation, route }) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [imagem, setImagem] = useState('');
    const [chave, setChave] = useState();
    const [id, setId] = useState();
    const [resposta, setResposta] = useState();
    const [frase, setFrase] = useState();
    const [carregando, setCarregando] = useState(true);
    const [carregandoBotao, setCarregandoBotao] = useState(false);

    const [acerto, setAcerto] = useState(false);
    const [erro, setErro] = useState(false);
    const [quase, setQuase] = useState(false);

    const [chute, setChute] = useState();

    const [pontos, setPontos] = useState(0);

    useEffect(() => {

        proximo();

    }, []);

    function chutar() {
        
        if(chute == '') { return; }

        Keyboard.dismiss();

        setCarregandoBotao(true);

        const formData = new FormData();
        formData.append('chute', chute);

        fetch('https://sinops.es/game/api/frase/' + id + '/responder', {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,

        })
            .then(resultado => resultado.json())
            .then((resultado) => {


                if (resultado.codigo == 0) {
                    setCarregandoBotao(false);
                    setAcerto(false);
                    setErro(true);
                    setQuase(false);
                    setPontos(resultado.pontos);
                }

                if (resultado.codigo == 1) {
                    setCarregandoBotao(false);
                    setAcerto(false);
                    setErro(false);
                    setQuase(true);
                }

                if (resultado.codigo == 2) {
                    setCarregandoBotao(false);
                    setResposta(resultado.resposta);
                    setChave(resultado.chave);
                    setAcerto(true);
                    setErro(false);
                    setQuase(false);
                    setPontos(resultado.pontos);

                }

            })

    }

    function proximo() {

        setCarregando(true);

        fetch('https://sinops.es/game/api/frase/pegar')
            .then(resultado => resultado.json())
            .then((resultado) => {

                if (resultado.length == 1) {

                    setChute('');
                    setErro(false);
                    setAcerto(false);
                    setQuase(false);

                    setPontos(resultado[0].pontos);
                    setId(resultado[0].id);
                    setFrase(resultado[0].frase);
                    setImagem("https://sinops.es/game/api/imagem/" + resultado[0].id + '/');

                    fetch("https://sinops.es/game/api/imagem/" + resultado[0].id + '/')
                    .then(() => {
    
                        setCarregando(false)
    
                    })
    
        
                } else {

                    navigation.navigate('Fim');

                }

            })

    }

  
    return (
        <NativeBaseProvider>

            <Center flex={1} backgroundColor="purple.500">

                {carregando ?

                    <HStack space={2} justifyContent="center">
                        <Spinner color="white" size="sm" />
                        <Heading color="white" fontSize="md">
                            Buscando título
                        </Heading>
                    </HStack>

                    :

                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                        <Container>
                            <VStack space={5}>

                                <Box marginBottom={5}>
                                    <Text fontSize={20} color="white" textAlign="center">{pontos} ponto(s)</Text>
                                </Box>

                                <Image onLoad={() => setCarregando(false) } marginBottom={5} blurRadius={acerto ? 0 : 20} alignSelf="center" size={170} borderRadius={100} source={{
                                    uri: imagem + chave
                                }} alt="Imagem" />

                                <Text width={windowWidth - 70} marginBottom={2} textAlign="center" color="white" fontSize={18} fontWeight="bold">{frase}</Text>

                                <VStack alignItems="center" marginBottom={4}>
                                    <Input autoCorrect={false} value={chute} editable={acerto ? false : true} borderWidth={0} onChangeText={(valorChute) => { setChute(valorChute); setErro(false); setQuase(false) } } color={carregandoBotao ? 'white' : acerto ? 'green.200' : erro ? 'red.400' : quase ? 'orange.200' : 'white'} keyboardType="default" textDecorationLine={erro ? 'line-through' : 'none'} placeholder='Escreva aqui...' placeholderTextColor="purple.400" fontWeight={600} textAlign="center" w="100%" borderRadius={70} padding={4} fontSize={30}></Input>
                                </VStack>

                                <Button onPress={() => acerto ? proximo() : chutar()} size="lg" colorScheme="uninstyled" bg="white" borderRadius={70} padding={4}>
                                    <Text color="light.700" fontWeight={700} fontSize={18}>
                                        {carregandoBotao ? <Spinner padding={1} color="black" size="sm" /> : acerto ? 'Continuar' : 'Chutar'}
                                    </Text>
                                </Button>

                                <Button onPress={() => navigation.navigate('Fim') } size="lg" colorScheme="uninstyled" bg="transparent" borderRadius={70} padding={4}>
                                    <Text color="white" fontWeight={700} fontSize={18}>
                                        Desistir
                                    </Text>
                                </Button>
                            </VStack>


                        </Container>
                    </KeyboardAvoidingView>


                }
            </Center>

        </NativeBaseProvider>
    );

}