# Angular Password Input Guidelines and Validations

The repository contains the source code and sample applications using the Angular `ngex-password-guide` tool and cooperative password input validations. 

The `ngex-password-guide` tool and sample applications provide these advanced features:

  - Intuitive guidelines for any allowances and restrictions for a password entry content.

  - Dynamically display the successful or failed status during the input process.

  - Cooperative validate the inputs with regular expression pattern matches or other checkers.

  - The validations are also linked to the username input and confirm-password field. 

  - Pending/delayed validations and calling back to update guideline display on data submission.


## Content of Repository

1. Three types of sample applications are under the *sample-src* folder

  - `NgexPasswordGuide_AspNetCore_Cli`: Visual Studio solution of the ASP.NET Core web application with Angular 13. Please see [this article](https://www.codeproject.com/Articles/1179258/An-Angular-Modal-Dialog-with-Advanced-Functionalit) for the setup details.

  - `NgexPasswordGuide_11_AspNet_DML`: Visual Studio solution of the ASP.NET MVC 5 web application with Angular 11. The Angular code parts are the same as all other project types. Only the *package.json* and loaded `node-modules` are different. please see the [AngularDualModuleLoaders](https://github.com/shenweiliu/AngularDualModuleLoaders) for the setup details.  

  - `NgexPasswordGuide_Any_Platform`: Angular code files only. Copy and paste files to a web application in any platform. Follow the common npm install and ng build for an Angular CLI application. 

2. Source code files for the `ngex-password-guide` npm package library and the demo applications are in the *lib-src* and *lib-demo* folders, respectively. For downloading the `ngex-password-guide` npm package, please see the details on the [npm site](https://www.npmjs.com/package/ngex-password-guide). 


## Angular Version Compatibility

The Angular code should work with the Angular versions 8 - 13. If you need to have the sample applications work with any previous version other than 13, you can update the package.json for the required versions and update the `node_modules` by running the `npm install` for the `ang-content` project. 

The `ngex-password-guide` npm package library is built with Angular 12 ViewEngine (non-Ivy) compilation options. if compiled with the Ivy Partial (not provided here), it can only work on the applications with the Angular 13 and latest version of the Angular 12.


## Notes on Sample Code

Comments and descriptions are always there for the code sections and lines if those are not self-explanatory. You can view the coding details and run the applications for your needs. Basically, you may set up the workflow with these steps (text in parentheses are the files in sample applications for references):

1. Password guideline item list (*local-data.ts*).

2. Input elements and settings in the reactive form HTML template (*app.component.html*).

3. Input validator settings for reactive form and controls (*app.component.ts*).

4. Using custom properties of the AbstractControl (*app.component.ts* and *password-guide.component.ts*).

5. Interactive validations between multiple input elements (*app.component.ts*,  *password-guide.component.ts*, *password-validator.ts*, and *reactive-validator.ts*).

6. Display of password guidelines (*password-guide.component.ts* and *password-guide.component.html*).

7. Delayed input validation on submission (*app.component.ts*).

For the `ngex-tooltip` used inside of the applications, please see the details with [this link](https://github.com/shenweiliu/ngex-tooltip). Note that the tooltip on the guideline icon for the delayed validation doesn't exist in the library edition of the `ngex-password-guide`. 

The physical copy of the base code files is recommended if you need to add new into, or modify existing, password guide template.   

## Some Demo Screenshots

- When focused on the Password input field, the guidelines are shown in the default status (no color and icons) except for the "Password Required":

  <img src="https://github.com/shenweiliu/ngex-password-guide/blob/main/screenshots/password-first-focus.png" alt="First focused" > 

- During entering the password, guildlines dynamically show the status with some valid and others invalid inputs:

  <img src="https://github.com/shenweiliu/ngex-password-guide/blob/main/screenshots/some-invalid.png" alt="Some invalid" >

- The password is valid at the time of entry. The value of Confirm Password field is not match.

  <img src="https://github.com/shenweiliu/ngex-password-guide/blob/main/screenshots/password-not-match.png" alt="Password not match" >
  
-  After clicking the "Sign up" button, the server-side validation renders the common password error. Placing the mouse on the icon shows the tooltip.
  
  <img src="https://github.com/shenweiliu/ngex-password-guide/blob/main/screenshots/common-password.png" alt="Common password" >
 
