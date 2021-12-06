import { Request, Response, NextFunction } from "express";

export const validEmail = (email: string) : boolean => {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(result){
      return true;
    }

    return false
};

export const isValidDate = (d: string) => {
  const date = new Date(d);
  return date instanceof Date && !isNaN(date.getTime());
};

export const checkValidRequestSignUp = (req: Request): boolean => {
  if (!validEmail(req.body.email)) {
    return false;
  }

  if (req.body.password === null || req.body.password === undefined) {
    return false;
  }

  if (req.body.firstName === null || req.body.firstName === undefined) {
    return false;
  }

  return true;
};

export const checkValidRequestNewUser = (req: Request): boolean => {
  if (req.body.userName === null || req.body.userName === undefined)
    return false;

  if (req.body.password == null || req.body.password === undefined) {
    return false;
  }

  if (!validEmail(req.body.email)) {
    return false;
  }

  if (req.body.firstName === null || req.body.firstName === undefined) {
    return false;
  }

  if (req.body.lastName === null || req.body.lastName === undefined) {
    return false;
  }

  if (!isValidDate(req.body.dob)) {
    return false;
  }

  if (req.body.country === null || req.body.country === undefined) {
    return false;
  }

  return true;
};


export const checkValidRequest = (req: Request): boolean => {
  if (req.body.username === null || req.body.username === undefined) {
    return false;
  }

  if (!validEmail(req.body.email)) {
    return false;
  }

  return true;
};

export const checkValidTransactionRequest = (req: Request): boolean => {
  if (!validEmail(req.body.userEmail)) {
    return false;
  }

  if (isNaN(req.body.amount)) {
    return false;
  }

  if (req.body.type !== "receive" && req.body.type !== "send") {
    return false;
  }

  return true;
};
