class Memory
{
    header = [];
    blocks = [];
    label = "Memória Principal";

    constructor(capacity, cache)
    {
        this.header.push(new HeaderCell("Bloco", "Palavra"));
        for(let i = 0; i < 4; i++)
        {
            this.header.push(new Cell(i));
        }
        for(let i = 0; i < capacity / block_size; i++)
        {
            this.blocks.push(new MemoryBlock(i.toString(16)));
        }
    }

    draw()
    {
        push();
        textSize(24);
        textAlign(LEFT, TOP);
        strokeWeight(0);
        fill(255);
        text(this.label, 0, 0);
        pop();

        for(let i = 0; i < this.header.length; i++)
        {
            push();
            translate(cell_width * i, 30);
            this.header[i].draw();
            pop();
        }
        for(let i = 0; i < this.blocks.length; i++)
        {
            push();
            translate(0, 30 + cell_height + cell_height * i);
            this.blocks[i].draw();
            pop();
        }
    }

    clear()
    {
        for(let i = 0; i < this.blocks.length; i++)
        {
            for(let j = 1; j < 5; j++)
            {
                this.blocks[i].cells[j].data = "0x00";
            }
        }
    }

    search(address)
    {
        const binary = Utils.toBinary(address, 6);
        const tag = parseInt(binary.slice(0, 2), 2);
        const block = parseInt(binary.slice(2, 4), 2);
        const index = parseInt(binary.slice(4, 6), 2);

        return this.blocks[tag * block_size + block].cells[index + 1];
    }

}

class Cache extends Memory
{
    constructor(capacity)
    {
        super();
        this.label = "Memória Cache";
        this.header[0] = new HeaderCell("Linha", "Palavra");

        this.header.push(new Cell("TAG"));
        for(let i = 0; i < capacity / block_size; i++)
        {
            this.blocks.push(new CacheLine(i.toString(16)));
        }

        this.clear()
    }

    is_cache_hit(tag, block)
    {
        return this.blocks[block].cells[5].data === tag;
    }

}
