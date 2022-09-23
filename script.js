const count = 5
const KEY = '&key=AIzaSyCYSYGP7rydBkLtzWaxth_vP4RHmXbBpfo'
const API='https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults='+count+'&type=video'+KEY+'&q='

const input = document.querySelector('input')
const button = document.querySelector('button')
const output = document.querySelector('#output')
const btn_wrap = document.querySelector('.button__wrap')
const clear = document.querySelector('#input_img')

const searchVideo=async(videoName)=>{
    const request = await fetch(API+videoName)
    const response=await request.json()
    output.innerHTML=''
    console.log(response.items)
    renderVideo(response.items)
}

button.addEventListener('click',()=>{
    searchVideo(input.value)
})


input.addEventListener('keyup', e=> {
        if (e.key === 'Enter') {
            searchVideo(input.value)
        }
    })


const renderVideo=(data)=>{
    data.forEach(el => {
        const videoBox=document.createElement('div')
        const col=document.createElement('div')
        col.className='col-3'

        videoBox.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${el.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
        col.append(videoBox)
        output.append(col)
    });
}

const categories=['kyrgyzstan','programming','javascript','music','travel','animation','movie']

const categoriesFunc=()=>{
    categories.forEach(el=>{
        const btn =document.createElement('button')
        btn.textContent=el
        btn.addEventListener('click',()=>{
            searchVideo(el)
        })
        btn_wrap.append(btn)
    })
}
categoriesFunc()


const makeVoiceRecognizer = () =>{
    const voice = document.getElementById('voice')
    let recognizer = new webkitSpeechRecognition()
    let name =''
    console.log(recognizer)
    recognizer.interimResult = true
    recognizer.lang = 'ru-Ru'

    recognizer.onresult = (event)=>{
        let result = event.results[event.resultIndex]
        if(result.isFinal){
           name = result[0].transcript
           input.placeholder = name
           searchVideo(name)
           talk()
        }
    }

    const talk = () =>{
        let listen = window.speechSynthesis
        let result = new SpeechSynthesisUtterance(name)
        listen.speak(result)
    }

    const speech = () =>{
        recognizer.start()
    }
    
    voice.addEventListener('click',speech)
}
makeVoiceRecognizer()

clear.addEventListener('click',()=>{
    if(input.value){
        input.value=''
    }
})
