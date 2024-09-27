
import '@radix-ui/themes/styles.css'
import {Dialog} from '@radix-ui/themes';
import { useState} from 'react';

function VoiceInput(props) {
    const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const [recognition, setRecognition] = useState(new SpeechRecognition());

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onresult = (event) => {
      console.log(event);
      const { transcript, confidence } = event.results[0][0];
      setTranscript(transcript);
      setConfidence(confidence);
      console.log(event.results[0][0]);
      if(props.setter){
        props.setter(event.results[0][0].transcript);
      }
    };

    const start = () => {
      recognition.start();
    };

    const stop = () => {
      recognition.onspeechend();
    };

    return (
      <Dialog.Root>
        <Dialog.Trigger>
        <svg onClick={!isListening ? start : stop} xmlns="http://www.w3.org/2000/svg" width="16" height="16" color={ isListening ? "tomato" : "darkgray"} fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
        </svg>
        </Dialog.Trigger>
      </Dialog.Root>
    )
}

export default VoiceInput