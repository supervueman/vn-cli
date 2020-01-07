import arg from 'arg';
import inquirer from 'inquirer';
import figlet from 'figlet';
const git = require('simple-git/promise');
const { projectInstall } = require('pkg-install');
const { exec } = require('child_process');

function parseArgsIntoOptions(rawArgs) {
	const args = arg(
		{
			'--init': Boolean,
			'--add': Boolean,
			'--install': Boolean,
			'-i': '--init'
		},
		{
			argv: rawArgs.slice(2)
		}
	);

	return {
		init: args['--init'] || false,
		add: args['--add'] || false,
		component: args,
		runInstall: args['--install'] || false
	};
}

export async function cli(args) {
	await git(process.cwd())
		.silent(false)
		.clone(`https://github.com/supervueman/vn-cms.git`, './')
		.then(() => console.log('finished'))
		.catch(err => console.error('failed: ', err));

	exec('npm run install', (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			return;
		}
		figlet('OKEY!!!', (err, data) => {
			if (err) {
				console.log('OOOPS!!!');
				console.dir(err);
				return;
			}
		});
	});

	const options = parseArgsIntoOptions(args);

	console.log(options);
}
