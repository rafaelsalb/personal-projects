class Memory
{
    header = [];
    blocks = [];
    cells = [];
    size = 0;
    pos = new p5.Vector();

    constructor(x, y, size)
    {
        this.header.push(new HeaderCell(x, y, "Bloco", "Palavra"));

        for(let i = 1; i < 5; i++)
        {
            this.header.push(new Cell(x + i * cell_width, y, i - 1));
            // this.header[i].set_data(i - 1);
        }

        for(let i = 0; i < size / 4; i++)
        {
            this.blocks.push(new Cell(x, cell_height + y + i * cell_height, "r"));
            this.blocks[i].set_data(i.toString(16));
            for(let j = 1; j < 5; j++) {
                this.size = this.cells.push(new Cell(x + j * cell_width, cell_height + y + i * cell_height, "r"));
            }
        }
    }

    draw()
    {
        for(let i = 0; i < this.header.length; i++)
        {
            this.header[i].draw();
        }
        for(let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].draw();
        }
        for(let i = 0; i < this.cells.length; i++)
        {
            this.cells[i].draw();
        }
    }
}

class Cache extends Memory
{
    constructor(x, y, size)
    {
        super(x, y, size);
        this.header[0].set_data("Linha", "Palavra");

        for(let i = 0; i < size; i++)
        {
            this.cells[i].set_data("");
        }
    }
}