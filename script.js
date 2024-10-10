let options = [];
let usedOptions = [];

async function importFromClipboard() {
    try {
        const clipboardText = await navigator.clipboard.readText();
        options = clipboardText.split('\n').map(option => option.trim()).filter(option => option);
        usedOptions = [];
        document.getElementById('result').innerText = '导入成功，共 ' + options.length + ' 个选项';
    } catch (err) {
        document.getElementById('result').innerText = '无法从剪贴板导入，请确保已复制内容';
    }
}

function draw() {
    const allowRepeat = document.getElementById('allowRepeat').checked;

    if (options.length === 0) {
        document.getElementById('result').innerText = '请先导入选项';
        return;
    }

    let availableOptions = allowRepeat ? options : options.filter(option => !usedOptions.includes(option));

    if (availableOptions.length === 0) {
        document.getElementById('result').innerText = '所有选项已抽取完毕';
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    const selectedOption = availableOptions[randomIndex];

    if (!allowRepeat) {
        usedOptions.push(selectedOption);
    }

    document.getElementById('result').innerText = '抽中的选项是：' + selectedOption;
}
