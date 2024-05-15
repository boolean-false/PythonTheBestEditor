import React, {useEffect, useRef} from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import './Editor.css';
import {Howl} from 'howler';

import bac1 from '../../sounds/bac/bac1.mp3';
import bac2 from '../../sounds/bac/bac2.mp3';
import bac3 from '../../sounds/bac/bac3.mp3';

import bam1 from '../../sounds/bam/bam1.mp3';
import bam2 from '../../sounds/bam/bam2.mp3';

import blyaaa from '../../sounds/blyaaaa.mp3';

import python_suka from '../../sounds/python_suka.mp3';


import ReactCodeMirror from "@uiw/react-codemirror";
import {python} from "@codemirror/lang-python";

const bacSound = [bac1, bac2, bac3];

const bamSound = [bam1, bam2];

const blyaaaSound = [blyaaa];
const pythonSukaSound = [python_suka];

const Editor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const currentSound = useRef<Howl | null>(null);

    const playSound = (sounds: string[], overwrite: Boolean = true) => {
        if (currentSound.current && overwrite) {
            currentSound.current.stop();
        }
        const sound = new Howl({
            src: [sounds[Math.floor(Math.random() * sounds.length)]],
        });

        if (overwrite) currentSound.current = sound;
        sound.play();
    };

    useEffect(() => {

        // playSound(blyaaaSound, false)

        const handleKeyDown = (event: KeyboardEvent) => {
            if (editorRef.current && editorRef.current.contains(event.target as Node)) {
                if (event.key === "Tab") {
                    return playSound(bamSound, false);
                }

                if (event.key === "Enter") {
                    return playSound(bamSound, false);
                }

                const chance = Math.random() * 100
                if (chance < 5) {
                    return playSound(pythonSukaSound, false);
                }
                playSound(bacSound);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // const handleEditorChange = (value: string) => {
    //     setEditorValue(value);
    // };

    return (
        <div className="editor-container" ref={editorRef}>
            <ReactCodeMirror
                value=""
                extensions={[python()]}
                theme="light"
                // onChange={(value) => handleEditorChange(value)}
            />
        </div>
    );
}

export default Editor;