const blogs = [
  {
    likes: 24,
    title: 'Tyylivinkkejä Tyhmälle',
    author: 'Tytti Tyylikäs',
    url: 'www.tyylilyyli.fi',
    user: {
      username: 'Taavetti',
      name: 'Tauno Palo',
      id: '5cc1be830018f51f068bac56'
    },
    id: '5cc6abc353ceaf5227e4b142'
  },
  {
    likes: 53,
    title: 'Kolme keinoa kostaa kanalle',
    author: 'Arto Vihavainen',
    url: 'www.närhenmunat.fi',
    user: {
      username: 'Turo12',
      name: 'Turo Kivikoski',
      id: '5cc1be83od88f51d068bac56'
    },
    id: '5cc6abc3hdi87f5227e4b142'
  },
  {
    likes: 435,
    title: 'Kuinka olla olemassa',
    author: 'Olli Olematon',
    url: 'www.eksistentialistinenpiina.fi',
    user: {
      username: 'Turo12',
      name: 'Turo Kivikoski',
      id: '5cc1be83od88f51d068bac56'
    },
    id: '5cc6a1234567af5227e4b142'
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => console.log('jes')


export default { getAll, setToken }