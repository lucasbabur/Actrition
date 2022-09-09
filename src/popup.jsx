import * as React from 'react'
import { ChakraProvider, Box, Flex, Textarea , Text, Button, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { render } from 'react-dom';

function App () {

    let [value, setValue] = React.useState('')
    let [value2, setValue2] = React.useState('')
    let [foi, setFoi] = React.useState('Ir')
    let [recado, setRecado] = React.useState('')
    let [util, setUtil] = React.useState('')
    const [time, setTime] = React.useState(20)

  let handleTextAreaChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    inputValue.replace(" ", "+")
    setValue2(inputValue)
  }


    

    const handleInputChange2 = (e) => {
        setTime(e.target.value)
    }


        

  

    return (
        <ChakraProvider>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
                <Text fontSize="20px">
                    Qual seu Objetivo ao usar o Youtube?
                </Text>
                <Textarea placeholder='Escreva aqui seu objetivo' w="300px" mt={2} value={value} onChange={handleTextAreaChange}/>
                <Text fontSize="16px" mt={6}>
                    Escreva o que deseja pesquisar no Youtube
                </Text>
                <Input placeholder='Escreva uma pesquisa condizente' w="300px" mt={2} value={value2} onChange={handleInputChange}/>


                <Text mt={4} fontSize="16px">Propósito</Text>
                <RadioGroup onChange={(e) => {setUtil(e)}} mt={2}>
                    <Stack spacing={5} direction='row'>
                        <Radio colorScheme='green' value="1">
                            Útil
                        </Radio>
                        <Radio colorScheme='red' value="2">
                            Inútil
                        </Radio>
                    </Stack>
                </RadioGroup>

                {util == '1' ? 
                <Box display="flex" justifyContent="center" alignItems="center" mt={4} flexDirection="column">
                    <Text fontSize="14px">
                        Tempo que Pretende Gastar
                    </Text>
                     <Input placeholder="Digite aqui o tempo" width="200px" type="number" mt="6px" value={time} onChange={handleInputChange2} autoFocus={false}/>
                </Box> : null}


                <Text mt={2}>{recado}</Text>


                <Flex  mt={4} alignItems="center" justifyContent="center">
                    <Button w="100px" mr={2} onClick={() => {

                        
                    if (value && value2 && util){
                        setRecado("Espere 20 segundos.")
                        setTimeout(() => {chrome.runtime.sendMessage(parseInt(time))}, 1000)
                        setTimeout(() => {chrome.runtime.sendMessage(value)}, 2000)
                        setTimeout(() => {location.assign("https://www.youtube.com/results?search_query=" + value2)}, 20000)
                        setFoi("Espere")
                        for (let i = 0; i < 20; i++){
                            setTimeout(() => {setRecado('Espere ' + (20 - i) + ' segundos...')}, (i * 1000))
                        }
                    } else {
                        setRecado("Não esqueça de preencher os campos.")
                    }
                    }} colorScheme="teal">{foi}</Button>	
                    <Button w="100px" ml={2} onClick={() => {location.assign("https://calendar.google.com/calendar/u/0/r?pli=1")}} colorScheme="red">Desistir</Button>
            </Flex>
    
            </Box>
        </ChakraProvider>
    );
}

render(<App />, document.getElementById('react-target'));