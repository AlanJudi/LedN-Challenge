import { Request, Response } from "express";
import {
  checkValidRequest,
  checkValidTransactionRequest,
  checkValidRequestNewUser,
  isValidDate,
} from "./checkRequests";



test("isValidDate should return false => ", () => {
  const result = isValidDate("");
  expect(result).toBe(false);
});

test("IsValidDate should return true => ", () => {
  const date = new Date().toUTCString();
  const result = isValidDate(date);

  expect(result).toBe(true);
});

test("checkValidRequestNewUser should return false => ", () => {
    const request: Request = {body: {}} as Request;
    const result = checkValidRequestNewUser(request);

    expect(result).toBe(false);

});

test("checkValidRequestNewUser should return true => ", () => {
    const request: Request = {body: {userName: "", password: "", firstName: "", lastName: "", email: "alanjudi.92@gmail.com", country: "USA", dob: "12-12-92"}} as Request
    const result = checkValidRequestNewUser(request);

    expect(result).toBe(true);
});

test("checkValidTransactionRequest should return fasle => ", () => {
    const request: Request = {body: {userEmail: "alanjudi.92@gmail.com"}} as Request;
    const result = checkValidTransactionRequest(request);
    expect(result).toBe(false);
});

test("checkValidTransactionRequest should return true", () => {
    const request: Request = {body: {userEmail: "alanjudi.92@gmail.com", amount: 1.0, type: "receive"}} as Request;
    const result = checkValidTransactionRequest(request);
    expect(result).toBe(true);
});


