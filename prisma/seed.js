const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const davie = await prisma.user.upsert({
    where: { email: 'dchristol1@pen.io' },
    update: {},
    create: {
      email: 'dchristol1@pen.io',
      first_name: 'Davie',
      age: 22,
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Calgary",
      open_to_travel: true,
      profile_photo: "https://robohash.org/veritatisestvel.png?size=50x50&set=set1"
    },
  })
  const ollie = await prisma.user.upsert({
    where: { email: 'okuhle5@gmpg.org' },
    update: {},
    create: {
      email: 'okuhle5@gmpg.org',
      first_name: 'Ollie',
      age: 26,
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Cumba",
      open_to_travel: true,
      profile_photo: "https://robohash.org/accusamusnonomnis.png?size=50x50&set=set1"
    },
  })
  const roslyn = await prisma.user.upsert({
    where: { email: 'rluetkemeyer0@state.tx.us' },
    update: {},
    create: {
      email: 'rluetkemeyer0@state.tx.us',
      first_name: 'Roslyn',
      age: 29,
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Mukdahan",
      open_to_travel: true,
      profile_photo: "https://robohash.org/molestiaevoluptatemexpedita.png?size=50x50&set=set1"
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@gmail.com' },
    update: {},
    create: {
      email: 'bob@gmail.com',
      first_name: 'Bob',
      age: 35,
      gender: "Male",
      about_me: "I love to travel",
      current_location: "Toronto",
      open_to_travel: true,
      profile_photo: "https://robohash.org/ipsaexercitationemquas.png?size=50x50&set=set1"
    },
  })
  const jane = await prisma.user.upsert({
    where: { email: 'jane@gmail.com' },
    update: {},
    create: {
      email: 'jane@gmail.com',
      first_name: 'Jane',
      age: 31,
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Texas",
      open_to_travel: true,
      profile_photo: "https://robohash.org/necessitatibusaliaseaque.png?size=50x50&set=set1"
    },
  })
  

  const paris = await prisma.destination.upsert({
    where: { id: 2 },
    update: {},
    create: {
      city: 'Paris',
      country: 'France',
      photo: "https://www.reuters.com/resizer/3RiUuCYIQQcJBbY-wJcxRVoCNGU=/1200x1200/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg",
      description: "Paris, France remains one of the most loved cities to visit in the world because it is an iconic destination for grand life events, like milestone vacations, engagements, celebrations, and honeymoons. It is also an easy place to visit for quick getaways, with regular flight schedules and tours available.",
    },
  })
  const newyork = await prisma.destination.upsert({
    where: { id: 3 },
    update: {},
    create: {
      city: 'New York',
      country: 'United State',
      photo: "https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_2x1.jpg",
      description: "There are so many elements that make New York City one of the best cities in the world. The city and the Statue of Liberty that travelers see as they arrive is symbolic of the culture and freedom that America stands for. The Big Apple is the financial hub of the United States, with Wall Street and international businesses.",
    },
  })
  const london = await prisma.destination.upsert({
    where: { id: 4 },
    update: {},
    create: {
      city: 'London',
      country: 'England',
      photo: "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
      description: "There is never a lack of intrigue or interest in London as a destination which is makes it one of the most touristic cities in the world. The Royal intrigue is one of its main draws, as thousands of tourists descend on Buckingham Palace to get a brush with the British monarchy.",
    },
  })
  const bangkok = await prisma.destination.upsert({
    where: { id: 5 },
    update: {},
    create: {
      city: 'Bangkok',
      country: 'Thailand',
      photo: "https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg",
      description: "The bustling city of Bangkok, Thailand is one of the top tourist cities in the world, with nearly 24.1 million visitors a year. The city is usually the first stopping point for anyone touring through Thailand. Bangkok has an exciting mix of packed subways, huge skyscrapers, temples, historic architecture, lavish gardens, palaces, and almost nightly sporting events, like kickboxing, that draw thousands of fans.",
    },
  })
  const hongkong = await prisma.destination.upsert({
    where: { id: 6 },
    update: {},
    create: {
      city: 'Hong Kong',
      country: 'China',
      photo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Hong_Kong_Harbour_Night_2019-06-11.jpg",
      description: "Hong Kong is one of the most famous cities in the world. It has remained so for more than a decade and continues to attract travelers. With an estimated 29.2 million visitors a year, the city has a stronghold over other cities in the world when it comes to attracting travelers. Hong Kong is a convenient holiday destination, and its shopping, especially for bargains, is unmatched.",
    },
  })
  const dubai = await prisma.destination.upsert({
    where: { id: 7 },
    update: {},
    create: {
      city: 'Dubai',
      country: 'United Arab Emirates',
      photo: "https://media.cnn.com/api/v1/images/stellar/prod/200924183413-dubai-9-1.jpg?q=x_0,y_0,h_900,w_1599,c_fill",
      description: "Dubai in the United Arab Emirates is synonymous with luxury lifestyles. While Dubai is a large global business center, people enjoy vacationing among the rich and the attractions that cater to them. Dubai is home to the world's tallest building, the Burj Khalifa, and it's where tourists find some other attractions that are among the largest in the world, like the shopping malls and aquarium.",
    },
  })
 const rome = await prisma.destination.upsert({
    where: { id: 8 },
    update: {},
    create: {
      city: 'Rome',
      country: 'Italy',
      photo: "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg",
      description: "Rome is one of those destinations that sits on many travelers' must-see someday lists. The culture of Rome and its historic architecture are its main draws. The Colosseum, Pantheon, Trevi fountain, and the Vatican usually top the list of things vacationers want to check off their list.",
    },
  })
  const brooke = await prisma.user.upsert({
    where: { email: 'brooke.nagy987@gmail.com' },
    update: {},
    create: {
      email: 'brooke.nagy987@gmail.com',
      first_name: 'Brooke',
      age: 30,
      gender: "Female",
      about_me: "I love to travel",
      current_location: "Calgary",
      open_to_travel: true,
      profile_photo: "",
      Adventure: {
        create: [
          {
            gender_preference: "Any",
            destination_id: {
              connect: {id: 2}
            }
          }
        ]
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })