import https from 'https'

const slack = (params) => {
  let host = 'hooks.slack.com'

  let data = JSON.stringify({'text': params['message']})

  let options = {
    hostname: host,
    port: 443,
    path: params['path'],
    method: 'POST',
  }

  let req = https.request(options, (res) => {
    console.log('status code : ' + res.statusCode)
    res.setEncoding('utf8')
    res.on('data', (d) => {
      console.log(d)
    })
  })

  req.on('error', (e) => {
    console.error(e)
  })

  req.write(data)
  req.end()
}

export default slack
