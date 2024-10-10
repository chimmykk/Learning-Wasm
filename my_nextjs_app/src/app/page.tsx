"use client"; // Ensure this component is treated as a client component
import { useEffect, useState } from 'react';
import init, { InitOutput } from '../../src/app/pkg/wasmtest.js'; // Ensure correct import

export default function Home() {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const loadWasm = async () => {
            try {
                // Initialize the WASM module
                const { greet, memory }: InitOutput = await init(); // Destructure InitOutput

                const greetingPtr = greet(); // Call the greet function

                // Assuming the length of the string is known
                const greetingLength = 30; // Adjust this as necessary
                const greetingArray = new Uint8Array(memory.buffer, greetingPtr, greetingLength);

                // Decode the greeting using TextDecoder and handle null characters
                const greetingStr = new TextDecoder("utf-8").decode(greetingArray).replace(/\0/g, '');
                
                // Update state with the greeting
                setGreeting(greetingStr);
            } catch (error) {
                console.error("Error loading WASM:", error);
            }
        };

        loadWasm();
    }, []);

    return (
        <div>
            <h1>Rust WebAssembly in Next.js</h1>
            <p>{greeting}</p>
        </div>
    );
}
