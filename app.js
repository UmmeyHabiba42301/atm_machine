#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 6000;
let myPin = 12345;
console.log(chalk.greenBright("\n \t Welcome to Ummey Habiba atm_machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blue("Enter your pin code:"),
    }
]);
if (pinAnswer.pin == myPin) {
    console.log(chalk.yellow("\nPin is correct, login successfully!\n"));
    //console.log(`Current Account Balance: ${myBalance}`)
    let operations = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operations.operation === "Withdraw Amount") {
        let withdrawAnswer = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawl method:",
                choices: ["Fast cash", "Enter Amount"]
            }
        ]);
        if (withdrawAnswer.withdrawMethod === "Fast cash") {
            let fastcashAnswer = await inquirer.prompt([
                {
                    name: "Fastcash",
                    type: "list",
                    message: "Select Amount:",
                    choices: ["500", "1000", "2000", "4000"]
                }
            ]);
            if (fastcashAnswer.Fastcash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastcashAnswer.Fastcash;
                console.log(`${fastcashAnswer.Fastcash} withdraw successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAnswer.withdrawMethod === "Enter Amount") {
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want to withdraw:",
                }
            ]);
            if (amountAnswer.amount > myBalance) {
                console.log(chalk.red("Insufficient balance"));
            }
            else {
                myBalance -= amountAnswer.amount;
                console.log(`${amountAnswer.amount} withdraw successfully`);
                console.log(`Your Remaining Balance id: ${myBalance}`);
            }
        }
    }
    else if (operations.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("\nPin is incorrect, Try Again!\n"));
}
