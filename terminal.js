// Virtual File System
const fileSystem = {
  '/': ['skills/', 'about.txt'],
  '/skills': ['cybersecurity.txt', 'ruby_projects/'],
  '/skills/ruby_projects': ['rvc_hacking_toolbox.rb'],
};

const fileContents = {
  '/about.txt': 'Welcome to my interactive portfolio!',
  '/skills/cybersecurity.txt': 'I am a cybersecurity student! I participate in ctfs and write my own proof-of-concept tools.',
  '/skills/ruby_projects/rvc_hacking_toolbox.rb': '# Hacking toolbox that supports a multitude of modes, notably wordlist enhancing, cryptography, and website mapping',
};

// Terminal Elements
const terminal = document.getElementById('terminal');
let currentPath = '/';

// Utility Functions
function printLine(line) {
  const div = document.createElement('div');
  div.textContent = line;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function getMatchingPaths(command) {
  const [cmd, partial] = command.split(' ').slice(-2);
  const currentFiles = fileSystem[currentPath] || [];
  return currentFiles.filter(item => item.startsWith(partial || ''));
}

function getInput() {
  const div = document.createElement('div');
  div.id = 'input-line';

  const prompt = document.createElement('span');
  prompt.textContent = `${currentPath} $ `;
  div.appendChild(prompt);

  const input = document.createElement('input');
  div.appendChild(input);

  terminal.appendChild(div);
  input.focus();

  input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          const command = input.value.trim();
          terminal.removeChild(div);
          printLine(`${currentPath} $ ${command}`);
          handleCommand(command);
      } else if (e.key === 'Tab') {
          e.preventDefault();
          const matches = getMatchingPaths(input.value);
          if (matches.length === 1) {
              const parts = input.value.split(' ');
              parts[parts.length - 1] = matches[0];
              input.value = parts.join(' ');
          }
      }
  });
}

function handleCommand(command) {
  const [cmd, ...args] = command.split(' ');
  switch (cmd) {
      case 'ls':
          const files = fileSystem[currentPath] || [];
          printLine(files.join('  '));
          break;
      case 'cd':
          const newPath = args[0]?.replace(/\/+$/, ''); // Remove trailing slashes
          if (newPath === '..') {
              if (currentPath !== '/') {
                  currentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
              }
          } else if (fileSystem[`${currentPath}/${newPath}`.replace('//', '/')]) {
              currentPath = `${currentPath}/${newPath}`.replace('//', '/');
          } else if (fileSystem[`${currentPath}/${newPath}/`.replace('//', '/')]) {
              currentPath = `${currentPath}/${newPath}/`.replace('//', '/');
          } else {
              printLine('Directory not found.');
          }
          break;
      case 'cat':
          const filePattern = args[0];
          if (!filePattern) {
              printLine('Usage: cat <filename>');
              break;
          }

          // Match exact file or files using wildcard
          const regexPattern = new RegExp(
              '^' + filePattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$'
          ); // Convert wildcard to regex
          const currentFiles = fileSystem[currentPath] || [];
          const matchingFiles = currentFiles.filter(file => file.match(regexPattern));

          if (matchingFiles.length === 0) {
              printLine('File not found.');
          } else {
              matchingFiles.forEach(file => {
                  const fullPath = `${currentPath}/${file}`.replace('//', '/');
                  if (fileContents[fullPath]) {
                      printLine(fileContents[fullPath]);
                  } else {
                      printLine(`File ${file} is empty or unreadable.`);
                  }
              });
          }
          break;
      case 'clear':
          terminal.innerHTML = '';
          break;
      case 'help':
          printLine('Available commands: ls, cd, cat, clear, help');
          break;
      default:
          printLine('Command not found. Type "help" for a list of commands.');
  }
  getInput();
}

// Initialize Terminal
printLine('Welcome to my interactive portfolio! Type "help" for a list of commands.');
getInput();

// Click Anywhere to Focus
terminal.addEventListener('click', () => {
  const input = document.querySelector('#input-line input');
  if (input) input.focus();
});
