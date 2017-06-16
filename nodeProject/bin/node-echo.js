 //#! /usr/bin/env node

 var argv = require('argv'),
     args = argv.run(),
     echo = require('../lib/echo');

 console.log(args.targets.join(' '));