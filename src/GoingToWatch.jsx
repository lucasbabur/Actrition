import * as React from 'react'
import { ChakraProvider, Box, Flex, Textarea , Text, Button, Input } from '@chakra-ui/react'
import { render } from 'react-dom';

function App () {

    return (
        <ChakraProvider>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
                <Text fontSize="20px">
                    Então você estava tentando assistir a um vídeo, ein... 🤔
                </Text>
                <Text>
                    Interessante.
                </Text>
                <Text>
                    Agora diga, porque estava tentando assistir esse vídeo?
                </Text>
                <Input placeholder="Digite aqui a razão" width="200px"  mt="6px"/>
                <Button colorScheme="teal" mt="6px">Continuar</Button>
            </Box>
        </ChakraProvider>
    );
}

render(<App />, document.getElementById('react-target2'));