#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.cyanBright("\n\t\t WELCOME TO MEHAK-AKRAM PROJECT \t\t\n"))

class Student {
  static counter = 10000;
  id: number;
  personName: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.personName = name;
    this.courses = [];
    this.balance = 100;
  }

  //Method to enroll a student in a course


  enroll_course(courses: string) {
    this.courses.push(courses);
  }

  //Method to view a student balance

  view_balance() {
    console.log(`balance for ${this.personName} : $${this.balance}`);
  }

  //Method to pay student fees

  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} fees paid successfully for ${this.personName}`);
  }

  //Method to display student status

  show_status() {
    console.log(`ID : ${this.id}`);
    console.log(`NAME : ${this.personName}`);
    console.log(`COURSES : ${this.courses}`);
    console.log(`BALANCE : $${this.balance}`);
  }
}
//Defining a student_manager class to manage students
class Student_manager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  //Method to add a new student

  add_student(studentName: string) {
    let student = new Student(studentName);
    this.students.push(student);
    console.log(`Student: ${student.personName} added successfully.Student ID: ${student.id}`);
  }
  //Method to enroll a student in a coures

  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.personName} enroll in ${course} successfully`);
    }
  }

  //Method to view a student balance

  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log(`student not found! please enter a correct stutent id`);
    }
  }

  //Method to pay student fees
  pay_student_fee(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log(`student not found. please enter a correct stutent id`);
    }
  }

  //Method to display student status

  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }

  //Method to find a student by student_id

  find_student(student_id: number) {
    return this.students.find(std => std.id === student_id);
  }
}

//Main function to run the program

async function main() {
  console.log(chalk.bold.green("Student_management_system"));
  console.log("-".repeat(50));

  let student_manager = new Student_manager();

  //while Loop to keep program running

  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "select an option",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);

    //using Switch case to handle user choice

    switch (choice.choice) {
      case "Add Student":
        let nameInput = await inquirer.prompt([
          {
            name: "ans",
            type: "input",
            message: "Enter a student name",
          },
        ]);
        student_manager.add_student(nameInput.ans);
        break;

      case "Enroll Student":
        let courseInput = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter a Course Name",
          },
        ]);
        student_manager.enroll_student(
          courseInput.student_id,
          courseInput.course
        );
        break;

      case "View Student Balance":
        let balanceInput = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        student_manager.view_student_balance(balanceInput.student_id);
        break;

      case "Pay Fees":
        let fessInput = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter the amount to pay",
          },
        ]);
        student_manager.pay_student_fee(fessInput.student_id, fessInput.amount);
        break;

      case "Show Status":
        let statusInput = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        student_manager.show_student_status(statusInput.student_id);
        break;

      case "Exit":
        console.log(chalk.yellow("Exiting..."));
        process.exit();
    }
  }
}

//calling a main function
main();
