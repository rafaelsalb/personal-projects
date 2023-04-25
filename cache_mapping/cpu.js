class CPU
{
    memory;
    cache;
    address_in;
    data_out;

    constructor(memory, cache)
    {
        this.memory = memory;
        this.cache = cache;
    }

    draw()
    {
        stroke(255);
        strokeWeight(2);
        fill(127);
        rect(0, 0, 64, 64);

        textAlign(CENTER, CENTER);
        textSize(24);
        strokeWeight(1);
        fill(255);
        text("CPU", 32, 32);

        // strokeWeight(0);
        // textAlign(RIGHT, BOTTOM);
        // textSize(20);
        // text("T|B|P", 0, 0);

        if(this.address_in != null)
        {
            strokeWeight(0);

            textAlign(RIGHT, CENTER);
            textSize(20);
            text(this.address_in, -4, 32);

            textAlign(LEFT, CENTER);
            text(this.data_out, 68, 32);
        }
    }

    read(address)
    {
        const binary = Utils.toBinary(address, 6);
        const tag = parseInt(binary.slice(0, 2), 2);
        const block = parseInt(binary.slice(2, 4), 2);
        const index = parseInt(binary.slice(4, 6), 2);

        this.address_in = binary + " => ";

        if(this.cache.is_cache_hit(tag, block))
        {
            console.log("Cache hit")
            this.data_out = " => " + this.cache.blocks[block].cells[index + 1].data;
            return this.cache.blocks[block].cells[index + 1].data;
        }

        console.log("Cache miss");
        for(let i = 1; i < 5; i++)
        {
            this.cache.blocks[block].cells[i] = this.memory.blocks[tag * block_size + block].cells[i];
        }
        this.cache.blocks[block].cells[5].data = tag;
        this.data_out = " => " +  this.memory.blocks[tag * block_size + block].cells[index + 1].data;
        return this.memory.blocks[tag * block_size + block].cells[index + 1].data;
    }

}