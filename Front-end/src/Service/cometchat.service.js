import axios from 'axios'
const url = 'https://25621446d429b454.api-us.cometchat.io/v3/users'
const apiKey = '84c3eb2e421a2dd39ce62483c8d8db3034cd080a'

const createNewUser = async (uid, name, avatar, email, phone) => {
  const processedUid = uid.split('@')[0]
  const headers = {
    accept: 'application/json',
    apikey: apiKey,
    'content-type': 'application/json',
  }
  const form = {
    metadata: {
      '@private': {
        email: email,
        contactNumber: phone,
      },
    },
    uid: processedUid,
    name: name,
    avatar: avatar === '' ? 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1714879302885_cute-tiny-anime-panda-cute-tiny-anime-panda-280618970.jpg?alt=media' : avatar,
  }
  try {
    const response = await axios.post(url, form, { headers })
    return response.data
  } catch (error) {
    console.error('Error creating new user:', error)
    throw error
  }
}

export const cometChatService = {
  createNewUser,
}
