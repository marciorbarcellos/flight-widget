const tableBody = document.getElementById('table-body')

const getFlight = () => {
  fetch('http://localhost:8000/flights')
  .then(response => response.json())
  .then(flights => {
    populateTable(flights)
  })
  .catch(err => console.log(err))
}
getFlight()

const populateTable = (flights) => {
  console.log(flights)
  for (const flight of flights) {
  const tableRow = document.createElement('tr')
  const tableIcon = document.createElement('td')
  tableIcon.textContent = "✈"
  tableRow.append(tableIcon)

  const flightDetails = {
      time: flight.departing.slice(0,5),
      destination: flight.destination.toUpperCase(),
      flight: flight.flightNumber.shift(),
      gate: flight.gate,
      remarks: flight.status.toUpperCase()
      }
      
      for (const flightDetail in flightDetails) {
      const tableCell = document.createElement('td')
      const word = Array.from(flightDetails[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement('div')
        
        setTimeout(() => {
          letterElement.classList.add('flip')
          letterElement.textContent = letter
          tableCell.append(letterElement)
        }, 100 * index)
      }
      tableRow.append(tableCell)
    }
    tableBody.append(tableRow)
  }
}

const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "LONDON", "OMAN", "BEIRUT"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hour = 15

populateTable()

function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
  const numbers = "0123456789"
  if (maxNumber) {
    const newNumbers = numbers.slice(0, maxNumber)
    return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
  } else {
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
}

function generateTime() {
  let displayHour = hour
  if (hour < 24) {
    hour++
  }
  if (hour >= 24) {
    hour = 1
    displayHour = hour
  }
  if (hour < 10) {
    displayHour = "0" + hour
  }
  return displayHour +  ":" + generateRandomNumber(5) + generateRandomNumber()
}

function shuffleUp() {
  flights.shift()
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
    gate: generateRandomLetter() + " " + generateRandomLetter() + generateRandomLetter(),
    remarks: remarks[Math.floor(Math.random() * remarks.length)]
  })
  tableBody.textContent = ""
  populateTable()
}

setInterval(shuffleUp, 5000)
