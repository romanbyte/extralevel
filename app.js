const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const fs = require('fs')

const port = 3000

const versionsAmount = fs.readdirSync('./public/unity').filter(el=>/v\d/.test(el)).length;
let currentVersion = 1
const nextVersion = () => {
  if(currentVersion < versionsAmount){
    currentVersion++
  } else currentVersion = 1
}

const getUnityVersion = (version) => `${__dirname}/public/unity/v${version}/index.html`

const getUnityPage = ()=>{
  let unityPage = getUnityVersion(currentVersion)
  nextVersion()
  return unityPage
}

app.use(cookieParser())

app.get('/unity', (req, res) => {
  const userVersion = req.cookies?.unity
  if(userVersion){
    res.sendFile(getUnityVersion(parseInt(userVersion)));
  } else {
    const COOKIE_TIME = (1000 * 60 * 60 * 24 * 365) // 1 year
    res.cookie('unity',currentVersion, { expires: new Date(Date.now() + COOKIE_TIME), maxAge: COOKIE_TIME})
    res.sendFile(getUnityPage());
  }
})

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})
