const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://stutommi:${password}@cluster0-o2qci.mongodb.net/person-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 3) {
    Person.find({})
        .then( result => {
            console.log('puhelinluettelo:')
            result.forEach( person => console.log(`${person.name} ${person.number}`))
            mongoose.connection.close()
            process.exit()
        })
}
person.save()
    .then(result => {
        console.log(`lisätään ${process.argv[3]} numero ${process.argv[4]} luetteloon`)
        console.log('\n\n', result)

        mongoose.connection.close()
    })