'use strict';

// ローカルストレージについて
// https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage

// 空のオブジェクトstorageを作成
let storage = {};

// オブジェクトstorageに関数（メソッド）getを追加
// ローカルストレージに格納されているToDoリストのJSON文字列を配列に変換して返却
storage.get = function() {
    // ローカルストレージのキー"ToDoList"に対応する値を取得
    const listJSON = localStorage.getItem('ToDoList');
    if (listJSON === null) {  // ローカルストレージにキー"ToDoList"が存在しない場合
        return [];
    } else {  // ローカルストレージにキー"ToDoList"が存在している場合
        // 引数の文字列listJSONをJSONとして解析し，オブジェクト（ここでは配列）に変換
        const listArr = JSON.parse(listJSON);
        return listArr;
    }
}

// オブジェクトstorageに関数（メソッド）setを追加
// 引数listArrをJSON文字列に変換し，ローカルストレージに保存
storage.set = function(listArr) {
    // 引数の配列listArrをJSON文字列に変換（ローカルストレージには文字列しか保存できない）
    const listJSON = JSON.stringify(listArr);
    // ローカルストレージのキー"ToDoList"にlistJSONを保存
    localStorage.setItem('ToDoList', listJSON);
}

// オブジェクトstorageに関数（メソッド）addを追加
// ローカルストレージに格納されているToDoリストに引数itemを追加し，再度ローカルストレージに保存
storage.add = function(item) {
    // ローカルストレージに格納されているToDoリストのJSON文字列を配列として取得
    let listArr = this.get();
    // 引数itemのToDoリストの配列に追加
    listArr.push(item);
    // 引数listArrをJSON文字列に変換し，ローカルストレージに保存
    this.set(listArr);
}

// オブジェクトstorageに関数（メソッド）deleteを追加
// ローカルストレージに格納されているToDoリストから添え字indexの要素を削除し，再度ローカルストレージに保存
storage.delete = function(index) {
    // ローカルストレージに格納されているToDoリストのJSON文字列を配列として取得
    let listArr = this.get();
    // ToDoリストの配列から添え字indexの要素を削除
    listArr.splice(index, 1);
    // 引数listArrをJSON文字列に変換し，ローカルストレージに保存
    this.set(listArr);
}