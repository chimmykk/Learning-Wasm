

use wasm_bindgen::prelude::*;

// This function can be called from JavaScript
#[wasm_bindgen]
pub fn greet() -> *const u8 {
    let greeting = "Hello, from Rust WebAssembly!";
    greeting.as_ptr()
}
