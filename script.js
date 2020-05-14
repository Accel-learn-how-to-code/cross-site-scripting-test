var itemIndex = 0;
var url = 'http://localhost:3000/todos';

function generatingItem(id, text) {
    //make list of item
    var item = document.createElement('li');
    item.setAttribute('id', id);
    var input = document.createElement('input');
    input.value = text;
    input.setAttribute('class', 'ul-item');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('id', 'input' + id);
    var delButton = document.createElement('button');
    var editButton = document.createElement('button');
    delButton.setAttribute('class', 'd-button');
    delButton.setAttribute('onclick', 'deleteItem(this)');
    delButton.innerHTML = "Delete";
    editButton.setAttribute('class', 'e-button');
    editButton.setAttribute('onclick', 'editItem(this)');
    editButton.innerHTML = "Edit";
    item.appendChild(input);
    item.appendChild(editButton);
    item.appendChild(delButton);
    return item;
}

//show the item in list 
async function render() {
    var toDoList = await axios.get(url).then(res => res.data);
    if (toDoList)
        for (let item of toDoList) {
            document.getElementById('list-item').appendChild(generatingItem(item.id, item.content));
            if (itemIndex < item.id)
                itemIndex = Number.parseInt(item.id);
        }
    else
        toDoList = [];
}

//add more item to the list
function addItem() {
    var input = document.getElementById('input-value').value;
    if (input) {
        itemIndex++;
        document.getElementById('list-item').appendChild(generatingItem(itemIndex, input));
        var newItem = {
            id: itemIndex,
            content: input
        };
        // toDoList.push(newItem);
        axios.post(url, newItem)
            .then(function (res) {
                alert(`ADD SUCCESSFULLY `)
            })
            .catch(function (err) {
                alert("ADD ERROR ")
            });
    }
}

function deleteItem(button) {
    var itemID = button.parentElement.id;
    // toDoList.splice(itemID, 1);
    axios.delete(url + '/' + itemID)
        .then(function (res) {
            alert(`REMOVE SUCCESSFULLY `)
        })
        .catch(function (err) {
            alert("REMOVE ERROR ")
        });
}

function editItem(button) {
    var itemID = button.parentElement.id;
    var input = document.getElementById('input' + itemID);
    input.removeAttribute('readonly');
    button.innerHTML = 'Save';
    button.setAttribute('onclick', 'saveItem(this)');
}

function saveItem(button) {
    var itemID = button.parentElement.id;
    var input = document.getElementById('input' + itemID);
    input.setAttribute('readonly', 'readonly');
    var changeItem = {
        id: itemID,
        content: input.value
    };
    axios.put(url + '/' + itemID, changeItem)
        .then(function (res) {
            alert(`EDIT SUCCESSFULLY `)
        })
        .catch(function (err) {
            alert("EDIT ERROR ")
        });
}

render();