'use strict';

// 本アプリにおいて，ローカルストレージに格納するデータは以下のような形式になっている。
// [{'name': 花子, 'returnFlag': true}, {'name': 玲子, 'returnFlag': false}, …, {'name': 郁恵, 'returnFlag': false}]

// 要素の取得
const getCount = document.getElementById('get-count');
const returnCount = document.getElementById('return-count');
const inputName = document.getElementById('name');
const saveButton = document.getElementById('save-button');
const ul = document.getElementById('ToDoList');

// ToDoリストを表示
function renderToDoList() {
    ul.textContent = '';
    const toDoList = storage.get();  // ローカルストレージに格納されているToDoリストのJSON文字列を配列として取得
    toDoList.forEach((toDo, index) => {
        // 配列toDoListの各要素は，{name: 文字列, returnFlag: 真偽値} 形式のオブジェクト
        const name = toDo['name'];
        
        // リスト左側のハートマークのボタンの生成・設定
        const checkbutton = document.createElement('button');
        if(toDo['returnFlag']){
            checkbutton.classList.add('check', 'favorite');  // checkbuttonにクラスcheckとfavoriteを追加
        }else{
            checkbutton.classList.add('check');  // checkbuttonにクラスcheckを追加
        };

        // クリックされたときにreturnFlagを切り替えるよう設定
        checkbutton.addEventListener('click', e => {
            const li = e.target.parentNode;  // クリックされたハートマークボタンの親要素liを取得
            const dataIndex = li.dataset.index;  // li要素のdata-index属性の値を取得
            const list = storage.get();  // ローカルストレージに格納されているToDoリストのJSON文字列を配列として取得
            list[dataIndex].returnFlag = !list[dataIndex].returnFlag;  // ToDoリストから添え字dataIndexの要素を取得し，returnFlagの値を反転
            storage.set(list);  // 引数listをJSON文字列に変換し，ローカルストレージに保存
            renderToDoList();  // ToDoリストを表示
        });

        // リスト右側のごみ箱マークのボタンの生成・設定
        const deletebutton = document.createElement('button')
        deletebutton.classList.add('delete');  // checkbuttonにクラスdeleteを追加
        
        // クリックされたときにToDoを削除するよう設定
        deletebutton.addEventListener('click', e => {
            if(confirm('プレゼントをもらった記憶を削除しますか？')){
                const li = e.target.parentNode;  // クリックされたゴミ箱マークボタンの親要素liを取得
                const dataIndex = li.dataset.index;  // li要素のdata-index属性の値を取得
                storage.delete(dataIndex);  // ローカルストレージに格納されているToDoリストから添え字dataIndexの要素を削除し，再度ローカルストレージに保存
                renderToDoList();  // ToDoリストを表示
            }
        });
  
        const li = document.createElement('li');
        li.textContent = name;
        li.appendChild(checkbutton);
        li.appendChild(deletebutton);
        li.dataset.index = index;  // data-index属性を設定
        ul.appendChild(li);
    });

    // ToDoの数を数えて表示
    getCount.textContent = toDoList.length;
    
    // returnFlagがtrueとなっているToDoの数を数えて表示
    returnCount.textContent = toDoList.filter((elm, idx, arr) => elm['returnFlag'] === true).length;
}

// フォームの情報を元にToDoを保存
saveButton.addEventListener('click', e => {
    const name = inputName.value;
    if (name === '') {
        return;
    }   
    storage.add({'name': name, 'returnFlag': false});  // ローカルストレージに格納されているToDoリストに引数のデータを追加し，再度ローカルストレージに保存
    renderToDoList();  // ToDoリストを表示
    inputName.value = '';
});

// 初期化処理としてToDoリストを表示
renderToDoList();