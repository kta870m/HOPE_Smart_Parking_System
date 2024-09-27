import './chatbot.css'
import '@radix-ui/themes/styles.css'
import {Box, Text, TextField, IconButton, Separator, Flex,Grid, ScrollArea,Card} from '@radix-ui/themes';
import RunChat from '../assets/chatbot';
import Loading from './loading.jsx'
import VoiceInput from './voiceinput.jsx'
import {PaperPlaneIcon,ChatBubbleIcon } from '@radix-ui/react-icons'
import { useState, useRef } from 'react';

function ChatBot(props) {
    const [prompt,setPrompt] = useState('');
    const [question,setQuestion] = useState(null);
    const [answer,setAnswer] = useState("");
    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };
    const Ask = async () => {
        setQuestion(prompt)
        setAnswer(null);
        const result = await RunChat(prompt);
        setAnswer(result);
    }
    function reFormat(text) {
        // Escape HTML special characters
        const escapeHTML = (str) => {
            return str.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#39;');
        };
    
        // Convert Markdown-like syntax to HTML
        const convertMarkdownToHTML = (str) => {
            // Convert bold text (**) to <strong>
            str = str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            // Convert italic text (*) to <em>
            str = str.replace(/\*(.+?)\*/g, '<em>$1</em>');
            // Convert newline to <br>
            str = str.replace(/\n/g, '<br>');
            // Convert ordered list (1. ) to <ol> and <li>
            str = str.replace(/(\d+)\.\s+(.+?)(?=<br>|\n|$)/g, '<li>$2</li>');
            // Convert unordered list (*) to <ul> and <li>
            str = str.replace(/\*\s+(.+?)(?=<br>|\n|$)/g, '<li>$1</li>');
            // Wrap <li> elements with <ul> or <ol>
            str = str.replace(/(<li>.*?<\/li>)(?=<li>|\s*$)/g, (match) => {
                return `<ul>${match}</ul>`;
            });
    
            // Convert URLs to links
            str = str.replace(/(http?:\/\/[^\s#]+)/g, '<a href="$1" target="_blank">$1</a>');
            
            return str;
        };
    
        // Escape HTML to prevent XSS attacks
        const escapedText = escapeHTML(text);
        // Convert Markdown-like syntax to HTML
        const htmlText = convertMarkdownToHTML(escapedText);
    
        // Wrap in a container div for styling
        return `<div class="chatbot-output">${htmlText}</div>`;
    }
    
    const initial = <Box>
        <Text style={{fontSize:30}} as="div" size="5" align="center"><span className='gradienttext'>Welcome Back</span></Text>
        <Text as="div" size="5" align="center">How can I help you today?</Text>
        <Grid className='sidecontent' columns="4" gap="3" rows="repeat(0, 5px)" width="auto" style={{marginTop:30}}>
            <Box>
                <Card size='1'>
                    <Text as="div" size="2" weight="bold">Account</Text>
                    <Text color='gray' size="2">How to create and log into an account</Text>
                </Card>
            </Box>
            <Box>
                <Card size='1'>
                <Text as="div" size="2" weight="bold">Booking</Text>
                <Text color='gray' size="2">How to reserve and manage a parking space</Text>
                </Card>
            </Box>
            <Box>
                <Card size='1'>
                <Text as="div" size="2" weight="bold">Vehicles</Text>
                <Text color='gray' size="2">What kind of vehicles does the system support</Text>
                </Card>
            </Box>
            <Box>
                <Card size='1'>
                <Text as="div" size="2" weight="bold">About</Text>
                <Text color='gray' size="2">Tell me more about the creator of the system</Text>
                </Card>
            </Box>
        </Grid>
    </Box>
    const questiondisplay = question != null ? <><Text as="div" size="2" weight="bold">You</Text><Text as="div" size="2" style={{marginBottom:20}}>{question}</Text></> : initial;
    const answerdisplay = answer != null ? answer != "" ? <><Text as="div" size="2" weight="bold">Assistant</Text><Text size="2" dangerouslySetInnerHTML={{ __html: reFormat(answer) }}></Text></>: null : <Loading></Loading>
    return (
        <Box>
            <Text size="5">Assistant</Text>
            <Separator className='separator' size="4"></Separator>
            
            
            <Grid columns="1" gap="0" rows="repeat(0, 5px)" width="auto">
                <ScrollArea scrollbars="vertical" style={{ height: 500 }}>
                {questiondisplay}
                {answerdisplay}
                </ScrollArea>
                <Flex gap="2">
                    <TextField.Root placeholder="Ask me something…" size="2" style={{ width: 5000 }} value={prompt} onChange={handlePromptChange}>
                        <TextField.Slot>
                            <ChatBubbleIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Slot>
                            <VoiceInput setter={setPrompt}></VoiceInput>
                        </TextField.Slot>
                    </TextField.Root>
                    <IconButton onClick={Ask}>
                        <PaperPlaneIcon width="18" height="18" />
                    </IconButton>
                </Flex>
            </Grid>
        </Box>
    )
}

export default ChatBot
