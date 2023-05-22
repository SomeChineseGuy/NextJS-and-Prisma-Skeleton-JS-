const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const davie = await prisma.user.upsert({
    where: { email: "dchristol1@pen.io" },
    update: {},
    create: {
      email: "dchristol1@pen.io",
      first_name: "Davie",
      age: "22",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Calgary",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  });
  const ollie = await prisma.user.upsert({
    where: { email: "okuhle5@gmpg.org" },
    update: {},
    create: {
      email: "okuhle5@gmpg.org",
      first_name: "Ollie",
      age: "26",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Cumba",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
    },
  });
  const roslyn = await prisma.user.upsert({
    where: { email: "rluetkemeyer0@state.tx.us" },
    update: {},
    create: {
      email: "rluetkemeyer0@state.tx.us",
      first_name: "Roslyn",
      age: "29",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Mukdahan",
      open_to_travel: true,
      profile_photo:
        "https://plus.unsplash.com/premium_photo-1670006626907-83c7d89e320f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80",
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@gmail.com" },
    update: {},
    create: {
      email: "bob@gmail.com",
      first_name: "Bob",
      age: "35",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Toronto",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  });
  const jane = await prisma.user.upsert({
    where: { email: "jane@gmail.com" },
    update: {},
    create: {
      email: "jane@gmail.com",
      first_name: "Jane",
      age: "31",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Texas",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  });
  const mario = await prisma.user.upsert({
    where: { email: "davique@gmail.com" },
    update: {},
    create: {
      email: "davique@gmail.com",
      first_name: "Mario",
      age: "38",
      gender: "Mario",
      about_me: "I love to travel",
      current_location: "Bogota",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  });
  const bailey = await prisma.user.upsert({
    where: { email: "bailey.kunz9@yahoo.com" },
    update: {},
    create: {
      email: "bailey.kunz9@yahoo.com",
      first_name: "Bailey",
      age: "52",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Illinois",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
  });
  const teresa = await prisma.user.upsert({
    where: { email: "lamar1989@yahoo.com" },
    update: {},
    create: {
      email: "lamar1989@yahoo.com",
      first_name: "Teresa",
      age: "47",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Florida",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1579591919791-0e3737ae3808?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    },
  });
  const nanette = await prisma.user.upsert({
    where: { email: "pink1995@hotmail.com" },
    update: {},
    create: {
      email: "pink1995@hotmail.com",
      first_name: "Teresa",
      age: "68",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "New York",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
  });

  const jim = await prisma.user.upsert({
    where: { email: "pwisozk@hotmail.com" },
    update: {},
    create: {
      email: "pwisozk@hotmail.com",
      first_name: "Jim",
      age: "40",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Bredenbury",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1619539465730-fea9ebf950f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
    },
  });
  const monty = await prisma.user.upsert({
    where: { email: "jamie52@hotmail.com" },
    update: {},
    create: {
      email: "jamie52@hotmail.com",
      first_name: "Jim",
      age: "26",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Brandon",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1639747280929-e84ef392c69a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  });
  const noel = await prisma.user.upsert({
    where: { email: "okon.erwin@hotmail.com" },
    update: {},
    create: {
      email: "okon.erwin@hotmail.com",
      first_name: "Noel",
      age: "31",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Montreal",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  });
  const graham = await prisma.user.upsert({
    where: { email: "geovany27@hotmail.com" },
    update: {},
    create: {
      email: "geovany27@hotmail.com",
      first_name: "Graham",
      age: "32",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Quebec City",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1630208232589-e42b29428b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=769&q=80",
    },
  });
  const mark = await prisma.user.upsert({
    where: { email: "ernesto.johns@kihn.com" },
    update: {},
    create: {
      email: "ernesto.johns@kihn.com",
      first_name: "Mark",
      age: "21",
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Edmonton",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  });
  const jennifer = await prisma.user.upsert({
    where: { email: "jkpw23@gmail.com" },
    update: {},
    create: {
      email: "jkpw23@gmail.com",
      first_name: "Jennifer",
      age: "21",
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Punto Fijo",
      open_to_travel: true,
      profile_photo:
        "https://images.unsplash.com/photo-1586425225143-0c8f59053610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=659&q=80",
    },
  });
  const paris = await prisma.destination.upsert({
    where: { id: 2 },
    update: {},
    create: {
      city: "Paris",
      country: "France",
      photo:
        "https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "Paris, France remains one of the most loved cities to visit in the world because it is an iconic destination for grand life events, like milestone vacations, engagements, celebrations, and honeymoons. It is also an easy place to visit for quick getaways, with regular flight schedules and tours available.",
    },
  });
  const newyork = await prisma.destination.upsert({
    where: { id: 3 },
    update: {},
    create: {
      city: "New York",
      country: "United States",
      photo:
        "https://images.unsplash.com/photo-1480926965639-9b5f63a0817b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "There are so many elements that make New York City one of the best cities in the world. The city and the Statue of Liberty that travelers see as they arrive is symbolic of the culture and freedom that America stands for. The Big Apple is the financial hub of the United States, with Wall Street and international businesses.",
    },
  });
  const london = await prisma.destination.upsert({
    where: { id: 4 },
    update: {},
    create: {
      city: "London",
      country: "England",
      photo:
        "https://images.unsplash.com/photo-1592345279419-959d784e8aad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "There is never a lack of intrigue or interest in London as a destination which is makes it one of the most touristic cities in the world. The Royal intrigue is one of its main draws, as thousands of tourists descend on Buckingham Palace to get a brush with the British monarchy.",
    },
  });
  const bangkok = await prisma.destination.upsert({
    where: { id: 5 },
    update: {},
    create: {
      city: "Bangkok",
      country: "Thailand",
      photo:
        "https://images.unsplash.com/photo-1494791368093-85217fbbf8de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "The bustling city of Bangkok, Thailand is one of the top tourist cities in the world, with nearly 24.1 million visitors a year. The city is usually the first stopping point for anyone touring through Thailand. Bangkok has an exciting mix of packed subways, huge skyscrapers, temples, historic architecture, lavish gardens, palaces, and almost nightly sporting events, like kickboxing, that draw thousands of fans.",
    },
  });
  const hongkong = await prisma.destination.upsert({
    where: { id: 6 },
    update: {},
    create: {
      city: "Hong Kong",
      country: "China",
      photo:
        "https://images.unsplash.com/photo-1551405780-03882d5a2ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "Hong Kong is one of the most famous cities in the world. It has remained so for more than a decade and continues to attract travelers. With an estimated 29.2 million visitors a year, the city has a stronghold over other cities in the world when it comes to attracting travelers. Hong Kong is a convenient holiday destination, and its shopping, especially for bargains, is unmatched.",
    },
  });
  const dubai = await prisma.destination.upsert({
    where: { id: 7 },
    update: {},
    create: {
      city: "Dubai",
      country: "United Arab Emirates",
      photo:
        "https://images.unsplash.com/photo-1562059392-096320bccc7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "Dubai in the United Arab Emirates is synonymous with luxury lifestyles. While Dubai is a large global business center, people enjoy vacationing among the rich and the attractions that cater to them. Dubai is home to the world's tallest building, the Burj Khalifa, and it's where tourists find some other attractions that are among the largest in the world, like the shopping malls and aquarium.",
    },
  });
  const rome = await prisma.destination.upsert({
    where: { id: 8 },
    update: {},
    create: {
      city: "Rome",
      country: "Italy",
      photo:
        "https://images.unsplash.com/photo-1478359844494-1092259d93e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      description:
        "Rome is one of those destinations that sits on many travelers' must-see someday lists. The culture of Rome and its historic architecture are its main draws. The Colosseum, Pantheon, Trevi fountain, and the Vatican usually top the list of things vacationers want to check off their list.",
    },
  });
  const kerry = await prisma.destination.upsert({
    where: { id: 9 },
    update: {},
    create: {
      city: "Kerry",
      country: "Ireland",
      photo:
        "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "All the way west in Ireland is one of the country’s most scenic counties. Kerry’s mountains, lakes and coasts are postcard-perfect, and that’s before you add in Killarney National Park. The unique small towns such as Dingle add to its charm.",
    },
  });
  const cape = await prisma.destination.upsert({
    where: { id: 10 },
    update: {},
    create: {
      city: "Cape Town",
      country: "South Africa",
      photo:
        "https://images.unsplash.com/photo-1610601403310-7626f825bef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Cape Town is a dream location to visit: endless natural beauty and clifftop views, pastel pink neighborhoods and turquoise waters.",
    },
  });
  const dubrovnik = await prisma.destination.upsert({
    where: { id: 11 },
    update: {},
    create: {
      city: "Dubrovnik",
      country: "Croatia",
      photo:
        "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "As George Bernard Shaw once said, 'Those who seek paradise on Earth should come to Dubrovnik.' With its winding streets, cliffside beach bars and UNESCO World Heritage Site of the Old Town, it’s no wonder Dubrovnik is such a popular spot.",
    },
  });
  const edinburgh = await prisma.destination.upsert({
    where: { id: 12 },
    update: {},
    create: {
      city: "Edinburgh",
      country: "Scotland",
      photo:
        "https://images.unsplash.com/photo-1587226513115-f1e3439f1a35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1192&q=80",
      description:
        "With the historic Edinburgh castle looming over the city, culture in spades and wonderfully friendly locals, this is one of the world’s greatest city breaks.",
    },
  });
  const jaipur = await prisma.destination.upsert({
    where: { id: 13 },
    update: {},
    create: {
      city: "Jaipur",
      country: "India",
      photo:
        "https://plus.unsplash.com/premium_photo-1676675140348-4b2aec7cdf77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      description:
        "Jaipur is known as the ‘Pink City’ for its pale terracotta buildings. This was originally done to impress the visiting Prince Albert during his 1876 tour of India by order of the Maharaja (Sawai Ram Singh). Even today, it’s illegal to paint buildings any other color.",
    },
  });
  const waikato = await prisma.destination.upsert({
    where: { id: 15 },
    update: {},
    create: {
      city: "Waikato",
      country: "New Zealand",
      photo:
        "https://images.unsplash.com/photo-1551524164-7d2f9ff12c70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      description:
        "Waikato, a region in New Zealand’s North Island, is home to massive underground caves, lush rainforest and the buzzy city of Hamilton. But the area’s main attraction? A Middle-earth adventure on the film set of Lord of the Rings. Hobbiton Movie Set still has the original Hobbit holes from the making of the films.",
    },
  });
  const havana = await prisma.destination.upsert({
    where: { id: 16 },
    update: {},
    create: {
      city: "Havana",
      country: "Cuba",
      photo:
        "https://images.unsplash.com/photo-1610106109549-5813ab87ae88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      description:
        "Cuba’s capital is almost 500 years old and a riot of color. Brightly painted buildings and vintage cars make Havana a photogenic dream.",
    },
  });
  const tokyo = await prisma.destination.upsert({
    where: { id: 17 },
    update: {},
    create: {
      city: "Tokyo",
      country: "Japan",
      photo:
        "https://images.unsplash.com/photo-1590829197118-b0609523669d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      description:
        "Visiting Tokyo is like visiting the future—flashing neon lights, incredible technology—yet there’s still a rich sense of culture and history.",
    },
  });
  const vancouver = await prisma.destination.upsert({
    where: { id: 18 },
    update: {},
    create: {
      city: "Vancouver",
      country: "Canada",
      photo:
        "https://plus.unsplash.com/premium_photo-1676190303542-0d3a16cf1667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      description:
        "Vancouver is surrounded by water yet close to the mountains and has world-class art, restaurants and heaps of other attractions to keep you entertained.",
    },
  });
  const cairo = await prisma.destination.upsert({
    where: { id: 19 },
    update: {},
    create: {
      city: "Cairo",
      country: "Egypt",
      photo:
        "https://images.unsplash.com/photo-1539768942893-daf53e448371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      description:
        "Cairo is one of the most ancient cities in the world. Sitting on the Nile river with wonderful museums, vibrant culture and friendly locals, it makes for a great holiday.",
    },
  });
  const copenhagen = await prisma.destination.upsert({
    where: { id: 20 },
    update: {},
    create: {
      city: "Copenhagen",
      country: "Denmark",
      photo:
        "https://images.unsplash.com/photo-1519112232436-9923c6ba3d26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Copenhagen’s rustic fishing ports, modern graffiti and winding red brick streets are just some of what makes it such a beautiful bucket list destination. It oozes Scandi cool from every corner, with top-notch food, stylish design and an always hip atmosphere.",
    },
  });
  const seoul = await prisma.destination.upsert({
    where: { id: 21 },
    update: {},
    create: {
      city: "Seoul",
      country: "Korea",
      photo:
        "https://images.unsplash.com/photo-1614088459293-5669fadc3448?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      description:
        "Seoul is a vibrant metropolis where old-meets-new, with pop culture (K-Pop!) alongside Buddhist temples.",
    },
  });
  const providencia = await prisma.destination.upsert({
    where: { id: 22 },
    update: {},
    create: {
      city: "Providencia",
      country: "Colombia",
      photo:
        "https://images.unsplash.com/photo-1585086813715-f468e3fc6d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "The Colombian island of Providencia is the perfect combination of South America and the Caribbean. It’s best known for Crab Cay: an unspoiled little island where all there is to do is snorkel and lie on the beach.",
    },
  });
  const lisbon = await prisma.destination.upsert({
    where: { id: 23 },
    update: {},
    create: {
      city: "Lisbon",
      country: "Portugal",
      photo:
        "https://images.unsplash.com/photo-1570698473651-b2de99bae12f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      description:
        "Lisbon, the hilly capital of Portugal, is postcard-perfect with its cobbled streets, pristine waters and local Atlantic beaches.",
    },
  });
  const ibiza = await prisma.destination.upsert({
    where: { id: 24 },
    update: {},
    create: {
      city: "Ibiza",
      country: "Spain",
      photo:
        "https://images.unsplash.com/photo-1591615332031-723cb83f41ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1033&q=80",
      description:
        "While you’ll have your fair share of techno club experiences, Ibiza is also one of the most beautiful Spanish islands, with a pretty Old Town and scenic beaches. Spend the day on the beach and the nights in legendary clubs.",
    },
  });
  const budapest = await prisma.destination.upsert({
    where: { id: 25 },
    update: {},
    create: {
      city: "Budapest",
      country: "Hungary",
      photo:
        "https://images.unsplash.com/photo-1518787289325-94c6917b88ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1163&q=80",
      description:
        "The capital city of Hungary, Budapest is a fairytale city in Eastern Europe. The city itself is separated by the 19th-century Chain Bridge that connects the hilly Buda district with flat Pest—hence the name Budapest.",
    },
  });
  const matterhorn = await prisma.destination.upsert({
    where: { id: 26 },
    update: {},
    create: {
      city: "Matterhorn",
      country: "Switzerland",
      photo:
        "https://images.unsplash.com/photo-1593291619462-e4240344ea21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "The Matterhorn is one of the world’s most iconic peaks—the pyramid-shaped mountain, which is very difficult to climb, is said to be the most-photographed mountain in the world.",
    },
  });
  const vegas = await prisma.destination.upsert({
    where: { id: 27 },
    update: {},
    create: {
      city: "Las Vegas",
      country: "United States",
      photo:
        "https://plus.unsplash.com/premium_photo-1676393904171-738ff11eceaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      description:
        "With the bright lights, party atmosphere and endless things to see and do, it’s no wonder that Las Vegas has become a glittering global tourism destination. Take a chance in the casinos until the early hours or see world-class entertainment.",
    },
  });
  const buenos = await prisma.destination.upsert({
    where: { id: 28 },
    update: {},
    create: {
      city: "Buenos Aires",
      country: "Argentina",
      photo:
        "https://plus.unsplash.com/premium_photo-1675060604955-96ded41d5833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
      description:
        "Bookstores set in palatial theatres, tango dancing in the streets and brightly painted neighborhoods. These are just some of what makes Buenos Aires so beautiful.",
    },
  });
  const losangeles = await prisma.destination.upsert({
    where: { id: 29 },
    update: {},
    create: {
      city: "Los Angeles",
      country: "United States",
      photo:
        "https://images.unsplash.com/photo-1614867416715-cbba3a318f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "In a city with year-round sunshine, glam bars, beaches and hikes, there are endless incredible experiences to enjoy in Los Angeles. It’s no wonder there are almost 5O million ‘LA’ hashtags on Insta.",
    },
  });
  const neworleans = await prisma.destination.upsert({
    where: { id: 30 },
    update: {},
    create: {
      city: "New Orleans",
      country: "United States",
      photo:
        "https://images.unsplash.com/photo-1617170732045-80343ab14eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "The lively city known for its street music, festive vibe and a melting pot of French, African and American cultures is well worth the trip. NOLA is a city packed with adventures at every turn and should be on everyone’s must-visit list.",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
