
import os
import pandas as pd
import matplotlib.pyplot as plt


plt.style.use('ggplot')
herm_logs = pd.read_csv('logs.dsv', sep=' ', parse_dates=["time"])
print("Hermetrics logs:\n", herm_logs[:3])
leven_logs = pd.read_csv('logs2.dsv', sep=' ', parse_dates=["time"])
print("Leven logs:\n", leven_logs[:3])

print("\nСводка hermetrics по MEM:\n", herm_logs.loc[herm_logs['label'] == 'MEM']['4'].describe())
print("\nСводка leven по MEM:\n", leven_logs.loc[leven_logs['label'] == 'MEM']['4'].describe())
print("\nСводка hermetrics по CPU:\n", herm_logs.loc[herm_logs['label'] == 'CPU']['4'].describe())
print("\nСводка leven по CPU:\n", leven_logs.loc[leven_logs['label'] == 'CPU']['4'].describe())

fig, ax = plt.subplots(1, 2, sharey=True)
fig.suptitle('CPU comparison', fontsize=16)

herm_logs.loc[herm_logs['label'] == 'CPU'].plot(kind='line', x='time', y='4', ax=ax[0], linestyle='-', linewidth=1,
                                                color='r')
ax[0].legend(['Hermetrics'])

leven_logs.loc[leven_logs['label'] == 'CPU'].plot(kind='line', x='time', y='4', ax=ax[1], linestyle='-', linewidth=1,
                                                color='g')
ax[1].legend(['leven'])

plt.tight_layout()
plt.gcf().autofmt_xdate()
plt.show()
if not os.path.exists('cpu.png'):
    fig.savefig('cpu.png')
else:
    os.remove('cpu.png')
    fig.savefig('cpu.png')

fig, ax = plt.subplots(1, 2)
fig.suptitle('MEM comparison', fontsize=16)

herm_logs.loc[herm_logs['label'] == 'MEM'].plot(kind='line', x='time', y='4', ax=ax[0], linestyle='-', linewidth=1,
                                                color='r')
ax[0].legend(['Hermetrics'])

leven_logs.loc[leven_logs['label'] == 'MEM'].plot(kind='line', x='time', y='4', ax=ax[1], linestyle='-', linewidth=1,
                                                color='g')
ax[1].legend(['leven'])

plt.tight_layout()
plt.gcf().autofmt_xdate()
plt.show()
if not os.path.exists('mem.png'):
    fig.savefig('mem.png')
else:
    os.remove('mem.png')
    fig.savefig('mem.png')
