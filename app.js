const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const COOKIE_TIME = 1000 * 60 * 60 * 24 * 365; // 1 year

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

const getRoute = (routeName) =>
  ROUTES.find((route) => route.name === routeName);

const nextVersion = (routeName) => {
  const route = getRoute(routeName);

  if (route.currentVersion < route.versionsAmount) {
    route.currentVersion++;
  } else route.currentVersion = 1;
};

const getPageByVersion = (routeName, version) =>
  `${__dirname}/public/${routeName}/v${version}/index.html`;

const getPage = (routeName) => {
  let page = getPageByVersion(
    routeName,
    getRoute(routeName).currentVersion
  );
  nextVersion(routeName);
  return page;
};

app.use(cookieParser());

ROUTES.forEach((route) => {
  app.get(`/${route.name}`, (req, res) => {
    const userVersion = req.cookies[route.name];

    if (userVersion) {
      res.sendFile(getPageByVersion(route.name, parseInt(userVersion)));
    } else {
      res.cookie(route.name, getRoute(route.name).currentVersion, {
        expires: new Date(Date.now() + COOKIE_TIME),
        maxAge: COOKIE_TIME,
      });
      res.sendFile(getPage(route.name));
    }
  });
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server app listening at http://localhost:${PORT}`);
});
