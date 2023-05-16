const cell_width = 64;
const cell_height = 32;
const mem_capacity_Bytes = 64;
const block_size = 4;
const cache_capacity_Bytes = 16;

const METHODS = {
    direct: 0,
    associative: 1,
    associative_by_blocks: 2
};
const mapping_policies = ["random", "LFU", "LRU"];

let curr_method = METHODS.direct;

let method_name = (m) => {
    switch(m)
    {
        case "0":
            return "Direto";
        case "1":
            return "Associativo";
        case "2":
            return "Associativo em blocos";
        default:
            return null;
    }
}
