import os
from time import sleep
from random import randint
from sys import platform


cells = []

if platform == "windows":
    clear_cmd = "cmd /c cls"
else:
    clear_cmd = "clear"

print("Select the starting state of the game:")
print("[r] Random")
print("[f] From file")
start_state = str(input(">"))


if start_state == "r":
    for i in range(50):
        cells.append([])
        for j in range(50):
            cells[i].append(randint(0, 1))
elif start_state == "f":
    with open("setup.txt", "r") as f:
        lines = f.readlines()[3:]
        for i in range(len(lines)-1):
            lines[i] = lines[i][:-1]
        coords = []

        for i in range(len(lines)):
            coords.append([])
            coords[i].append(int(lines[i][:lines[i].find(",")]))
            coords[i].append(int(lines[i][lines[i].find(",") + 1:]))

        for i in range(50):
            cells.append([])
            for j in range(50):
                cells[i].append(0)
        
        for i in range(len(coords)):
            cells[coords[i][0]][coords[i][1]] = 1
else:
    print("Invalid input.")
    quit()
try:
    print("Interval between each generation, in seconds:")
    speed = float(input(">"))
except TypeError:
    print("Invalid input.")
    quit()


WIDTH = len(cells)
HEIGHT = len(cells[0])
changes = cells.copy()

while True:

    cells = changes.copy()
    changes.clear()

    for i in range(WIDTH):
        changes.append([])
        for j in range(HEIGHT):
            if cells[i][j]:
                print("■",end=' ')
            else:
                print(" ",end=' ')
            
            live_neighbours = 0

            if 0 < i < WIDTH - 1:
                live_neighbours += cells[i-1][j]
                live_neighbours += cells[i+1][j]
                if 0 < j < HEIGHT - 1:
                    live_neighbours += cells[i-1][j-1]
                    live_neighbours += cells[  i][j-1]
                    live_neighbours += cells[i+1][j-1]
                    live_neighbours += cells[i-1][j+1]
                    live_neighbours += cells[  i][j+1]
                    live_neighbours += cells[i+1][j+1]
                elif j == 0:
                    live_neighbours += cells[i-1][j+1]
                    live_neighbours += cells[  i][j+1]
                    live_neighbours += cells[i+1][j+1]
                else:
                    live_neighbours += cells[i-1][j-1]
                    live_neighbours += cells[  i][j-1]
                    live_neighbours += cells[i+1][j-1]
            elif i == 0:
                live_neighbours += cells[i+1][j]
                if 0 < j < HEIGHT - 1:
                    live_neighbours += cells[  i][j-1]
                    live_neighbours += cells[i+1][j-1]
                    live_neighbours += cells[  i][j+1]
                    live_neighbours += cells[i+1][j+1]
                elif j == 0:
                    live_neighbours += cells[  i][j+1]
                    live_neighbours += cells[i+1][j+1]
                else:
                    live_neighbours += cells[  i][j-1]
                    live_neighbours += cells[i+1][j-1]
            else:
                live_neighbours += cells[i-1][j]
                if 0 < j < HEIGHT - 1:
                    live_neighbours += cells[i-1][j-1]
                    live_neighbours += cells[  i][j-1]
                    live_neighbours += cells[i-1][j+1]
                    live_neighbours += cells[  i][j+1]
                elif j == 0:
                    live_neighbours += cells[i-1][j+1]
                    live_neighbours += cells[  i][j+1]
                else:
                    live_neighbours += cells[i-1][j-1]
                    live_neighbours += cells[  i][j-1]

            if cells[i][j] == 1:
                if live_neighbours < 2 or live_neighbours > 3:
                    changes[i].append(0)
                elif 2 <= live_neighbours <= 3:
                    changes[i].append(1)
            elif cells[i][j] == 0:
                if live_neighbours == 3:
                    changes[i].append(1)
                else:
                    changes[i].append(0)

        print()
    sleep(speed)
    os.system(clear_cmd)
