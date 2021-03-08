
import os
from random import randint
import string


def mk_file(name, rows, cols, rdata):
    with open(name + ".txt", "w+") as file:
        for row in range(rows):
            line = ''
            for col in range(cols):
                line += rdata[randint(0, len(rdata)-1)]
            if row == rows - 1:
                file.write(line)
            else:
                file.write(line + '\n')


let_dig = string.ascii_letters + string.digits
row_num = 6000
col_num = 100

mk_file('1', row_num, col_num, let_dig)
mk_file('2', row_num, col_num, let_dig)
