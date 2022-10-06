import * as React from 'react'
import { ChakraProvider, Box, Flex, Textarea , Text, Button, Input, Image, IconButton  } from '@chakra-ui/react'
import { render } from 'react-dom';
import {ViewIcon, ViewOffIcon, CloseIcon} from '@chakra-ui/icons'
import { FaMusic } from "react-icons/fa"

function App () {
    let [goal, setGoal] = React.useState(null)
    let [search, setSearch] = React.useState(null)
    let [time, setTime] = React.useState(null)
    const [channel, setChannels] = React.useState([])
    const [channelImageLink, setChannelImageLink] = React.useState("") 
    const [channelLink, setChannelLink] = React.useState("")
    const [view, setView] = React.useState(false)

    let [buttonWriting, setButtonWriting] = React.useState(false)
    let [ticket, setTicket] = React.useState('')

    const activateYoutube = (url) => {
        if (goal && search && time){
            setTicket("Wait 20 seconds...")
            setTimeout(() => {chrome.runtime.sendMessage(parseInt(time))}, 1000)
            setTimeout(() => {chrome.runtime.sendMessage(value)}, 2000)
            setTimeout(() => {location.assign(url)}, 5000)
            setButtonWriting(true)
            for (let i = 0; i < 20; i++){
                setTimeout(() => {setTicket('Wait ' + (20 - i) + ' seconds...')}, (i * 1000))
            }
        } else { setTicket("Fill everything") }
    }

    const registerNewChannel = (image, link) => {
        var ChannelsArr = channel
        ChannelsArr.push({image: image, link: link})
        setChannels(ChannelsArr)

        chrome.storage.local.set({channel: channel})

    }

    const deleteChannel = (index) => {
        var ChannelsArr = channel
        ChannelsArr.splice(index, 1)
        setChannels(ChannelsArr)

        chrome.storage.local.set({channel: channel})
    }

    React.useEffect(() => {
        chrome.storage.local.get(['channel'], function(result) {
            if (result.channel == undefined){
                setChannels([])
            } else {
                setChannels(result.channel)
            }
        });
    }, [channel])
  
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

                <Text mt={2} textAlign="center">{ticket}</Text>

                <Flex mt={4} alignItems="center" justifyContent="center">
                    <Button w="100px" mr={2} onClick={() => {activateYoutube("https://www.youtube.com/results?search_query=" + search)}} colorScheme="teal" isDisabled={buttonWriting}>Go</Button>
                    <IconButton icon={<FaMusic />} width="25px" borderRadius="12px" onClick={() => {location.assign('https://music.youtube.com/')}}/>
                    <Button w="100px" ml={2} onClick={() => {location.assign("https://calendar.google.com/calendar/u/0/r?pli=1")}} colorScheme="red" isDisabled={false}>Give Up</Button>
                </Flex>

                <Flex style={{flexWrap: 'wrap'}} flexDirection="row" justifyContent="center" alignItems="center" mt={2} maxWidth="250px"> 
                    {
                        channel?.map((item, index) => {
                            if (item == undefined) return null
                            console.log(item)
                            return (
                                <Flex flexDirection="column" justifyContent="center" alignItems="center" flexWrap="wrap" mt={2} ml={1} mr={1}>
                                    <Button width="50px" height="50px" borderRadius="25px">
                                        <Image src={item.image} width="50px" height="50px" borderRadius="25px" onClick={() => {activateYoutube(item.link)}} style={{position: 'absolute'}}/>
                                    </Button>
                                    <IconButton width="20px" height="20px" borderRadius="10px" colorScheme="red" mt={1} onClick={() => deleteChannel(index)}>
                                        <CloseIcon style={{color: "white", width: "10px", height: "10px"}}/>
                                    </IconButton>
                                </Flex>

                            )
                        })
                    }
                </Flex>

                <IconButton icon={view ? <ViewOffIcon /> : <ViewIcon />} width="25px" height="25px" borderRadius="12px" mt={2} onClick={() => {setView(!view)}}/>
                
                {view ? 
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Text fontSize="16px" mt={2} textAlign="center">Insert your Favorite Channels Below (Beta):</Text>
                    <Text mt={2}>Channel Image Link</Text>
                    <Input placeholder="Channel Image Link" width="200px" type="text" mt={2} value={channelLink} onChange={(e) => {setChannelLink(e.target.value)}}/>
                    <Text mt={2}>Channel Link</Text>
                    <Input placeholder="Channel Link" width="200px" type="text" mt={2} value={channelImageLink} onChange={(e) => {setChannelImageLink(e.target.value)}}/>
                    <Button mt={4} onClick={() => {registerNewChannel(channelLink, channelImageLink)}}>Register Channel</Button>
                </Flex>
                :
                <></>}
            </Box>
        </ChakraProvider>
    );
}

render(<App />, document.getElementById('react-target'));