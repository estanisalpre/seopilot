import chalk from 'chalk';
export function report(file, errors) {
    if (errors.length === 0) {
        console.log(`${chalk.green('✔')} ${file}`);
    }
    else {
        console.log(`${chalk.red('✖')} ${file}`);
        errors.forEach((err) => {
            console.log('   ' + chalk.red(err));
        });
    }
}
