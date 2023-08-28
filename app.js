const form = document.querySelector('form')
const gifsContainer = document.querySelector('div')

const APIKey = 'I1jYw2OpL0DGzFR56SgaCUd3ttGXmzQX'
  const getGifApiURL = gifName => `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${gifName}`

 const generateGifImage = (downsized, giftitle) => {
  const img = document.createElement('img')
  img.setAttribute('src', downsized)
  img.setAttribute('alt', giftitle )
  return img
 }
 
form.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.gifSearch.value
  const gifApiURL = getGifApiURL(inputValue)
  
  const getGifs = async () => {
    const gifResponse = await fetch(gifApiURL)

    try{
      if(!gifResponse.ok){
        throw new Error('Não foi possível obter o Gif')
      }
      
     const gifData = await gifResponse.json()
     const downSizedGifURL = gifData.data[0].images.downsized.url
     const gifTitle = gifData.data[0].title
     
     const img = generateGifImage(downSizedGifURL, gifTitle) 

     gifsContainer.insertAdjacentElement('afterbegin', img)
     
     event.target.reset()

    }catch(error){
       alert(`Erro: ${error.message}`)
    }
  }

  const showGifs = async () => {
    const gifs = await getGifs()
    
  }

  showGifs()
})