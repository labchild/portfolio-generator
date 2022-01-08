// create the about section
const generateAbout = aboutText => {
    //if user doesn't want to include about section
    if (!aboutText) {
        return '';
    }

    // if user want to include about section
    return `
    <section class="text-dark bg-primary p-2 display-inline-block">About
    <p>${aboutText}</p>
    </section>
    `;
};


// create projects sections
const generateProjects = projectsArr => {
    return `
    <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-content-between">
            ${projectsArr
            .filter(({ feature }) => feature)
            .map(({ name, description, languages, link }) => {
                return `
                    <div class="col-12 mb-2 bg-dark text-light p-3">
                        <h3 class="portfolio-item-title text-light">${name}</h3>
                        <h5 class="portfolio-languages">
                            Built With:
                            ${languages.join('')}
                        </h5>
                        <p>${description}</p>
                        <a href="${link}" target="_blank" class="btn mt-auto">
                            <i class="fab fa-github mr-2"></i>
                            View project on GitHub
                        </a>
                    </div>
                `;
            }).join('')}
            
            ${projectsArr
            .filter(({ feature }) => !feature)
            .map(({ name, description, languages, link }) => {
                return `
                <div class="col-12 col-md-6 bg-dark text-light p-3">
                    <h3 class="portfolio-item-title text-light">${name}</h3>
                    <h5 class="portfolio-languages">
                        Built With:
                        ${languages.join(', ')}
                    </h5>
                    <p>${description}</p>
                    <a href="${link}" target="_blank" class="mt-auto">
                        <i class="fab fa-github mr-2"></i>View project on GitHub
                    </a>
                </div>
            `;
            })
            .join('')}
        </div>
    </section>
    `;
};

/* const generateProjects = projectsArr => {
    // get array of featured projects only
    const featuredProjects = projectsArr.filter(project => {
        if (project.feature) {
            return true;
        } else {
            return false;
        }
    });

    // get array of non-featured projects only
    const nonFeaturedProjects = projectsArr.filter(project => {
        if (!project.feature) {
            return true;
        } else {
            return false;
        }
    });

    const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
        return `
            <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h5 class="portfolio-languages">
                    Built With:
                    ${languages.join(', ')}
                </h5>
                <p>${description}</p>
                <a href="${link}" target="_blank" class="btn mt-auto">
                    <i class="fab fa-github mr-2"></i>
                    GitHub
                </a>
            </div>
        `;
    });

    const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(({ name, description, languages, link }) => {
        return `
            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h5 class="portfolio-languages">
                    Built With:
                    ${languages.join(', ')}
                </h5>
                <p>${description}</p>
                <a href="${link}" target="_blank" class="btn mt-auto">
                    <i class="fab fa-github mr-2"></i>
                    GitHub
                </a>
            </div>
        `;
    });

    return `
    <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-space-between">
            ${featuredProjectHtmlArr.join('')}
            ${nonFeaturedProjectHtmlArr.join('')}
        </div>
    </section>
    `;
}; */

module.exports = templateData => {
    //destructure the data by section
    // this will create three variables based on data in templateData
    const { projects, about, ...header } = templateData;

    return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
        <div class="container flex-row justify-space-between align-center py-3">
            <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
            <nav class="flex-row">
                <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">
                    GitHub
                </a>
            </nav>
        </div>
    </header>

    <main class="container my-5">
        ${generateAbout(about)}
        ${generateProjects(projects)}
    </main>
    
    <footer class="container text-center py-3">
        <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
};