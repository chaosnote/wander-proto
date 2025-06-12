const { exec } = require('child_process');
const fs = require('fs');

fs.mkdirSync("./dist", { recursive: true });

function gen_js() {
    let command = `pbjs --dependency protobufjs/minimal.js --target static-module --wrap commonjs -p ./src --out ./dist/game_pb.js ./src/action.proto`;

    console.log(`執行命令：${command}`);

    // 執行命令
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`執行錯誤: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`標準錯誤: ${stderr}`);
            return;
        }
        if (stdout.length == 0) {
            return;
        }
        console.log(`輸出: ${stdout}`);
    });
}

function gen_ts() {
    let command = `pbts --main --out ./dist/game_pb.d.ts ./dist/*.js`

    console.log(`執行命令：${command}`);

    // 執行命令
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`執行錯誤: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`標準錯誤: ${stderr}`);
            return;
        }
        if (stdout.length == 0) {
            return;
        }
        console.log(`輸出: ${stdout}`);
    });
}

async function sleep() {
    console.log('開始執行...');
    gen_js();
    await new Promise(resolve => setTimeout(resolve, 3000)); // 暫停 3 秒
    console.log('繼續執行...');
    gen_ts();
}
sleep();

