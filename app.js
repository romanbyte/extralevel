const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const COOKIE_TIME = 1000 * 60 * 60 * 24 * 365; // 1 year

const getPagesWithVersion = () => {
  return fs
    .readdirSync("./public")
    .filter(
      (el) => fs.lstatSync(`./public/${el}`).isDirectory() && el !== "common"
    )
    .filter(
      (dir) =>
        fs.readdirSync(`./public/${dir}`).filter((el) => /v\d/.test(el)).length
    )
    .map((dir) => ({
      name: dir,
      versionsAmount: fs
        .readdirSync(`./public/${dir}`)
        .filter((el) => /v\d/.test(el)).length,
      currentVersion: 1,
    }));
};

let ROUTES = getPagesWithVersion();
console.log("Routes with versions: ", ROUTES);

const getRouteIdx = (routeName) =>
  ROUTES.findIndex((route) => route.name === routeName);

const nextVersion = (routeName) => {
  const routeIdx = getRouteIdx(routeName);

  if (ROUTES[routeIdx].currentVersion < ROUTES[routeIdx].versionsAmount) {
    ROUTES[routeIdx].currentVersion++;
  } else ROUTES[routeIdx].currentVersion = 1;
};

const getPageByVersion = (routeName, version) =>
  `${__dirname}/public/${routeName}/v${version}/index.html`;

const getPage = (routeName) => {
  let page = getPageByVersion(
    routeName,
    ROUTES[getRouteIdx(routeName)].currentVersion
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
      res.cookie(route.name, ROUTES[getRouteIdx(route.name)].currentVersion, {
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
