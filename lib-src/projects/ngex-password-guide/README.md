# ngex-password-guide

An advanced Angular package library tool for password input guide and validations in applications with Angular versions 8 - 13. The library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12. It still uses the ViewEngine, instead of Ivy Partial option, for the better backward compatibility.

The tool provides these advanced features:

- Intuitive guidelines for any allowances and restrictions for a password content.

- Dynamically display the successful or failed status during the input process.

- Cooperative validate the inputs with regular expression pattern matches or other checkers.

- The validations are also linked to the username input and confirm-password field. 

- Pending/delayed validations and calling back to update guideline display on data submission.


## Installation

Run `npm install ngex-password-guide` to add the library into your project directory, or add `"ngex-tooltip": "~12.1.1"` to the package.json file and then run `npm install` to update the existing package.
 

## Source Code and Sample Applications

The source code and sample applications can be downloaded from the [github repository](https://github.com/shenweiliu/ngex-password-guide). Comments and descriptions are always there for the code sections and lines if those are not self-explanatory. You can view the coding details and run the applications for your needs. Basically, you may set up the workflow with these steps (text in parentheses are the files in sample applications for references):

1. Password guideline item list (*local-data.ts*).

2. Input elements and settings in the reactive form HTML template (*app.component.html*).

3. Input validator settings for reactive form and controls (*app.component.ts*).

4. Using custom properties of the AbstractControl (*app.component.ts* and *password-guide.component.ts*).

5. Interactive validations between multiple input elements (*app.component.ts*,  *password-guide.component.ts*, *password-validator.ts*, and *reactive-validator.ts*).

6. Display of password guidelines (*password-guide.component.ts* and *password-guide.component.html*).

7. Delayed input validation on submission (*app.component.ts*).


 
 
 