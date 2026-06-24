import { useState } from "react";

export function useRegexValidations() {
  const [errors, setErrors] = useState({});
  const regexTest = {
    name: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Name must be under 50 characters",
    },
    role: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Name must be under 50 characters",
    },
    phone: {
      check: /^(\+1\s?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
      message: "Must be a valid phone number",
    },
    email: {
      check: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: " Must be a valid email",
    },
    password: {
      check: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      message: " Must be at least 8 characters and include a number and letter",
    },
    image: {
      check: /\.(jpg|jpeg|png)$/i,
      message: " Name be a jpg,jpeg, or png",
    },
    rank: {
      check: /^(?:[1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/,
      message: " Rank must be 1-500",
    },
    highschool: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " High School must be under 50 characters",
    },
    commitment: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Commitemnt must be under 50 characters",
    },
    aau: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " AAU Team must be under 50 characters",
    },
    class: {
      check: /^\d{4}$/,
      message: " Class must be a 4 digit number",
    },
    position: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Position must be under 50 characters",
    },
    height: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " AAU Team must be under 50 characters",
    },
    title: {
      check: /^[A-Za-z\s'-]{5,50}$/,
      message: " Title must be bewtween 5-50 characters",
    },
    body: {
      check: /^[A-Za-z\s'-]{50,10000}$/,
      message: " Title must be at least 50 characters",
    },
  };

  function checkValidation(event) {
    const name = event.target.name.toLowerCase();
    if (
      regexTest[name].check.test(event.target.value) ||
      event.target.value === ""
    ) {
      const { [name]: value, ...left } = errors;
      setErrors(left);
    } else {
      setErrors({
        ...errors,
        [name]: regexTest[name].message,
      });
    }
  }

  return { errors, checkValidation };
}
