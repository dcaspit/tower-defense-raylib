## General Tasks
- [x] See Grid of map
- [x] Place towers across the map
- [ ] Upgrade towers
- [x] Base that enemies hit and lower health
- [ ] Enemy hit base animation
- [ ] Projectile hit enemy animation

### Game Control (right view panel)
- [x] Start level
- [x] Pause level
- [ ] Quit level

### Game Systems
- [ ] Money
  - [x] Killing Enemies
    - [x] Disable the money earning from death by Base collision
  - [ ] Complete a wave
- [ ] Shop
  - [ ] Buy towers
  - [ ] Upgrade towers - more power
  - [ ] Upgrade Base - more health
  - [ ] Slow all enemies movement Perk
- [ ] Health (tries per level)

### Levels 
- [ ] Add 10 waves for the same map

### Main Menu 
- [ ] Start Game
- [ ] Leader Board
- [ ] Quit

## Bugs
- [x] We can put more then 1 tower in the same spot
- [x] Enemies not being fired immediatly when entering a circle around a tower
- [x] Not sure - It seems that many towers not damage enemy as expected
- [x] Enemies don't die

## Tech Debts 
- [ ] Create one class for waves.
    - [ ] Class will get configuration of wave -> (spawnTime, monstersPerSpawn). // monstersPerSpawn <= spawnTime
- [ ] Create 10 Configuration waves. 

## Sprites 
- [ ] Walking Enemy 
    - [ ] Left
    - [ ] right
    - [ ] Top
    - [ ] Bottom
- [ ] Towers
    - [ ] First level tower
    - [ ] Second level tower
    - [ ] Third level tower
    - [ ] Fourth level tower
    - [ ] Fifth level tower
- [ ] Base
    - Five leves bases (like tower)

## Investigation
- [x] Investigate another games and see what they are doing when enemies stack at the end of the path. are they overlap each other or lined up?  
    - Decided to kill enemies when they reach the base

## Nice to have
- [ ] Cards each wave for perks (Pick a perk each wave)

