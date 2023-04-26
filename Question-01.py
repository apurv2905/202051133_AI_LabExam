# Apurv Patel - 202051133
# Problem Statement - 01

import numpy as np

states = range(1, 11)
actions = ['continue', 'quit']
rewards = {1: 100, 2: 500, 3: 1000, 4: 5000, 5: 10000, 6: 50000, 7: 100000, 8: 500000, 9: 1000000, 10: 5000000}
probabilities = {1: 0.99, 2: 0.9, 3: 0.8, 4: 0.7, 5: 0.6, 6: 0.5, 7: 0.4, 8: 0.3, 9: 0.2, 10: 0.1}

Q = {}
for s in states:
    for a in actions:
        Q[(s, a)] = 0

def epsilon_greedy_policy(state, epsilon = 0.1):
    if np.random.uniform() < epsilon:
        return np.random.choice(actions)
    else:
        return max(actions, key=lambda a: Q[(state, a)])

num_episodes = 10000
gamma = 0.9
returns = {(s, a): [] for s in states for a in actions}
for i in range(num_episodes):
    episode = []
    state = 1
    while True:
        action = epsilon_greedy_policy(state)
        reward = rewards[state] if action == 'quit' else 0
        if action == 'continue':
            if np.random.uniform() < probabilities[state]:
                state += 1
            else:
                action = 'quit'
        episode.append((state, action, reward))
        if action == 'quit':
            break
    G = 0
    for t in range(len(episode)-1, -1, -1):
        state, action, reward = episode[t]
        G = gamma*G + reward
        if (state, action) not in [(x[0], x[1]) for x in episode[:t]]:
            returns[(state, action)].append(G)
            Q[(state, action)] = np.mean(returns[(state, action)])

optimal_policy = {}
value_function = {}
for s in states:
    optimal_policy[s] = max(actions, key = lambda a: Q[(s, a)])
    value_function[s] = max(Q[(s, a)] for a in actions)

print("Optimal Policy:")
print(optimal_policy)
print("Value Function:")
print(value_function)
