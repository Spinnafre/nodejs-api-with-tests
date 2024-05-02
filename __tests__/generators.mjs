import { pipeline } from 'stream/promises'
import { PassThrough, Readable, Writable } from 'stream'
import { setTimeout } from 'node:timers/promises'

async function processImage(img) {
  await setTimeout(4000)
  return {
    size: img.size,
    title: 'test',
    type: img.type
  }
}

async function* genData() {
  const imageURLs = [
    'https://via.placeholder.com/600/f66b97',
    'https://via.placeholder.com/600/d32776',
    'https://via.placeholder.com/600/24f355',
    'https://via.placeholder.com/600/92c952'
  ]

  for (const url of imageURLs) {
    console.log(url)
    const response = await fetch(url, {
      method: 'GET'
    })

    const blob = await response.blob()

    yield

    console.log('[RETURNING] ', blob)

    yield {
      title: 'test',
      data: blob
    }
  }
}

function* genChat() {
  const questions = [
    {
      id: 0,
      question: 'What is your name?',
      answer: null
    },
    {
      id: 1,
      question: 'What is your age?',
      answer: null
    },
    {
      id: 2,
      question: 'What is your sex?',
      answer: null
    },
    {
      id: 3,
      question: "What's your favorite color?",
      answer: null
    }
  ]

  let id = Math.floor(Math.random() * questions.length)
  let count = 0

  while (true) {
    if (count === questions.length) {
      break
    }

    const item = questions[id]

    const answer = yield `[CHAT] - ${item.question} \n`

    if (answer) {
      if (answer === 'exit') {
        break
      }

      item.answer = answer

      id = Math.floor(Math.random() * questions.length)
    }
  }

  console.log('Bye 🤗!')
  return questions
}

;(async function () {
  console.log('Chat\n')
  const chatGen = genChat()

  let chat = chatGen.next()

  const writable = process.stdout

  if (chat.done) {
    return
  }

  writable.write(chat.value)

  const readable = process.stdin.setDefaultEncoding('utf-8')

  let answer = ''

  for await (const chunk of readable) {
    answer = chunk.toString().trim()

    if (!!answer || answer === 'exit') {
      readable.destroy()
    }
  }

  console.log('ans == ', answer)

  // const logger = new PassThrough({
  //     encoding: "utf-8",
  //     objectMode: true,
  //     write(chunk, enc, err) {
  //         console.log("[log] ", chunk.toString());
  //         err(null)
  //     }
  // })

  /*while (chat.done === false) {
        process.stdout.write(chat.value)

        // process.stdin.on("data", (data) => {
        // })

        let answer = "";

    }*/
})()
