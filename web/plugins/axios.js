export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    // eslint-disable-next-line
    console.error(`TODO: Handle errors properly`, { errorCode: code })

    // if (code === 400) {
    //   redirect('/400')
    // }
    //
    // if (code === 404) {
    //   redirect('/404')
    // }
    //
    // if (code === 500) {
    //   redirect('/500')
    // }

    redirect('/error')
  })
}
