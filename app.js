const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const VERSION = {
  unity : process.env.V_UNITY || 1,
  '3d' : process.env.V_3D || 1,
  gamedev : process.env.V_GAMEDEV || 1,
  art : process.env.V_ART || 1,
  ios : process.env.V_IOS || 1,
  android : process.env.V_ANDROID || 1,
}

const getPagesWithVersion = () => fs
  .readdirSync("./public").reduce((pages, el) => {
    if (el !== "common" && fs.lstatSync(`./public/${el}`).isDirectory()) {
      const versions = fs.readdirSync(`./public/${el}`).filter((el) => /v\d/.test(el)).length
      if(versions){
        pages.push({
          name: el,
          versionsAmount: versions,
          currentVersion: 1,
        })
      }
    }
    return pages
  }, []);

let ROUTES = getPagesWithVersion();
console.log("Routes with versions: ", ROUTES);

const getPageByVersion = (routeName, version) =>
  `${__dirname}/public/${routeName}/v${version}/index.html`;

ROUTES.forEach((route) => {
  app.get(`/${route.name}`, (req, res) => {
    res.sendFile(getPageByVersion(route.name, VERSION[route.name]));
  });
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server app listening at http://localhost:${PORT}`);
});
