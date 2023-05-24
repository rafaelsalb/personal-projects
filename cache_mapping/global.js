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
const METHOD_NAMES = ["Direto", "Associativo", "Associativo em blocos"];
let curr_method = METHODS.direct;

const POLICIES = {
    random: 0,
    LFU: 1,
    LRU: 2
};
const POLICY_NAMES = ["Random", "Least Frequently Used (LFU)", "Least Recently Used (LRU)"];
let curr_policy = POLICIES.random;
