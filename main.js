import axios from 'axios'
import './public/styles/normalize.css'

const usersWrap = document.querySelector('.users'),
      updateBtn = document.querySelector('.update'),
      sortSelect = document.querySelector('#sort'),
      searchInput = document.querySelector('.search'),
      errorDisplay = document.querySelector('.error-display')


let usersData = []

const userCard = (user) => {
  const { name, phone, email } = user

  return (
    `<div class="user-info">
        <div class="user-badge">
          <div class="user-logo">${name[0]}</div>
          <div class="user-name">${name}</div>
        </div>
        <div class="user-email"><i class="fa-solid fa-envelope"></i>${email}</div>
        <div class="user-phone"><i class="fa-solid fa-phone"></i>${phone}</div>
      </div>`
  )
}

const getUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    usersData = response.data

    renderUserCards()
  } catch (e) {  
    errorDisplay.textContent = 'An error occurred while loading data. Please try again.';
  }
}

const renderUserCards = () => {
  usersWrap.innerHTML = ''

  const searchInputValue = searchInput.value.toLowerCase()
  let userFounded = false

 
  usersData.forEach((user) => {

    if (user.name.toLowerCase().includes(searchInputValue)) {
      userFounded = true
      
      const card = document.createElement('div')
      card.className = 'user'
    
      card.innerHTML = userCard(user)
      usersWrap.append(card)
    }
  })

  if (!userFounded) {
    usersWrap.innerHTML = '<p class="not-found">Not users found...</p>'
  }
}

// User Sorting
const sortUsers = (option) => {
  usersData.sort((a, b) => {
    if (a[option] < b[option]) {
      return -1
    } else if (a[option] > b[option]) {
      return 1
    }

    return 0
  })
}


sortSelect.addEventListener('change', (e) => {
  sortUsers(e.target.value)
  renderUserCards()
})

updateBtn.addEventListener('click', getUsers)
searchInput.addEventListener('input', renderUserCards)

getUsers()