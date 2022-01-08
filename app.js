const inquirer = require('inquirer');

const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

// prompt user for user info
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username (required).',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to include some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

// prompt user for project info
const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    // if there's no array to hold portfolio answers, make one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    };

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: projectNameInput => {
                    if (projectNameInput) {
                        return true;
                    } else {
                        console.log('Please enter the name of your project.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of your project (required):',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('Please provide a description of your project.');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with? (Check all that apply)',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHub link to this project (required).',
                validate: githubLink => {
                    if (githubLink) {
                        return true;
                    } else {
                        console.log('Please enter the GitHub link to your project.');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to add another project?',
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};

// execute
// ask for user answers, returns data as object in a promise
promptUser()
    // capture the returning data and recursively call prject func until user is done with data entry
    // projects pushed into project array in collection of portfolio info
    .then(promptProject)
    // completed set of data returned and passed to generate page
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    // returns result of generate page from data gathered (first promise obj), pass to write file module and return results
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    // log the response obj from writeFile promise's resolve, return the function to copy file
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    // log the response of our copyFile promise resolve obj
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    // if error AT ANY POINT, log err and promise chain fails
    .catch(err => {
        console.log(err);
    })