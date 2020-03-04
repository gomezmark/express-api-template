import path = require("path");
import { Request, Response, NextFunction } from "express";


const express = require("express");
const router = express.Router();

/** Add modules below */
// router.use(<app>);

router.get("/*", (req:Request, res:Response) => {
  res.sendFile(path.join(process.cwd(), "/public/404.html"));
});

export default router;