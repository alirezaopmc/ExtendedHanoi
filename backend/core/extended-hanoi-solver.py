import sys
output = ''

# Env Options

debug = False

# Env Options

arguments = sys.argv
hanoiString = ''
if len(arguments) > 1:
    hanoiString = arguments[1].split('-')
# hanoiString = '3,4-1,2-5,6'.split('-')
    
bars = list(map(lambda r: list(map(int, r.split(','))), hanoiString))
for x in bars:
    x.reverse()
n = len(bars[0]) + len(bars[1]) + len(bars[2])
found = 0
current_bar = -1
fount_at = -1

def look_up():
    for i in range(len(bars)):
        if len(bars[i]) > 0:
            if bars[i][-1] == found + 1:
                return i


def move(from_bar : int, to_bar : int):
    global output
    bars[to_bar].append(bars[from_bar].pop())
    output += str(from_bar) + str(to_bar) + ','
    if debug: print('moved {} to {}'.format(from_bar, to_bar))


def move_stack(from_bar :int, to_bar :int, count :int):
    if count == 1:
        move(from_bar, to_bar)
    else:
        move_stack(from_bar, 3-from_bar-to_bar, count-1)
        move(from_bar, to_bar)
        move_stack(3-from_bar-to_bar, to_bar, count-1)


def update():
    i = 1
    while i <= len(bars[current_bar]):
        if bars[current_bar][-i] == i:
            i += 1
        else:
            break
    return i-1

def is_done():
    for i in range(len(bars)):
        if len(bars[i]) == n:
            return True
    return False


while not is_done():
    current_bar = look_up() if current_bar == -1 else found_at
    found = update()
    found_at = look_up()
    move_stack(current_bar, found_at, found)
    found = update()

if debug: print(bars)


print(output)








    

