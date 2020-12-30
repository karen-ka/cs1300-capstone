export const gameinfo = {
  1: {
    "name" : "Beginner DnD",
    "price": 20,
    "day": "Monday/Wednesday",
    "time": "9pm",
    "difficulty": "Easy",
    "info": "Welcome to DnD! This game is suitable for first-time players or those wanting to brush up their dragon slaying skills.",
    "host" : "Alex",
    "hostid": "123",
    "datetime": "",
    "gametype": "DnD",
    "logo": './game_logos/dnd.png',
    "location": "Zoom",
    "gameID": 1
  },
  2: {
    "name" : "Intermediate Magic: the Gathering",
    "price": 10,
    "day": "Tuesday/Thursday",
    "time": "6pm",
    "difficulty": "Medium",
    "info": "Welcome to Magic! This game is suitable for intermediate players. We allow all decks/expansions.",
    "host" : "Brian",
    "hostid": "111",
    "datetime": "",
    "gametype": "Magic",
    "logo": './game_logos/magic.jpg',
    "location": "Zoom",
    "gameID": 2
  },
  3: {
    "name" : "Advanced Magic: the Gathering",
    "price": 25,
    "day": "Tuesday/Saturday",
    "time": "2pm",
    "difficulty": "Medium",
    "info": "This game is suitable for advanced players. We allow all decks/expansions.",
    "host" : "Tanvir",
    "hostid": "420",
    "datetime": "",
    "gametype": "Magic",
    "logo": './game_logos/magic.jpg',
    "location": "Zoom",
    "gameID": 3
  },
  4: {
    "name" : "Pandemic",
    "price": 25,
    "day": "Tuesday",
    "time": "2pm",
    "difficulty": "Easy",
    "info": "This game is suitable for casual players.",
    "host" : "Tanvir",
    "hostid": "420",
    "datetime": "",
    "gametype": "Pandemic",
    "logo": './game_logos/pandemic.jpg',
    "location": "Zoom",
    "gameID": 4
  },
}

export const hostData = {
  123: {
    "name": "Alex",
    "rating": 5.0,
    "numrating": 1,
    "intro": "whats good fam",
    "reviews": [1,2,3],
    "about": "Hey! I'm Alex. I first got into tabletop games back in the 90's, and now I try to share this experience with others on this platform.",
    "numberOfGames": 56,
    "gamesHosted": ["DnD"],
    "style": "I try to add some humor to all my game sessions to help break the ice so if you are into corny jokes, please join my session!"
  },
  111: {
    "name": "Brian",
    "rating": 2.0,
    "numrating": 2,
    "intro": "whats good fam",
    "reviews": [1,4,5],
    "about": "I'm Brian, and I come from the small town of Columbus, Ohio where I grew up playing tabletop games everyday. Now, I try to host games online to get more people into this field!",
    "numberOfGames": 5,
    "gamesHosted": ["DnD", "Magic: The Gathering"],
    "style": "I personally try to make each of my games unique by adding in special traits to the games, such as adding in a hidden character."
  },
  420: {
    "name": "Tanvir",
    "rating": 5.0,
    "numrating": 1000,
    "intro": "yo",
    "reviews": [4,5,2],
    "about": "I'm Tanvir and I only recently got into tabletop games during the Corona pandemic. It's a great way to spend time with friends and family, and that's why I host games online to share the joy!" ,
    "numberOfGames": 23,
    "gamesHosted": ["Magic: The Gathering", "DnD"],
    "style": "For my games, I try to make sure to adjust the gameplay to suit the players, so I'm very receptive to feedback. By the end of the session, you may honestly not recognize the game we are playing compared to when we started!"
  },
}

export const reviews = {
  1: {
    "name" : "Pat",
    "review": "I had a great experience with this host. He was very welcoming to beginners, and taught me really well. Overall great experience."
  },
  2: {
    "name" : "Tan",
    "review": "The game was very well setup. Had some minor issues setting up the game initally due to remote setup, but after that small issue, the rest of the session went amazingly well!"
  },
  3: {
    "name" : "Nerak",
    "review": "The host was frankly not that welcoming to beginners. Didn't appreciate his snark comments regarding how slowly I'm picking up the game."
  },
  4: {
    "name" : "Patrick",
    "review": "Would highly recommend this host to everyone! He was very humorous while hosting the game and made it a great experience for everyone."
  },
  5: {
    "name" : "Kevin",
    "review": "Great experience! Really took the time to make us all feel part of the experience, regardless of the remote setting."
  },
}
