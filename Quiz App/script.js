//Quiz question
const question = [
    {
        que: 'Which of the following is the national animal of India?',
        a: 'Tiger',
        b: 'Elephant',
        c: 'Lion',
        d: 'Rhino',
        correct: 'a'
    },


    {
        que: 'Who was the first female Prime Minister of India?',
        a: 'Pratibha Patil',
        b: 'Sonia Gandhi',
        c: 'Indira Gandhi',
        d: 'Mother Teresa',
        correct: 'c'
    },

    {
        que: "Which of the following is the name of India's highest civilian award?",
        a: 'Padma Shri',
        b: 'Bharat Ratna',
        c: 'Padma Vibhushan',
        d: 'Padma Bhushan',
        correct: 'b'
    },

    {
        que: 'In which state of India would you find the famous Ajanta and Ellora caves?',
        a: 'Madhya Pradesh',
        b: 'Uttar Pradesh',
        c: 'Rajasthan',
        d: 'Maharashtra',
        correct: 'd'
    },

    {
        que: 'Which of the following is the name of the river that flows through the city of Varanasi?',
        a: 'Brahmaputra',
        b: 'Yamuna',
        c: 'Godavari',
        d: 'Ganges',
        correct: 'd'
    },

    {
        que: 'Who is known as the father of the Indian Constitution?',
        a: 'Mahatma Gandhi',
        b: 'Jawaharlal Nehru',
        c: 'B. R. Ambedkar',
        d: 'Sardar Vallabhbhai Patel',
        correct: 'c'
    },

    {
        que: 'What is the name of the famous monument in Agra that is one of the Seven Wonders of the World?',
        a: 'Taj Mahal',
        b: 'Qutub Minar',
        c: 'Red Fort',
        d: 'Fatehpur Sikri',
        correct: 'a'
    },

    {
        que: 'Which state in India is known as the "Land of the Rising Sun"?',
        a: 'Mizoram',
        b: 'Nagaland',
        c: 'Tripura',
        d: 'Arunachal Pradesh',
        correct: 'd'
    },

    {
        que: "Who is India's current Prime Minister?",
        a: 'Rahul Gandhi',
        b: 'Narendra Modi',
        c: 'Manmohan Singh',
        d: 'Atal Bihari Vajpayee',
        correct: 'b'
    },

    {
        que: 'Which of the following is the name of the Indian festival of lights?',
        a: 'Holi',
        b: 'Diwali',
        c: 'Dussehra',
        d: 'Navratri',
        correct: 'b'
    }

]



// Create an empty array to store generated numbers
const generatedNumbers = [];
// Loop until we have generated 10 unique random numbers
while (generatedNumbers.length < question.length) {
    // Generate a random number between 0 and 10
    const randomNumber = Math.floor(Math.random() * question.length);
    // Check if the number is already in the array
    if (!generatedNumbers.includes(randomNumber)) {
        // If the number is not in the array, add it
        generatedNumbers.push(randomNumber);
    }
}
let queNum=0
let total=question.length;
let right=0,wrong=0;

const queBox = document.querySelector('#questionBox')
const options = document.querySelectorAll('.option')
const error = document.querySelector('.error');
const loadQuestion = () => {    
    randomNumberIndex = generatedNumbers[`${queNum}`]
    if(queNum===total){
        return endQuiz()
    }
    resetQue();
    const data = question[randomNumberIndex];
    queBox.innerText=`${queNum+1}) ${data.que}`;
    options[0].nextElementSibling.innerText=data.a;
    options[1].nextElementSibling.innerText=data.b;
    options[2].nextElementSibling.innerText=data.c;
    options[3].nextElementSibling.innerText=data.d;
}



const validateForm =()=>{
    let checkboxes = document.querySelectorAll("input[type='radio']");
    let isChecked = false;
  
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        isChecked = true;
        break;
      }
    }
  
    if (!isChecked) {
        error.classList.add('active')
        setTimeout(() => {
            error.classList.remove('active')
        }, 2000);
    } else {
      // Submit the form or perform other actions as needed
      error.classList.remove('active')
      submitQuiz();
    }
};

const submitQuiz=()=>{
    const data = question[randomNumberIndex];
    const ans=getAnswer();
    if (ans==data.correct ){
        right++
    }else{
        wrong++
    }   
    queNum++;
    loadQuestion();
    return;
};

const getAnswer=()=>{
    let answer ;
    options.forEach((input)=>{

        if(input.checked){
            answer=input.value;
        }
    })
    return answer;
};

const resetQue=()=>{
    options.forEach((input)=>{
        input.checked=false;
    })
};

const quizEnd=document.querySelector('.endQuiz')
const Result=document.querySelector('.Result')
const container=document.querySelector('.container')

const endQuiz=()=>{
    quizEnd.classList.add('active');
    container.classList.add('active')
    Result.innerText=`${right} Out Of ${total}`
};

//Reload Page
const refresh=()=>{
    location.reload();
};

//initial call
loadQuestion();