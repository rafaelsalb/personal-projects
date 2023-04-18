class Memory
{
    header = [];
    blocks = [];
    label = "Memória Principal";

    constructor(capacity)
    {
        this.header.push(new HeaderCell("Bloco", "Palavra"));
        for(let i = 0; i < 4; i++)
        {
            this.header.push(new Cell(i));
        }
        for(let i = 0; i < capacity / size_of_block; i++)
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

}

class Cache extends Memory
{
    constructor(capacity)
    {
        super();
        this.label = "Memória Cache";
        this.header[0] = new HeaderCell("Linha", "Palavra");

        this.clear()

        this.header.push(new Cell("TAG"));
        for(let i = 0; i < capacity / size_of_block; i++)
        {
            this.blocks.push(new CacheLine(i.toString(16)));
        }
    }

}
