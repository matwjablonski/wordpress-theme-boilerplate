const fs = require('fs');
const http = require('http');

fs.createReadStream('./public/wp-config-sample.php')
    .pipe(fs.createWriteStream('./public/wp-config.php'));

fs.readFile('./public/wp-config.php', 'utf-8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    let result = data;
    
    const lineReader = require('readline').createInterface({
        input: fs.createReadStream('.env.dev.sample')
    });
    
    lineReader.on('line', function (line) {
        const lineValue = line.split('=');
        let stringToReplace = '';
        switch (lineValue[0]) {
            case 'DB_NAME': 
                stringToReplace = 'database_name_here';
                break;
            case 'DB_USER': 
                stringToReplace = 'username_here';
                break;
            case 'DB_PASS': 
                stringToReplace = 'password_here';
                break;
            case 'DB_URL': 
                stringToReplace = 'localhost';
                break;
                
        }
    
        const reg = new RegExp(stringToReplace, "g");
        result = result.replace(reg, lineValue[1]);

        fs.writeFile('./public/wp-config.php', result, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }); 
});


http.get('http://api.wordpress.org/secret-key/1.1/salt/', function (res) {
    res.setEncoding('utf8');
    res.on('data', (chunk) => { 
        const test = chunk.split(');');
        test.forEach(function (el, i) {
            test[i] = el.substring(8, el.length - 1).split('\',');
        })
        console.log(test[0]) 
    });
})
  


