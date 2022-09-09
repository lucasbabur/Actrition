import * as React from 'react'
import { ChakraProvider, Box, Flex, Textarea , Text, Button, Input } from '@chakra-ui/react'
import { render } from 'react-dom';

function App () {
    let [goal, setGoal] = React.useState(null)
    let [search, setSearch] = React.useState(null)
    let [time, setTime] = React.useState(null)

    let [buttonWriting, setButtonWriting] = React.useState(false)
    let [recado, setRecado] = React.useState('')

    const activateYoutube = () => {
        if (goal && search && time){
            setRecado("Wait 20 seconds...")
            setTimeout(() => {chrome.runtime.sendMessage(parseInt(time))}, 1000)
            setTimeout(() => {chrome.runtime.sendMessage(value)}, 2000)
            setTimeout(() => {location.assign("https://www.youtube.com/results?search_query=" + search)}, 20000)
            setButtonWriting(true)
            for (let i = 0; i < 20; i++){
                setTimeout(() => {setRecado('Wait ' + (20 - i) + ' seconds...')}, (i * 1000))
            }
        } else { setRecado("Fill everything") }
    }
  
    return (
        <ChakraProvider>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" h="100vh">
                <Text fontSize="20px" textAlign="center">
                    What is your goal using youtube?
                </Text>
                <Textarea placeholder='Write here your goals' w="300px" mt={2} value={goal} onChange={(e) => {setGoal(e.target.value)}} isDisabled={buttonWriting}/>

                <Text fontSize="16px" mt={6} textAlign="center">
                    Write what you want to search on youtube
                </Text>
                <Input placeholder='Write something you want to search' w="300px" mt={2} value={search} onChange={(e) => {setSearch(e.target.value)}} isDisabled={buttonWriting}/>

                <Text fontSize="16px" mt={6} textAlign="center">
                    Time you plan to spend on youtube (in minutes)
                </Text>
                <Input placeholder="Number of minutes" width="200px" type="number" mt={2} value={time} onChange={(e) => {setTime(e.target.value)}} autoFocus={false} isDisabled={buttonWriting}/>

                <Text mt={2} textAlign="center">{recado}</Text>

                <Flex mt={4} alignItems="center" justifyContent="center">
                    <Button w="100px" mr={2} onClick={() => {activateYoutube()}} colorScheme="teal" isDisabled={buttonWriting}>Go</Button>	
                    <Button w="100px" ml={2} onClick={() => {location.assign("https://calendar.google.com/calendar/u/0/r?pli=1")}} colorScheme="red" isDisabled={false}>Give Up</Button>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

render(<App />, document.getElementById('react-target'));