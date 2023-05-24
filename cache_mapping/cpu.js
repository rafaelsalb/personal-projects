class CPU
{
    memory;
    cache;
    address_in;
    data_out;
    is_cache_hit;

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

        if(this.address_in != null)
        {
            strokeWeight(0);
            textSize(20);

            if(this.is_cache_hit)
            {
                text("Cache hit", 32, 80);
            }
            else
            {
                text("Cache miss", 32, 80);
            }

            let t = this.address_in.slice(0, 2) + " " + this.address_in.slice(2, 4) + " " + this.address_in.slice(4, 6) + " =>";

            push();
            strokeWeight(0);
            textAlign(RIGHT, CENTER);
            textSize(20);
            text(t, -4, 32);

            push();
            textAlign(LEFT, CENTER);
            rotate(-PI/2);
            text("TAG", -16, -98);
            pop();

            push();
            textAlign(LEFT, CENTER);
            rotate(-PI/2);
            text("BLOCO", -16, -71);
            pop();

            push();
            textAlign(LEFT, CENTER);
            rotate(-PI/2);
            text("PALAVRA", -16, -42);
            pop();

            pop();

            textSize(20);

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
        this.is_cache_hit = false;

        for(let i = 0; i < this.memory.blocks.length; i++)
        {
            for(let j = 0; j < this.memory.blocks[i].cells.length; j++)
            {
                this.memory.blocks[i].cells[j].cell_color = 127;
            }
        }

        if(this.cache.is_cache_hit(tag, block))
        {
            for(let i = 1; i < 5; i++)
            {
                this.memory.blocks[tag * block_size + block].cells[i].cell_color = color(64, 127, 64);
            }
            this.memory.blocks[tag * block_size + block].cells[index + 1].cell_color = color(127, 255, 127);
            this.data_out = " => " + this.cache.blocks[block].cells[index + 1].data;
            this.is_cache_hit = true;
            return this.cache.blocks[block].cells[index + 1].data;
        }

        console.log("Cache miss");
        for(let i = 1; i < 5; i++)
        {
            this.memory.blocks[tag * block_size + block].cells[i].cell_color = color(127, 64, 64);
            this.cache.blocks[block].cells[i] = this.memory.blocks[tag * block_size + block].cells[i];
        }
        this.memory.blocks[tag * block_size + block].cells[index + 1].cell_color = color(255, 127, 127);
        this.cache.blocks[block].cells[5].data = tag;
        this.data_out = " => " +  this.memory.blocks[tag * block_size + block].cells[index + 1].data;
        return this.memory.blocks[tag * block_size + block].cells[index + 1].data;
    }

}