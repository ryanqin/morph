import {types} from "../asEditor";


/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
const initialState = {
    module:'export function handleEvent(esig: Uint8Array, topic1: Uint8Array, topic2: Uint8Array, topic3: Uint8Array, data: Uint8Array): Uint8Array {\n' +
        '    var source = changetype<Bytes>(data);\n' +
        '    let reserve0 = source.slice(31, 32);\n' +
        '    let reserve1 = source.slice(63, 64);\n' +
        '\n' +
        '    let state = Bytes.new(32);\n' +
        '    state[31] = reserve0.toU32() / reserve1.toU32();\n' +
        '    return state as Uint8Array;\n' +
        '}\n',
    library: 'export function zkmain(): void {\n' +
        '    var esig = read_bytes_from_u64(32);\n' +
        '    var topic1 = read_bytes_from_u64(32);\n' +
        '    var topic2 = read_bytes_from_u64(32);\n' +
        '    var topic3 = read_bytes_from_u64(32);\n' +
        '    var data = read_len_then_bytes()\n' +
        '\n' +
        '    var expected_output = read_bytes_from_u64(32);\n' +
        '\n' +
        '    var output = handleEvent(esig as Uint8Array, topic1 as Uint8Array, topic2 as Uint8Array, topic3 as Uint8Array, data as Uint8Array) as Bytes;\n' +
        '\n' +
        '    require(output == expected_output);\n' +
        '}\n' +
        '\n' +
        '\n' +
        '/**\n' +
        ' * dereference helper\n' +
        ' */\n' +
        'class PtrDeref {\n' +
        '    data: usize\n' +
        '    static read(ptr: usize): usize {\n' +
        '        return changetype<PtrDeref>(ptr).data;\n' +
        '    }\n' +
        '    static write(ptr: usize, val: usize): void {\n' +
        '        changetype<PtrDeref>(ptr).data = val;\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        '/**\n' +
        ' * Uint8Array with clean \'new\' and fill without memory.fill\n' +
        ' */\n' +
        'class Bytes extends Uint8Array {\n' +
        '    // clean/unsafe version of new Array<u8>(_len)\n' +
        '    static new(_len: i32): Bytes {\n' +
        '        // alloc Array<u8> mem\n' +
        '        var _bytes_ptr = heap.alloc(12); // offsetof<B>() == 12\n' +
        '        // alloc data mem\n' +
        '        var _arr_heap_ptr = heap.alloc(_len)\n' +
        '        // write data ptr to the 0th, 1st fields of Array<u8>\n' +
        '        PtrDeref.write(_bytes_ptr, _arr_heap_ptr);\n' +
        '        PtrDeref.write(_bytes_ptr + 4, _arr_heap_ptr);\n' +
        '\n' +
        '        var _bytes = changetype<Bytes>(_bytes_ptr);\n' +
        '        // write data len to the 2nd, 3rd fields of Array<u8>, equivalent to .length=_len\n' +
        '        PtrDeref.write(_bytes_ptr + 8, _len);\n' +
        '        return _bytes;\n' +
        '    }\n' +
        '    fill(_val: u8 = 0): void {\n' +
        '        for (var i: i32 = 0; i < this.length; i++) {\n' +
        '            this[i] = _val;\n' +
        '        }\n' +
        '        // this.arr.fill(_val)\n' +
        '    }\n' +
        '\n' +
        '    slice(start: i32, end: i32): Bytes {\n' +
        '        if (start < 0 || end < 0 || start > this.length || end > this.length || start >= end) {\n' +
        '            return Bytes.new(0);\n' +
        '            // throw new Error("Invalid slice parameters");\n' +
        '        }\n' +
        '\n' +
        '        const len = end - start;\n' +
        '        var dst = Bytes.new(len);\n' +
        '        for (let i: i32 = 0; i < len; i++) {\n' +
        '            dst[i] = this[start + i];\n' +
        '        }\n' +
        '\n' +
        '        return dst\n' +
        '    }\n' +
        '\n' +
        '    toU32(): u32 {\n' +
        '        assert(this.length <= 4);\n' +
        '        var rst: u32 = 0;\n' +
        '        for (var i = 0; i < min(4, this.length); i++) {\n' +
        '            rst = rst << 8;\n' +
        '            rst += this[i];\n' +
        '        }\n' +
        '        return rst;\n' +
        '    }\n' +
        '\n' +
        '    @operator(\'==\')\n' +
        '    __opeq(right: Bytes): bool {\n' +
        '        if (this.length != right.length) {\n' +
        '            // console.log(this.length.toString() + \'---\' + right.length.toString());\n' +
        '            return false;\n' +
        '        }\n' +
        '        for (var i = 0; i < this.length; i++) {\n' +
        '            if (this[i] != right[i]) {\n' +
        '                return false;\n' +
        '            }\n' +
        '        }\n' +
        '        return true;\n' +
        '    }\n' +
        '\n' +
        '}\n' +
        '\n' +
        '// used in asc to rm env.abort\n' +
        'function abort(a:usize, b:usize, c:u32, d:u32):void{}\n' +
        '\n' +
        '@external("env", "wasm_input")\n' +
        'declare function wasm_input(x: i32): i64\n' +
        '\n' +
        '@external("env", "require")\n' +
        'export declare function require(x: i32): void\n' +
        '\n' +
        'export function wasm_private_input(): i64\n' +
        '{\n' +
        '  return wasm_input(0);\n' +
        '}\n' +
        '\n' +
        'export function wasm_public_input(): i64\n' +
        '{\n' +
        '  return wasm_input(1);\n' +
        '}\n' +
        '\n' +
        'export function read_bytes_from_u64_to_dst(dst: Bytes, byte_length: i32): Bytes {\n' +
        '    var dst64 = changetype<Uint64Array>(dst);\n' +
        '    for (var i:i32 = 0; i * 8 < byte_length; i++)\n' +
        '    {\n' +
        '        if (i * 8 + 8 < byte_length)\n' +
        '        {\n' +
        '            dst64[i] = wasm_private_input();\n' +
        '        }\n' +
        '        else\n' +
        '        {\n' +
        '            // less then 8 bytes on demand\n' +
        '            var u64_cache = wasm_private_input();\n' +
        '            var u8_cache: i64 = u64_cache;\n' +
        '            for (var j:i32 = i * 8; j < byte_length; j++)\n' +
        '            {\n' +
        '                let u8_t =  u8_cache as u8;\n' +
        '                dst[j] = u8_t;\n' +
        '                u8_cache = u8_cache >> 8\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '    return dst;\n' +
        '}\n' +
        '\n' +
        'export function read_bytes_from_u64(byte_length: i32): Bytes {\n' +
        '    var dst = Bytes.new(byte_length);\n' +
        '    read_bytes_from_u64_to_dst(dst, byte_length);\n' +
        '    return dst;\n' +
        '}\n' +
        '\n' +
        'export function read_len_then_bytes(): Bytes {\n' +
        '    var blen = wasm_private_input() as i32;\n' +
        '    var bytes = read_bytes_from_u64(blen);\n' +
        '    return bytes;\n' +
        '}\n',
    compile: "",
    moduleWasm: null
}

export const schema = {
    name: "asEditor",
    id: "id",
};


/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ASEDITOR_CODE:
            switch (action.payload.asEditorCurrentTab){
                case "module":
                    return {...state, module: action.payload.value, compile: ""};
                case "library":
                    return {...state, library: action.payload.value, compile: ""};
                case "compile":
                    return {...state, compile: action.payload.value};
                case "moduleWasm":
                    return {...state, moduleWasm: action.payload.value.toString()};
                default:
                    return {...state}
            }
        default:
            return state;
    }
}

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getAsEditor = (state) => {
    return state.entities.asEditor
}

