## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This project is a pokedex with some info about movesets and learnsets to help pokemon players to build a good pokemon team.

- On Initial screen the user can choose a pokemon to see infos about it or use the search bar to find a specific pokemon:

  ![image](https://user-images.githubusercontent.com/56899689/117062203-8d286100-acf9-11eb-9e5a-11cb93b1b123.png)

- The search bar have an auto-complete function to help the user find the right pokemon:
  
  
  ![image](https://user-images.githubusercontent.com/56899689/117062236-9d404080-acf9-11eb-9668-2a600f505c33.png)

- After chosing a pokemon the user will see the infos on screen:

  - Pokemon name, abilities, pokemon types, base stats: 
  
  ![image](https://user-images.githubusercontent.com/56899689/117062716-2a839500-acfa-11eb-913e-1c2e19ca9925.png)
  
  - Defense and offense advantage:
  
  ![image](https://user-images.githubusercontent.com/56899689/117062766-396a4780-acfa-11eb-82db-b8628a149fa2.png)
  
  - Evolution tree, in game sprite, Movesets separeted by generation and format:
  
  ![image](https://user-images.githubusercontent.com/56899689/117063158-d1683100-acfa-11eb-999f-4d72235c18d9.png)
  
  - Pokemon moves learnset separeted by Generation:
  
  ![image](https://user-images.githubusercontent.com/56899689/117063229-e5ac2e00-acfa-11eb-9280-39c2c8fe160a.png)

- Take a look on the functional App at: [PokeStrategy](https://pokestrategy.vercel.app)

## Technologies

Project is created with:

* React: 17.0.2
* NextJs: 10.1.2
* Styled-components: 5.2.2
* Polished: 4.1.1
* @pkmn/dex: 0.4.0 - For pokemon infos.
* @smogon/sets: 1.5.2 - For pokemon movesets.
* PokeApi - For pokemon infos and images.

## Setup

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Learn More


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

For more info about PokeApi, take a look at:

- [PokeApi](https://pokeapi.co/docs/v2)

For Smogon sets and dex: 

- [Sets](https://www.npmjs.com/package/@smogon/sets)

- [Dex](https://www.npmjs.com/package/@pkmn/dex)


Your feedback and contributions are welcome!
